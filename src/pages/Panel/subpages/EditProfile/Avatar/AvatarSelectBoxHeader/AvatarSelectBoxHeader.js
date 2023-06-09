import React, { memo } from 'react'
import { TbX } from 'react-icons/tb'

const AvatarSelectBoxHeader = memo(({onCloser, title}) => {
    return (
        <div className="select-selectbox_header w-full sticky top-0 left-0 bg-slate-200 dark:text-slate-200 dark:bg-slate-700 p-3 flex shadow-both-2 text-slate-700">
            <h2 className='text-base font-black text-center w-full'>{title}</h2>
            <TbX onClick={() => onCloser()} className='absolute top-3 right-3 text-2xl hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer' />
        </div>
    )
})

export default AvatarSelectBoxHeader
