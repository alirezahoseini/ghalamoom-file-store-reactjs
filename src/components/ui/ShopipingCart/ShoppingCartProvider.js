import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'

// contexts 
import { NotificationContext } from '../Notifications/NotificationProvider'


/*-------------------- How use it ------------------*/

//-------- Add product to cart with dispatch
// shoppingCartDespatch({
//     type: 'ADD_PRODUCT',
//     payload: {
//         uniqId: v4(),
//         id: 1,
//         type: 'course',
//         title: 'دوره ایلوستریتور',
//         image: '',
//         price: 1589,
//     },
// })

//-------- Remove product from cart with dispatch
// shoppingCartDespatch({
//     type: 'REMOVE_PRODUCT',
//     id: 2,
// })


export const ShoppingCartContext = createContext();

const calcTotalPrice = (products) => {
    let total = 0;
    if (products.length < 1) {
        return 0
    }
    if (products.length === 1) {
        return products[0].price
    }
    products.forEach(element => {
        total = Number(total) + Number(element.price)
    });
    return total
}

export default function ShoppingCartProvider(props) {
    const notificationDispatch = useContext(NotificationContext)
    // What notification to show to user .?
    const [notifStatus, notifStatusDispatch] = useReducer((state, action) => {
        switch (action) {
            case 'ADDED':
                return {added: true, isExist: null, removed: null}
            case 'ISEXIST':
                return {added: null, isExist: true, removed: null}
            case 'REMOVED':
                return {added: null, isExist: null, removed: true}
            default:
                return state
        }
    }, {added: null, isExist: null, removed: null})
    // Shopping cart initial state
    const initState = {
        totalPrices: 0,
        itemsCount: 0,
        products: []
    }
    // shopping cart reducer
    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD_PRODUCT':
                const newProductId = `${action.payload.type}s/${action.payload.id}`;
                const isExist = state.products.some((product => newProductId === `${product.type}s/${product.id}`))
                // if exist product in cart show notification
                if (isExist) {
                    notifStatusDispatch('ISEXIST')
                    return state
                }
                // Add product to cart
                notifStatusDispatch('ADDED')
                return {
                    totalPrices: calcTotalPrice([...state.products, action.payload]),
                    itemsCount: state.products.length + 1,
                    products: [...state.products, action.payload]
                }
            case 'REMOVE_PRODUCT':
                // Remove product from cart
                notifStatusDispatch('REMOVED')
                return {
                    totalPrices: calcTotalPrice(state.products.filter(item => item.uniqId !== action.uniqId)),
                    itemsCount: state.products.length - 1,
                    products: state.products.filter(item => item.uniqId !== action.uniqId)
                }
            default:
                return state
        }
    }
    const [shoppingCartState, shoppingCartDispatch] = useReducer(reducer, initState)

    // show notification affter updated shopping cart
    useEffect(() => {
        if (notifStatus.added) {
            notificationDispatch({
                type: 'ADD_NOTE',
                payload: {
                    message: 'محصول با موفقیت به سبد خرید اضافه شد',
                    status: 'success'
                }
            })
        }
        if (notifStatus.isExist) {
            notificationDispatch({
                type: 'ADD_NOTE',
                payload: {
                    message: 'این محصول در سبد خرید شما وجود دارد',
                    status: 'info'
                }
            })
        }
        if (notifStatus.removed) {
            notificationDispatch({
                type: 'ADD_NOTE',
                payload: {
                    message: 'محصول از سبد خرید شما حذف شد',
                    status: 'error'
                }
            })
        }
    }, [notifStatus])
    return (
        <ShoppingCartContext.Provider value={{ shoppingCartState, shoppingCartDispatch }}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}
