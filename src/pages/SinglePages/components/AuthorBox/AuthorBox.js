import React from 'react'

export default function AuthorBox({ image, name }) {
    return (
        <div className='author-box flex items-center bg-white p-3 rounded-2xl gap-4'>
            <div className='flex w-16 h-16 items-center justify-center bg-slate-500 rounded-full overflow-hidden  shadow-both-0'>
                <img src={image} alt={name} className='h-full' />
            </div>
            <h2 className='font-bold text-slate-500 flex gap-2'>
                <span>
                    مدرس:
                </span>
                <span className='text-slate-800'>
                    {name}
                </span>
            </h2>
        </div>
    )
}
