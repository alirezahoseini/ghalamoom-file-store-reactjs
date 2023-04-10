import React from 'react'

export default function Input({ type = 'text', placeholder = 'عنوان پیشفرض', value, setValue, name = 'NotName', max = 1000 , min = 2 }) {

    return (
        <>
            <input type={type} name={name} placeholder={placeholder} value={value} maxLength={max} min={min} className={`global-input bg-gray-1 py-2 px-3 rounded-xl w-full outline-none border-2 border-transparent duration-300 focus:border-blue text-xs md:text-sm  `} onChange={(event) => setValue(event.target.value)} />
        </>

    )
}
