import React from 'react'
import { Link } from 'react-router-dom'

// Assets
import confirmSuccessImage from '../../../../../assets/images/panel/confirm-email-page/confirm-success.webp'

export default function ConfirmSuccessfullSection() {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-center' >
      <div className="lg:w-6/12 justify-center">
        <img src={confirmSuccessImage} className='w-full lg:w-10/12 mx-auto' alt="confirm success" />
      </div>
      <div className='lg:w-6/12 justify-center -mt-8 lg:mt-0'>
          <div className='pr-4 border-r-4 border-green-200'>
            <h1 className='font-rokh text-xl lg:text-2xl font-black text-green-800 mb-5'>حساب کاربری شما تایید شد!</h1>
            <p className='mt-1 font-medium leading-5'>حالا می تونی با ایمیل و رمز عبورت وارد حساب کاربریت بشی</p>
            <p className='mt-2'>برای رفتن به صفحه لاگین از دکمه پایین استفاده کن</p>
          </div>
          <div className='my-6 pr-5'>
            <Link className='px-4 py-2 rounded-md hover:bg-slate-300 hover:text-slate-700 text-white bg-blue-500 mx-1' to={'/login'}>صفحه ورود</Link>
            <Link className='px-4 py-2 rounded-md bg-slate-300 text-slate-700 hover:text-white hover:bg-blue-500 mx-1' to={'/'}>خانه</Link>
          </div>
        </div>
    </div>
  )
}
