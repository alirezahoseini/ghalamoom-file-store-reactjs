import React from 'react'
import { TbSmartHome, TbBrandAppgallery, TbFolderMinus,  TbPlanet, TbUsers } from 'react-icons/tb'

// components 
import SideBarMenuItem from './SideBarMenuItem'

export default function SideBarMenu({ isOpen }) {
  const linksArray = [
    {id: 1, title: 'داشبورد', path: 'dashboard', icon: <TbSmartHome /> },
    {id: 2, title: 'محصولات', path: 'products', icon: <TbBrandAppgallery /> },
    {id: 3, title: 'دوره ها', path: 'courses', icon: <TbFolderMinus /> },
    {id: 4, title: 'کاربران', path: 'users', icon: <TbUsers /> },
    {id: 5, title: 'بازگشت به سایت', path: '/', icon: <TbPlanet /> },
  ]
  return (
    <div id='sidebar-menu' className='pt-5 pr-2 border-b border-gray-300 transition-all duration-300 dark:border-slate-600' >
      {linksArray.map(link => (
        <SideBarMenuItem key={link.id} {...link} isOpen={isOpen} />
      ))}
    </div>
  )
}