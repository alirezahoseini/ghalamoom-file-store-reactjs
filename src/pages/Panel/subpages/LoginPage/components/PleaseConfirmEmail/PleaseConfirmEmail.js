import React from 'react'
import { Link } from 'react-router-dom'

// Assets 
import emailIcon from '../../../../../../assets/images/panel/confirm-email-page/tik.webp'
export default function PleaseConfirmEmail() {
  return (
    <div className='p-5'>
      <div className='bg-white rounded-2xl flex flex-col lg:flex-row items-center justify-center'>
        <div className='lg:w-6/12'>
          <img src={emailIcon} alt="email icon" className='w-10/12 mx-auto' />
        </div>
        <div className='lg:w-6/12'>
          <div className='border-r-2 pr-5'>
            <h1 className='font-rokh text-2xl font-black text-slate-700 mb-5'>لطفا ایمیل خود را تایید کنید</h1>
            <p className='mt-1 font-medium'>یک ایمیل احراز هویت برای شما ارسال شد</p>
            <p className='mt-1 font-medium'>پس از تایید ایمیل وارد حساب کاربری خود شوید</p>
          </div>
          <div className='mt-8 text-sm pr-5 flex'>
            <p className=''>ایمیلی دریافت نکرده اید؟</p>
            <button className='text-blue-600 font-semibold mr-3'>ارسال مجدد</button>
          </div>
          <div className='my-5 pr-4'>
            <Link className='px-3 py-1 rounded-md text-sm bg-slate-300 text-slate-700 hover:text-white hover:bg-blue-500 mx-1' to={'/login'}>صفحه ورود</Link>
            <Link className='px-3 py-1 rounded-md text-sm bg-slate-300 text-slate-700 hover:text-white hover:bg-blue-500 mx-1' to={'/'}>خانه</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
