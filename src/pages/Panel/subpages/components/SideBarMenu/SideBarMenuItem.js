import React from 'react'
import { NavLink } from 'react-router-dom'
import './SideBarMenuItem.css'

export default function SideBarMenuItem({ title, path, icon, isOpen, desc = '', onClickEvent = null }) {
    return (
        onClickEvent === null ? (
            <NavLink to={path} className={`sidebar-menu-item flex w-full items-center gap-3 my-3 ${() => 'active'}`} title={desc} >
                <div className='item-icon p-3 rounded-full  flex items-center justify-center text-xl text-gray-700 text-1 dark:text-slate-200'>
                    <span className='icon'>
                        {icon}
                    </span>
                    <span className='bg'></span>
                </div>
                <div className={`transition-all duration-200 flex items-center whitespace-nowrap ${isOpen ? 'w-fit opacity-100 visible translate-x-0' : '-translate-x-5 w-0 opacity-0 invisible'}`}>
                    <h4 className='title font-bold text-gray-500 mt-2 dark:text-slate-300' >{title}</h4>
                </div>
            </NavLink>
        ) : (
            <NavLink  onClick={() => onClickEvent()} to={path} className={`sidebar-menu-item flex w-full items-center gap-3 my-3 ${() => 'active'}`} title={desc} >
                <div className='item-icon p-3 rounded-full  flex items-center justify-center text-xl text-gray-700 text-1 dark:text-slate-200'>
                    <span className='icon'>
                        {icon}
                    </span>
                    <span className='bg'></span>
                </div>
                <div className={`transition-all duration-200 flex items-center whitespace-nowrap ${isOpen ? 'w-fit opacity-100 visible translate-x-0' : '-translate-x-5 w-0 opacity-0 invisible'}`}>
                    <h4 className='title font-bold text-gray-500 mt-2 dark:text-slate-300' >{title}</h4>
                </div>
            </NavLink>
        )
    )
}
