import React from 'react'
import { BsHeart } from 'react-icons/bs'


export default function ProductListItem({ title, image, format, like, category, theme = 'product' }) {
    return (
        theme === 'product' && (
            <tr className='w-full flex justify-center items-center text-text-1 border-b-2 border-gray-1 pb-3'>
                <td className='w-4/12' >
                    <div className='bg-white rounded-md lg:rounded-xl overflow-hidden w-14 lg:w-20'>
                        <img src={image} alt={title} />
                    </div>
                </td>
                <td className='w-4/12 flex flex-col gap-2 text-xs'>
                    <span className='font-bold' >{title}</span>
                    <span className='bg-gray-1 w-fit py-1 px-2 rounded-md'>{category}</span>
                </td>
                <td className='w-4/12 flex flex-col gap-3'>
                    <span className='bg-gray-1 w-fit py-1 px-2 rounded-md text-xs '>
                        فرمت : {format}
                    </span>
                    <span className='bg-pink flex w-fit py-1 px-2 text-xs bg-opacity-10 text-pink gap-2 items-center rounded-lg' >
                        <BsHeart />
                        <span>{like}</span>
                    </span>
                </td>
            </tr>
        )
    )
}
