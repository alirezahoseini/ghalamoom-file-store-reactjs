import React, { useEffect, useState } from 'react'

import { TbPercentage, TbTrendingUp, TbTrendingDown } from 'react-icons/tb'


export default function GrowBoxItem({ iconBgColor, value = '1.000.000', percent = 5, title = "فروش این ماه", icon }) {
  ///* Icon Bg color themeplate : bg-gradient-to-tr from-green-500 to-green-300 *///
  const [negative, setNegative] = useState(false);

  useEffect(() => {
    if (percent < 0) {
      setNegative(true)
    }
  }, [])
  return (
    <div className='grow-item w-11/12 md:w-6/12 xl:w-3/12 p-4 text-xs'>
      <div className="wrpper cursor-pointer w-full bg-white rounded-2xl flex p-5 items-center relative transition-all duration-300 hover:shadow-both-2 dark:hover:shadow-slate-900 dark:bg-slate-800">
        <div className='flex flex-col gap-3'>
          <h3 className='title font-bold text-gray-400 dark:text-slate-500'>
            {title}
          </h3>
          <p className='value flex gap-2 items-center'>
            <span className='font-bold text-lg font-yekan-bakh dark:text-slate-200'>{value}</span>
            <span className='text-gray-400 font-bold dark:text-slate-500' style={{ fontSize: '10px' }}>تومان</span>
          </p>
        </div>
        <div className={`flex items-center gap-1 mr-auto bg-gray-50 dark:bg-slate-700 py-1 px-2 rounded-lg ${negative ? 'text-custom-red-100 dark:text-red-500' : 'text-green-600'}`}>
          {negative ? (<TbTrendingDown className='text-lg ' />)
            : (<TbTrendingUp className='text-lg ' />)}
          <span className=' text-xl font-yekan-bakh font-black' style={{ direction: 'ltr' }}>
            {percent}
            <TbPercentage className='inline-block text-sm' />
          </span>
        </div>
        <div className={`p-3 rounded-xl absolute -top-3 -left-3 shadow-both text-white text-base ${iconBgColor}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
