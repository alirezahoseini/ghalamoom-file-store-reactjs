import React, { useState } from 'react'
import { RiShoppingBasketLine } from 'react-icons/ri'
import { FaTimes } from 'react-icons/fa'

export default function DesktopShopingCart() {


  const [isShow, setIsShow] = useState(false)


  return (
    <div id='DesktopShopingCart' className='z-10'>
      <button className="bg-custom-gold-100 flex items-center justify-center p-2 text-2xl text-gray-700 rounded-xl hover:bg-gray-600 hover:text-gray-300 transition-all duration-150" onClick={() => setIsShow(prev => !prev)} >
        <RiShoppingBasketLine />
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
          <div id="cart-content" className='mt-3 font-yekan-bakh p-3 text-center font-bold text-gray-700'>
            فعلا سبد خرید ساخته نشده
          </div>
        </div>
      </div>
    </div>
  )
}
