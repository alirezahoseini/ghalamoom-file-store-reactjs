import React from 'react'
import { Link } from 'react-router-dom'
import { TbSquareRoundedChevronLeft } from 'react-icons/tb'

export default function MoreButton({ title = '', path = '#', icon = <TbSquareRoundedChevronLeft />, customClass }) {
    return (
        <Link to={path} className={`flex items-center gap-2 font-black text-slate-600 hover:text-slate-800 w-fit ${customClass}`}>
            <span className='text-base lg:text-xl'>
                {title}
            </span>
            <div className='text-xl lg:text-2xl'>
                {icon}
            </div>
        </Link>
    )
}
