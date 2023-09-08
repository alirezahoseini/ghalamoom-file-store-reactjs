import React, { useState } from 'react'
import { TbSmartHome, TbBrandAppgallery, TbFolderMinus, TbPlanet, TbSwipe, TbUsers, TbCategory, TbMessages, TbPercentage, TbChevronDown, TbSettings2 } from 'react-icons/tb'
// import './SideBarMenu.css'
// import './SideBarMenuItem.css'

// components 
import SideBarMenuItem from '../../../SideBarMenu/SideBarMenuItem'

export default function MobileMenuItems({ isOpen, withEvent = false, onClickEvent }) {
    const itemsArray = [
        { id: 1, title: 'داشبورد', path: 'dashboard', icon: <TbSmartHome />, desc: 'داشبورد' },
        { id: 2, title: 'محصولات', path: 'products', icon: <TbBrandAppgallery />, desc: 'لیست محصولات' },
        { id: 3, title: 'دوره ها', path: 'courses', icon: <TbFolderMinus />, desc: 'لیست دوره ها' },
        { id: 4, title: 'نمونه کارها', path: 'artworks', icon: <TbSwipe />, desc: 'لیست نمونه کارها' },
        { id: 5, title: 'کاربران', path: 'users', icon: <TbUsers />, desc: 'مدیریت کاربران' },
        { id: 6, title: 'دسته بندی ها', path: 'categories', icon: <TbCategory />, desc: 'دسته بندی ها' },
        { id: 7, title: 'تخفیف ها', path: 'offers', icon: <TbPercentage />, desc: 'تخفیف ها' },
        { id: 8, title: 'تیکت ها', path: 'tickets', icon: <TbMessages />, desc: 'تیکت ها' },
        { id: 9, title: 'ویرایش حساب کاربری', path: 'editprofile', icon: <TbSettings2 />, desc: ' ویرایش حساب کاربری' },
        { id: 10, title: 'بازگشت به سایت', path: '/', icon: <TbPlanet />, desc: 'بازگشت به سایت' },
    ]

    return (
        <div id='sidebar-menu' className='overflow-y-hidden pt-2 pr-2 border-b border-gray-300 transition-all duration-300 dark:border-slate-600 relative overflow-x-hidden' >
            {itemsArray.map(link => (
                withEvent === false ? (
                    <SideBarMenuItem key={link.id} {...link} isOpen={isOpen} />
                ) : (
                    <SideBarMenuItem key={link.id} {...link} isOpen={isOpen} onClickEvent={onClickEvent} />
                )
            ))}
        </div>
    )
}
