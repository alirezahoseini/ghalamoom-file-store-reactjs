import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TbChevronLeft } from 'react-icons/tb'

const Breadcrumb = memo(({type = 'courses'}) => {
    const [title, setTitle] = useState();

    useEffect(()=>{
        if(type === 'course'){
            setTitle('دوره های آموزشی')
        }else if(type === 'product'){
            setTitle('فروشگاه فایل')
        }else if(type === 'artwork'){
            setTitle('نمونه کارها')
        }
    },[])
    return (
        <div className="breadcrumb font-bold bg-white rounded-md border my-3 w-full lg:w-fit px-3 py-2">
            <ul className='flex items-center gap-2'>
                <li className='flex items-center gap-2'>
                    <Link to={"/"} className='flex items-end  text-slate-600 gap-1 hover:text-blue-500'>
                        <span style={{fontSize: '12px'}}>خانه</span>
                    </Link>
                    <TbChevronLeft className='text-slate-400' />
                </li>
                <li className='text-xs text-slate-400'>
                    <span>
                        {title}
                    </span>
                </li>
            </ul>
        </div>
    )
})

export default Breadcrumb