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
    const [isExistProduct, setIsExistProduct] = useState(null)
    const initState = {
        totalPrices: 0,
        itemsCount: 0,
        products: []
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD_PRODUCT':
                const newProductId = `${action.payload.type}s/${action.payload.id}`;
                const isExist = state.products.some((product => newProductId === `${product.type}s/${product.id}`))
                if (isExist) {
                    setIsExistProduct(true)
                    return state
                }
                return {
                    totalPrices: calcTotalPrice([...state.products, action.payload]),
                    itemsCount: state.products.length + 1,
                    products: [...state.products, action.payload]
                }
            case 'REMOVE_PRODUCT':
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

    useEffect(() => {
        if (isExistProduct) {
            notificationDispatch({
                type: 'ADD_NOTE',
                payload: {
                    message: 'این محصول در سبد خرید شما وجود دارد',
                    status: 'info'
                }
            })
            setTimeout(() => {
                setIsExistProduct(null)
            }, 300);
        }
    }, [isExistProduct])
    return (
        <ShoppingCartContext.Provider value={{ shoppingCartState, shoppingCartDispatch }}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}
