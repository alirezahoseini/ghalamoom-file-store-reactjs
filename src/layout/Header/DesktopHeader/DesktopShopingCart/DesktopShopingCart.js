import React, { useState, useContext, useEffect } from 'react'
import { RiShoppingBasketLine } from 'react-icons/ri'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

// contexts
import { ShoppingCartContext } from '../../../../Contexts/ShopipingCart/ShoppingCartProvider'

// components
import ShoppingCartItem from './DesktopShopingCartItem'

export default function DesktopShopingCart() {
  const {shoppingCartState} = useContext(ShoppingCartContext)
  const [isShow, setIsShow] = useState(false);


  return (
    <div id='DesktopShopingCart' className='z-10'>
      <button className="relative bg-custom-gold-100 flex items-center justify-center p-2 text-2xl text-gray-700 rounded-xl hover:bg-gray-600 hover:text-gray-300 transition-all duration-150" onClick={() => setIsShow(prev => !prev)} >
        <RiShoppingBasketLine />
        {shoppingCartState.itemsCount > 0 && (
          <span className='absolute -top-1 -right-1 text-xs bg-slate-600 rounded-fifty w-5 h-5 text-slate-50 flex items-center justify-center'>{shoppingCartState.itemsCount}</span>
        )}
      </button>
      {/* Hamberger Cart  */}
      <div id="hamberger-cart" className={`fixed top-0 right-0 w-screen h-screen transition-all duration-700 ${isShow ? ' visible pointer-events-auto' : 'pointer-events-none invisible'}`}>
        {/* Backdrop filter  */}
        <div id="backdrop-filter" className={`w-full h-full bg-gray-600 transition-all duration-700 cursor-pointer ${isShow ? 'opacity-30' : 'opacity-0'}`} onClick={() => setIsShow(prev => !prev)}>
        </div>
        {/* Main Content  */}
        <div id="main-content" className={`w-3/12 max-w-lg bg-white absolute top-0 h-full transition-all duration-500 rounded-r-2xl ${isShow ? 'left-0' : '-left-full'}`}>
          <div id="cart-header" className='flex items-center w-full p-5'>
            {/* Close Btn  */}
            <div id="close-btn" className='text-2xl text-gray-500 cursor-pointer hover:text-text-1' onClick={() => setIsShow(prev => !prev)}>
              <FaTimes />
            </div>
          </div>
          {/* Cart Content  */}
          {!shoppingCartState.itemsCount ? (
            <h2 className='mt-5 text-center font-bold'>سبد خرید خالیه</h2>
          ) : (
            <div id="cart-content" className=' w-full mt-3 font-yekan-bakh text-center font-bold text-gray-700'>
              {shoppingCartState.products.map(item => (
                <ShoppingCartItem setIsShow={setIsShow} key={item.id} {...item} />
              ))}
              <div id='cart-footer'>
                <div className="total-price flex items-center text-lg font-bold text-slate-800 justify-center border border-dashed p-2 gap-2 mt-3">
                  <span>جمع کل : </span>
                  <p>
                    {shoppingCartState.totalPrices}
                    <span className='mr-1'>
                      تومان
                    </span>
                  </p>
                </div>
                <div className="buttons mt-4 flex items-center gap-3 pl-6 pr-2 max-w-full">
                  <Link to={''} className='bg-slate-200 py-2 rounded-md hover:bg-slate-500 hover:text-slate-100 w-6/12'>
                    مشاهده سبد خرید
                  </Link>
                  <Link to={''} className='bg-custom-gold-100 py-2 rounded-md hover:bg-slate-500 hover:text-slate-100 w-6/12'>
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
