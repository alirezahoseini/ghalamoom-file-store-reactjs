import React from 'react'

export default function Textarea({ placeholder = 'عنوان پیشفرض', value, setValue, name = 'NotName', rows = 3 }) {
    return (
        <>
            <textarea name={name} cols="20" rows={rows} placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)} maxLength={500} className='global-textarea bg-gray-1 py-2 px-3 rounded-xl w-full outline-none border-2 border-transparent duration-300 focus:border-blue text-xs md:text-sm'></textarea>
        </>
        
    )
}
