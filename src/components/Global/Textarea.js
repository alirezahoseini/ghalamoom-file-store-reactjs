import React from 'react'

export default function Textarea({ placeholder = 'عنوان پیشفرض', value, setValue, name = 'NotName' }) {
    return (
        <>
            <textarea name={name} cols="30" rows="10" placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)} className='global-textarea bg-gray-1 py-2 px-3 rounded-xl w-full outline-none border-2 border-transparent duration-300 focus:border-blue'></textarea>
        </>
        
    )
}
