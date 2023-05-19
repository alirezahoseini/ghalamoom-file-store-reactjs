import React, {useEffect, useState} from 'react'

// assets
import instaIcon from '../../../assets/icons/instagram-icon-3d.png'
export default function InstagramBanner() {
    
  return (
    <div className='instagram-banner p-4 xl:p-0 mt-24'>
        <div className="wrapper bg-gradient-to-tr from-fuchsia-600 to-pink-600 rounded-2xl flex flex-col lg:flex-row items-center px-3 lg:py-4 relative">
            <div className="-mt-14 w-full flex justify-center lg:absolute lg:right-4 lg:mt-0 lg:justify-start pointer-events-none lg:w-fit">
                <img src={instaIcon} alt="instagram logo" className='w-6/12 -mt-10 lg:w-48 lg:mt-0' />
            </div>
            <div className='flex items-center flex-col gap-2 lg:w-4/12 lg:items-end text-center'>
                <h4  className="font-yekan text-slate-100 text-3xl font-black">
                    67,328 +
                </h4>
                <strong className='text-white font-extrabold text-lg opacity-40'>Followers</strong>
            </div>
            <h2 className='font-black text-white text-lg my-3 lg:w-6/12 lg:text-center'>
                خیلیا قلموم رو به اینستاگرامش میشناسن!
            </h2>
            <div className="text-white border-2 border-white rounded-xl w-full px-3 py-3 my-3 text-center hover:bg-white hover:text-purple-600 cursor-pointer lg:w-3/12">
                <h2 className='font-bold'>
                    اینستاگرام قلموم
                </h2>
            </div>
        </div>
    </div>
  )
}
