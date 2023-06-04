import React, { createContext, useEffect, useReducer } from 'react'
import { v4 } from 'uuid'

// hooks
import useAxiosPost from '../../../hooks/axios/useAxiosPost'

export const ShoppingCartContext = createContext()

const calcTotalPrice = (products) => {
    console.log(products)
    if (products.length < 1) {
        return 0
    }
    if (products.length === 1) {
        return products[0].price
    }
    const total = products.reduce((prevVal, currentVal) => {
        return prevVal.price + currentVal.price
    });
    return total
}
export default function ShoppingCartProvider(props) {
    const { axiosPostResult, axiosPostError, setAxiosPostUrl, setAxiosPostData } = useAxiosPost()
    const initState = {
        totalPrices: 0,
        itemsCount: 0,
        products: []
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD_PRODUCT':

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

    // {
    //     totalPrices: 10,
    //     itemsCount: 0,
    //     products: [
    //         {
    //             uniqId: v4(),
    //             id: 1,
    //             type: 'course',
    //             title: 'دوره ایلوستریتور',
    //             image: '',
    //             price: 1589,
    //         },
    //         {
    //             uniqId: v4(),
    //             id: 2,
    //             type: 'product',
    //             title: 'فایل موکاپ',
    //             image: '',
    //             price: 15,
    //         },
    //     ]
    // }

    // shoppingCartDespatch({
    //     type: 'REMOVE_PRODUCT',
    //     id: 2,
    // })

    
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

    useEffect(()=> {
        setTimeout(() => {
            shoppingCartDispatch({
                type: 'ADD_PRODUCT',
                payload: {
                    uniqId: v4(),
                    id: 1,
                    type: 'course',
                    title: 'دوره ایلوستریتور',
                    image: '',
                    price: 1589,
                },
            })
        }, 5000);
    }, [])




    return (
        <ShoppingCartContext.Provider value={{shoppingCartState, shoppingCartDispatch}}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}
