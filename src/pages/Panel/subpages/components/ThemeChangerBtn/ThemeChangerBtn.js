import React, { useEffect } from 'react'
import { BiMoon } from 'react-icons/bi'
import { FiSun } from 'react-icons/fi'
import './ThemeChangerBtn.css'

// hooks
import useThemeChanger from '../../../../../hooks/useThemeChanger'

export default function ThemeChangerBtn() {
    const [theme, setTheme] = useThemeChanger()
    return (
        <div id='theme-changer-btn' className='bg-slate-300 mt-2 rounded-xl shadow-both-0  text-blue-900  overflow-hidden p-1 text-sm relative dark:text-slate-100 dark:bg-slate-700 lg:dark:bg-slate-800'>
            <div className={`bg-shape bg-gray-50 dark:bg-slate-600 lg:dark:bg-slate-700 ${theme !== 'dark' ? 'right' : ''}`}></div>
            <div className='buttons flex items-center w-full relative'>
                <button onClick={() => setTheme('light')} className={`py-2 pr-1 w-6/12 flex items-center justify-center`}>
                    <FiSun />
                </button>
                <button onClick={() => setTheme('dark')} className={`py-2 pl-1 w-6/12 flex items-center justify-center`}>
                    <BiMoon />
                </button>
            </div>
        </div>
    )
}
