import React from 'react'
import { Link } from 'react-router-dom'


// Assets
import expiredTokenImage from '../../../../../assets/images/panel/confirm-email-page/expired-token.webp'

export default function RejectedTokenSection() {

    return (
        <div className='flex flex-col lg:flex-row items-center justify-center' >
            <div className="lg:w-6/12 justify-center">
                <img src={expiredTokenImage} className='w-full lg:w-10/12 mx-auto' alt="confirm success" />
            </div>
            <div className='lg:w-6/12 justify-center -mt-8 lg:mt-0'>
                <div className='pr-4 border-r-4 border-blue-200'>
                    <h1 className='font-rokh text-xl lg:text-2xl font-black text-blue-800 mb-5'>این ایمیل قبلا تایید شده است</h1>
                    <p className='mt-1 font-medium leading-5'>شما قبلا ایمیل خود را تایید کرده اید</p>
                    <p className='mt-1 font-medium leading-5'>با استفاده از دکمه پایین وارد حساب خود شوید</p>
                </div>
                <div className='my-6 pr-5'>
                    <Link type='button' to={'/login'} className='px-4 py-2 rounded-md hover:bg-slate-300 hover:text-slate-700 text-white bg-blue-500 mx-1'>ورود به حساب</Link>
                    <Link type='button' to={'/'} className='px-4 py-2 rounded-md hover:bg-slate-300 hover:text-slate-700 text-white bg-blue-500 mx-1'>صفحه اصلی</Link>
                </div>
            </div>
        </div>
    )
}
