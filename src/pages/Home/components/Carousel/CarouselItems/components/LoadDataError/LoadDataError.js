import React, { memo } from 'react'
import { TbPlugConnectedX } from 'react-icons/tb'

const LoadDataError = memo(() => {
    return (
        <div className='load-data-error flex flex-col items-center'>
            <div className='text-3xl font-black bg-blue-500 shadow-both-0 w-16 h-16 flex justify-center items-center rounded-2xl text-slate-100'>
                <TbPlugConnectedX />
            </div>
            <h2 className='font-bold text-lg text-slate-400 my-5'>خطا در بارگذاری اطلاعات.!</h2>
            <div className='bg-blue-500 bg-opacity-20 p-5 rounded-md' >
                <h2 className='font-bold text-sm text-blue-900'>چه اتفاقی افتاده؟</h2>
                <p className='text-slate-700 mt-3 leading-7 text-xs'>
                    این مشکل بخاطر عدم ارتباط با سرور رخ داده. <br />
                    <strong>برای رفع مشکل لطفا با فیلترشکن صفحه رو رفرش کنید</strong>
                </p>
            </div>
        </div>
    )
})

export default LoadDataError
