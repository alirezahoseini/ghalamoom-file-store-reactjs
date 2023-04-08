import React from 'react'

export default function Input({ type = 'text', placeholder = 'عنوان پیشفرض', value, setValue, name = 'NotName', validation }) {

    return (
        <>
            <input type={type} name={name} placeholder={placeholder} className={`global-input bg-gray-1 py-2 px-3 rounded-xl w-full outline-none border-2 border-transparent duration-300 focus:border-blue  `} onChange={(event) => setValue(event.target.value)} />
        </>

    )
}
