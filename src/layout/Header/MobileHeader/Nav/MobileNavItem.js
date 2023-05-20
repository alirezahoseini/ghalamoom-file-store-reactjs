import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'

import './MobileNavItem.css'

export default function MobileNavItem({ name, url, subMenu, subLinks = null , onClose}) {
    const [isShowSubMenu, setIsShowSubMenu] = useState(false)


    return (
        <>
            {!subMenu ? (
                // single item ------------
                <Link to={url} className='mobile-nav-item font-yekan-bakh p-6 border-b-2 border-gray-100 text-sm font-bold text-gray-700 block' onClick={onClose}>
                    <span >{name}</span>
                </Link>
            ) : (
                // Whith Submenu ------------
                <li className={`mobile-nav-item submenu font-yekan-bakh p-6 border-b-2 border-gray-100 text-sm font-bold text-gray-700 ${isShowSubMenu ? 'active' : ''}`} >
                    {/* Submenu  */}
                    <div className='main-submenu flex w-full justify-between cursor-pointer' onClick={() => setIsShowSubMenu(prevState => !prevState)}>
                        <span>{name}</span>
                        <FaChevronLeft className={`transition-all duration-200 text-lg ${isShowSubMenu ? '-rotate-90' : ''}`} />
                    </div>
                    {/* Sublinks  */}
                    <div className={` transition-all duration-600 ${isShowSubMenu ? 'opacity-100' : 'opacity-0'}`}>
                        {
                            subLinks.map(subItem => (
                                <Link to={subItem.url} key={subItem.id} className={`submenu-item font-yekan-bakh pt-7 p-6 border-b-2 border-gray-100 text-sm font-bold text-gray-700 block`} onClick={onClose}>
                                    <span>{subItem.name}</span>
                                </Link>
                            ))
                        }
                    </div>
                </li>
            )}
        </>
    )
}
