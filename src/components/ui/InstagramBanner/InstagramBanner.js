import React, { useEffect, useState } from 'react'

// assets
import instaIcon from '../../../assets/icons/instagram-icon-3d.png'

// style
const bgGradient = {
    backgroundImage: 'linear-gradient(70deg, #BB00FF 0%, #f2295b 100%)'
}
export default function InstagramBanner({ showFollowers = true , customClass = '', iconCustomWidth= ''}) {
    return (
        <div className='instagram-banner p-4 xl:p-0 '>
            <div className={`wrapper rounded-2xl flex flex-col lg:flex-row items-center px-3 lg:py-4 relative ${customClass}`} style={bgGradient}>
                {/* insta logo  */}
                <div className={`-mt-14 w-full flex justify-center lg:absolute lg:mt-0 lg:justify-start pointer-events-none lg:w-fit ${showFollowers ? 'lg:right-4' : 'lg:right-0'}`} >
                    <img src={instaIcon} alt="instagram logo" className={`w-6/12 -mt-7 lg:w-48 lg:mt-0 ${iconCustomWidth}`} />
                </div>
                {/* End of insta logo  */}
                {/* Followers count  */}
                {showFollowers && (
                    <div className='flex items-center flex-col gap-2 lg:w-4/12 lg:items-end text-center'>
                        <h4 className="font-yekan text-slate-100 text-3xl font-black">
                            67,328 +
                        </h4>
                        <strong className='text-white font-extrabold text-lg opacity-40'>Followers</strong>
                    </div>
                )}
                {/* End of Followers count  */}
                <h2 className={`font-black text-white text-lg my-3 ${ showFollowers ? 'lg:w-6/12 lg:text-center' : 'lg:w-8/12 xl:w-6/12 lg:text-end pl-4'} `}>
                    خیلیا قلموم رو به اینستاگرامش میشناسن!
                </h2>
                <div className={`text-white border-2 border-white rounded-xl w-full px-3 py-3 my-3 text-center hover:bg-white hover:text-purple-600 cursor-pointer  ${ showFollowers ? 'lg:w-3/12 ' : 'lg:w-4/12 mr-auto '}`}>
                    <h2 className='font-bold'>
                        اینستاگرام قلموم
                    </h2>
                </div>
            </div>
        </div>
    )
}
