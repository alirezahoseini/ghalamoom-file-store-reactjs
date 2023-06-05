import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

// contexts
import { ShoppingCartContext } from '../../../Contexts/ShopipingCart/ShoppingCartProvider'

// assets
import emptyCart from '../../../assets/images/global/empty-cart.svg'
// components
import ShoppingCartItem from './ShoppingCartItem'
import ShoppingCartTogglerButton from '../ShoppingCartTogglerButton/ShoppingCartTogglerButton'
import ShoppingCartHeader from './ShoppingCartHeader'


export default function ShoppingCart() {
  const { shoppingCartState } = useContext(ShoppingCartContext);
  const [isShow, setIsShow] = useState(false);


  return (
    <div id='shopping-cart' className='z-10'>
      <ShoppingCartTogglerButton onClickEvent={() => setIsShow(prev => !prev)} />
      {/* Hamberger Cart  */}
      <div id="hamberger-cart" className={`fixed top-0 right-0 w-screen h-screen transition-all duration-700 ${isShow ? ' visible pointer-events-auto' : 'pointer-events-none invisible'}`}>
        {/* Backdrop filter  */}
        <div id="backdrop-filter" className={`w-full h-full bg-gray-600 transition-all duration-700 cursor-pointer ${isShow ? 'opacity-30' : 'opacity-0'}`} onClick={() => setIsShow(prev => !prev)}>
        </div>
        {/* Main Content  */}
        <div id="main-content" className={`w-full lg:w-3/12 lg:max-w-lg bg-white absolute top-0 h-full transition-all duration-500 lg:rounded-r-xl overflow-y-auto pb-5 ${isShow ? 'left-0' : '-left-full'}`}>
          <ShoppingCartHeader onClickEvent={()=> setIsShow(prev => !prev)} />
          {/* Cart Content  */}
          {!shoppingCartState.itemsCount ? (
            <div className='flex flex-col items-center gap-3'>
              <img src={emptyCart} alt="empty cart" className='w-64' />
              <h2 className='mt-5 text-center font-black text-slate-600'>سبد خرید خالیه!</h2>
            </div>
          ) : (
            <div id="cart-content" className=' w-full mt-1 font-yekan-bakh text-center font-bold text-gray-700'>
              {shoppingCartState.products.map(item => (
                <ShoppingCartItem setIsShow={setIsShow} key={item.id} {...item} />
              ))}
              <div id='cart-footer'>
                <div className="total-price flex items-center text-lg font-black text-slate-800 justify-center border border-dashed p-2 gap-2 mt-3">
                  <span>جمع کل : </span>
                  <p>
                    {shoppingCartState.totalPrices}
                    <span className='mr-1'>
                      تومان
                    </span>
                  </p>
                </div>
                <div className="buttons mt-4 flex items-center gap-3 pl-6 pr-2 max-w-full">
                  <Link onClick={() => setIsShow(prev => !prev)} to={'#'} className='bg-slate-200 py-2 rounded-md hover:bg-slate-500 hover:text-slate-100 w-6/12'>
                    مشاهده سبد خرید
                  </Link>
                  <Link onClick={() => setIsShow(prev => !prev)} to={'#'} className='bg-custom-gold-100 py-2 rounded-md hover:bg-slate-500 hover:text-slate-100 w-6/12'>
                    تسویه حساب
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
