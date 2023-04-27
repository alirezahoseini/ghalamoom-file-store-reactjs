import React from 'react'

export default function CustomTooltip({ active, payload, label }) {
    if (active) {
        return (
            <div className='bg-slate-200 p-3 rounded-md text-slate-700 text-xs shadow-both dark:bg-slate-600 dark:text-slate-300 border-none outline-none'>
                <div className='mb-3'>{label}</div>
                <div>
                    <span className='font-bold text-blue-800 ml-2  mt-2 text-sm dark:text-slate-100'>{payload[0].payload.income}</span>
                    <span>میلیون تومان</span>
                </div>
            </div>
        )
    } return null

}
