import React, { memo, useContext } from 'react'
import { v4 } from 'uuid'

// contexts
import { ShoppingCartContext } from '../../../../Contexts/ShopipingCart/ShoppingCartProvider'

const AddToCartBox = memo((props) => {
    const { shoppingCartDispatch } = useContext(ShoppingCartContext);
    const { inStock = true, price, type, id, title, image } = props;
    const handelAddToCart = () => {
        shoppingCartDispatch({
            type: 'ADD_PRODUCT',
            payload: {
                uniqId: v4(),
                id,
                type,
                title,
                image,
                price,
            },
        })
    }
    return (
        <div className='add-to-cart-box bg-custom-blue-600 p-6 rounded-2xl flex flex-col gap-4'>
            <div
                className="price py-3 w-full bg-slate-400 flex justify-center rounded-xl bg-opacity-25 font-bold text-slate-200 text-2xl font-yekan-bakh">
                {price > 0 ? `${price} هزارتوان` : "رایگان"}
            </div>
            {inStock !== "false" ? (
                <button
                    onClick={handelAddToCart}
                    className='w-full flex justify-center items-center text-custom-blue-700 py-3 text-base border-2 border-custom-blue-700 rounded-xl font-bold transition-all duration-300 hover:bg-blue-400 hover:text-white'
                >
                    افزودن به سبد خرید
                </button>
            ) : (
                <div
                    className='w-full flex justify-center items-center text-red-500 py-3 text-base border-2 border-red-500 rounded-xl font-bold'
                >
                    موجود نیست
                </div>
            )}
        </div>
    )
})

export default AddToCartBox
