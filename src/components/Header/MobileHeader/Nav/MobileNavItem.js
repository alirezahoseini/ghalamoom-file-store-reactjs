import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'

export default function MobileNavItem({ name, url, subMenu, subLinks = null , onClose}) {
    const [isShowSubMenu, setIsShowSubMenu] = useState(false)


    return (
        <>
            {!subMenu ? (
                // single item ------------
                <li className='mobile-nav-item font-yekan-bakh p-6 border-b-2 border-gray-1 text-xs font-bold text-primary-1' onClick={onClose}>
                    <Link to={url}>{name}</Link>
                </li>
            ) : (
                // Whith Submenu ------------
                <li className='mobile-nav-item submenu font-yekan-bakh p-6 border-b-2 border-gray-1 text-xs font-bold text-primary-1 transition-all duration-200'>
                    {/* Submenu  */}
                    <div className='main-submenu flex w-full justify-between cursor-pointer transition-all duration-500' onClick={() => setIsShowSubMenu(prevState => !prevState)}>
                        <span>{name}</span>
                        <FaChevronLeft className={`transition-all duration-200 text-md ${isShowSubMenu ? '-rotate-90' : ''}`} />
                    </div>
                    {/* Sublinks  */}
                    <div className={` transition-all duration-500 ${!isShowSubMenu ? ' max-h-0 overflow-hidden' : 'h-auto'}`}>
                        {
                            subLinks.map(subItem => (
                                <div key={subItem.id} className={`submenu-item font-yekan-bakh pt-7 p-6 border-b-2 border-gray-1 text-xs font-bold text-primary-1 `} onClick={onClose}>
                                    <Link to={subItem.url}>{subItem.name}</Link>
                                </div>
                            ))
                        }
                    </div>
                </li>
            )
            }
        </>
    )
}
