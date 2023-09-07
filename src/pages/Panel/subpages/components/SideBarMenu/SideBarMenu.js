import React, { useState } from 'react'
import { TbSmartHome, TbBrandAppgallery, TbFolderMinus, TbPlanet, TbSwipe, TbUsers, TbCategory, TbMessages, TbPercentage, TbChevronDown, TbSettings2 } from 'react-icons/tb'
import './SideBarMenu.css'
import './SideBarMenuItem.css'

// components 
import SideBarMenuItem from './SideBarMenuItem'

export default function SideBarMenu({ isOpen, withEvent = false, onClickEvent }) {
  const [isShowSecondeMenuItems, setIsShowSecondeMenuItems] = useState(false);
  const firstMenuItemsArray = [
    { id: 1, title: 'داشبورد', path: 'dashboard', icon: <TbSmartHome />, desc: 'داشبورد' },
    { id: 2, title: 'محصولات', path: 'products', icon: <TbBrandAppgallery />, desc: 'لیست محصولات' },
    { id: 3, title: 'دوره ها', path: 'courses', icon: <TbFolderMinus />, desc: 'لیست دوره ها' },
    { id: 4, title: 'نمونه کارها', path: 'artworks', icon: <TbSwipe />, desc: 'لیست نمونه کارها' },
    { id: 5, title: 'کاربران', path: 'users', icon: <TbUsers />, desc: 'مدیریت کاربران' },
  ]
  const secondeMenuItemsArray = [
    { id: 6, title: 'دسته بندی ها', path: 'categories', icon: <TbCategory />, desc: 'دسته بندی ها' },
    { id: 7, title: 'تخفیف ها', path: 'offers', icon: <TbPercentage />, desc: 'تخفیف ها' },
    { id: 8, title: 'تیکت ها', path: 'tickets', icon: <TbMessages />, desc: 'تیکت ها' },
    { id: 8, title: 'ویرایش حساب کاربری', path: 'editprofile', icon: <TbSettings2 />, desc: ' ویرایش حساب کاربری' },
    { id: 9, title: 'بازگشت به سایت', path: '/', icon: <TbPlanet />, desc: 'بازگشت به سایت' },

  ]




  return (
    <div id='sidebar-menu' className='overflow-y-hidden mt-3 max-h-[57vh] min-h-[57vh] pt-5 pr-2 border-b border-gray-300 transition-all duration-300 dark:border-slate-600 relative overflow-x-hidden' >
      <div id='first-menu-items' className={`menu-section ${!isShowSecondeMenuItems && "active"} `}>
        {firstMenuItemsArray.map(link => (
          withEvent === false ? (
            <SideBarMenuItem key={link.id} {...link} isOpen={isOpen} />
          ) : (
            <SideBarMenuItem key={link.id} {...link} isOpen={isOpen} onClickEvent={onClickEvent} />
          )
        ))}
      </div>
      <div id='seconde-menu-items' className={`menu-section ${isShowSecondeMenuItems && "active"} `}>
        {secondeMenuItemsArray.map(link => (
          withEvent === false ? (
            <SideBarMenuItem key={link.id} {...link} isOpen={isOpen} />
          ) : (
            <SideBarMenuItem key={link.id} {...link} isOpen={isOpen} onClickEvent={onClickEvent} />
          )
        ))}
      </div>

      <button type='button' onClick={() => setIsShowSecondeMenuItems((prev) => !prev)}
        className={`sidebar-menu-item absolute bottom-5 right-4 pr-[2px] flex w-full items-center gap-3`} >
        <div className='item-icon rounded-full  flex items-center justify-center text-xl text-gray-700 text-1 dark:text-slate-200'>
          <span className={`text-2xl ${isShowSecondeMenuItems && 'rotate-180'} `}>
            <TbChevronDown />
          </span>
        </div>
        <div className={`transition-all duration-200 flex items-center whitespace-nowrap ${isOpen ? 'w-fit opacity-100 visible translate-x-0' : '-translate-x-5 w-0 opacity-0 invisible'}`}>
          <h4 className='title font-bold text-gray-500 dark:text-slate-300'> {isShowSecondeMenuItems ? 'گزینه های کمتر' : 'گزینه های بیشتر'} </h4>
        </div>
      </button>
    </div>
  )
}
