import React from 'react'

export default function Title({title}) {
    return (
        <div className="title w-full text-center lg:text-right">
            <h1 className='text-2xl font-rokh font-extrabold text-slate-600 max-w-full break-words'>
                {title}
            </h1>
        </div>
    )
}
