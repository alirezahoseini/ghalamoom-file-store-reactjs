import React from 'react'

// Assets
import vpnIcon from '../../../../assets/images/landing/vpn-icon.PNG'

export default function VpnSection() {
  return (
    <div className='flex flex-col-reverse my-3 lg:flex-row items-center justify-center bg-white rounded-2xl overflow-hidden'>
      <div className="description-section lg:w-6/12 text-center flex flex-col gap-2 px-5 py-5">
        <h2 className='font-black text-xl lg:text-2xl text-indigo-800 mb-5'>فیلترشکن خود را روشن کنید..!!!</h2>
        <span className='text-sm lg:text-base text-gray-600 font-semibold'>برای بارگذاری محتوا از سرور و درست کارکردن قلموم باید از فیلترشکن استفاده کنید</span>
        <span className='text-sm text-gray-500 font-medium'>بک اند قلموم روی سرور Render.com قرار دارد که درحال حاضر این سرویس بدون فیلترشکن در دسترس نیست </span>
      </div>
      <div className="image-section lg:w-6/12">
        <img src={vpnIcon} alt="use vpn icon" />
      </div>
    </div>
  )
}
