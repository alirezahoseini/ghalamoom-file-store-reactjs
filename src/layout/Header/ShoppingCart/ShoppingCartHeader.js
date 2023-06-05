import React from 'react'
import { TbChevronRight, TbX } from 'react-icons/tb'


export default function ShoppingCartHeader(props) {
    return (
        <div id="cart-header" className='flex items-center w-full px-4 pt-4 pb-3'>
            {/* Close Btn  */}
            <button type='button' id="close-btn" className='text-slate-500 hover:text-slate-800' onClick={() => props.onClickEvent()}>
                <span className='absolute top-3 right-3 border py-2 pl-3 pr-1 text-xs rounded-md flex items-center gap-2 font-bold lg:hidden'>
                    <TbChevronRight className='text-base' />
                    بازگشت
                </span>
                <TbX className='hidden lg:flex text-slate-500 hover:text-slate-800 text-2xl' />
            </button>
            <h4 className='font-bold w-full text-center text-lg mt-1 text-slate-400'>سبد خرید</h4>
        </div>
    )
}
