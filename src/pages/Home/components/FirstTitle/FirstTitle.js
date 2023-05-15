import React from 'react'

export default function FirstTitle({ title, customClass }) {
    return (
        <div className={`first-title text-xl lg:text-3xl font-black text-slate-600 w-fit break-words flex flex-col ${customClass}`}>
            <h2 className='leading-10'> 
                {title}
            </h2>
            <div className="title-under-line w-1/2 block h-2 bg-custom-gold-100 my-5"></div>
        </div>
    )
}
