import React from 'react'

export default function Title({title}) {
    return (
        <div className="title">
            <h1 className='text-2xl font-rokh font-extrabold text-slate-600'>
                {title}
            </h1>
        </div>
    )
}
