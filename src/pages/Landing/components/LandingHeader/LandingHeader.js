import React from 'react'
import { Link } from 'react-router-dom'
// assets
import firstBannerImage from '../../../../assets/images/landing/ghalamoom-baner-1-mobile.svg'

export default function LandingHeader() {
  return (
    <div id='landing-header' className='flex flex-col lg:flex-row w-full items-center p-0 m-0'>
        {/* Right section  */}
        <section className='w-full my-3 lg:w-6/12'>
            <img src={firstBannerImage} className='w-full mx-auto' alt="first banner" />
        </section>
        {/* End of Right section  */}
        {/* Left section  */}
        <section className='w-full my-3 lg:w-6/12 flex flex-col items-center gap-4 mt-10'>
          <h2 className='font-rokh font-black text-5xl text-slate-700'>قلموم</h2>
          <p className='font-bold text-slate-500 text-base'>فروشگاه آنلاین فایل گرافیکی با پنل مدیریت اختصاصی</p>
          <div className='flex gap-3 items-center w-full px-3 justify-center mt-5 '>
            <Link to={'/'} className='bg-slate-300 px-3 py-3 rounded-xl font-bold w-4/12 border-2 border-slate-300 flex items-center justify-center text-slate-600 gap-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white' >
              <span>فروشگاه</span>
            </Link>
            <Link to={'/panel'} className=' px-3 py-3 rounded-xl font-bold w-4/12 border-2 border-slate-300 flex items-center justify-center text-slate-600 gap-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white' >
              پنل
            </Link>
          </div>
        </section>
        {/* End of Left section  */}
    </div>
  )
}
