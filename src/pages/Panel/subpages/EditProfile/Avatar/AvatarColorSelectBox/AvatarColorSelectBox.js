import React from 'react'
import { TbPalette } from 'react-icons/tb'

export default function AvatarColorSelectBox() {
    return (
        <div id='avatar-color-selectbox' className='inline-flex'>
            <button type='button' className='bg-slate-200 px-3 py-2 rounded-md flex items-center gap-2 text-slate-700 hover:bg-indigo-600 hover:text-slate-50 hover:shadow-both-0 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-indigo-600 ' >
                <TbPalette className='text-lg' />
                <span>تغییر رنگ پس زمینه</span>
            </button>
        </div>
    )
}
