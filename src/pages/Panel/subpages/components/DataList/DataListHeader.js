import React from 'react'

export default function DataListHeader({ title, type }) {
    return (
        <div className='data-list-header flex items-center bg-white w-full rounded-xl px-4 py-4 text-slate-600 dark:bg-slate-700 dark:text-slate-400'>
            <div className={` flex items-center w-8/12  ${type === 'artwork' ? 'xl:w-5/12' : 'sm:w-5/12'}`} >
                {title}
            </div>
            <div className={`hidden ${type === 'artwork' ? 'xl:w-4/12 xl:flex' : 'sm:flex sm:w-2/12'}` }>
                {type === 'product' && 'وضعیت'}
                {type === 'course' && 'سطح'}
                {type === 'artwork' && 'زمان اجرا'}
            </div>
            {type !== 'artwork' && (
                <div className={` items-center ${type === 'artwork' ? 'hidden' : 'hidden sm:w-2/12 sm:flex'}` }>
                    قیمت
                </div>
            )}
            <div className={`hidden ${type === 'artwork' ? 'md:flex md:w-3/12 xl:w-1/12' : 'md:w-2/12 md:flex'}`} >
                {type === 'product' && 'تعداد فروش'}
                {type === 'course' && 'تعداد دانشجو'}
                {type === 'artwork' && 'لایک ها'}
            </div>
            <div className={`flex items-center justify-evenly ${type === 'artwork' ? 'w-4/12 xl:w-2/12' : 'w-4/12 sm:w-2/12'}`} >
                سایر
            </div>
        </div>
    )
}
