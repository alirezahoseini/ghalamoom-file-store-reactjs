import React from 'react'

// assets
import tomanIcon from '../../../assets/icons/toman.svg'

export default function PriceBadge({ price = 0 }) {
    return (
        <>{
            price === '0' ? (
                <span className='font-black text-lg font-yekan text-slate-700'>
                    رایگان
                </span>
            ) : (
                <div className='flex items-center gap-1'>
                    <span className='font-bold text-3xl font-yekan-bakh text-slate-700'>
                        {price}
                    </span>
                    <img src={tomanIcon} alt="toman icon" className='w-5' />
                </div>
            )
        }
        </>
    )
}
