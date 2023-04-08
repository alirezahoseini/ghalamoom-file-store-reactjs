import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

// Components 
import UserAvatar from './UserAvatar'
import HambergerMenu from '../../Global/HambergerMenu'

export default function PanelHeader() {

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const panelLinks = [
        { id: 'panelLink-1', title: 'محصولات', path: 'products' },
        { id: 'panelLink-2', title: 'دوره ها', path: 'courses' },
        // {id: 'panelLink-3', title: 'پست ها', path: 'posts' },
    ]

    return (
        <div id="panel-header">
            {/* // Mobile Header  */}
            <div id='mobile-header' className='lg:hidden bg-white flex items-center p-4'>
                <div className='w-full flex items-center justify-between'>
                    <button id='menu-opener-btn' className='  text-2xl p-2  mr-6' onClick={() => setShowMobileMenu(prevState => !prevState)}>
                        {showMobileMenu ? <FaTimes /> : <FaBars />}
                    </button>
                    <UserAvatar />
                </div>
                {/* Start Hamberger menu  */}
                <HambergerMenu isShow={showMobileMenu} onClose={() => setShowMobileMenu(prevState => !prevState)} position='right' width='w-5/12' closeBtn={false}>
                    <ul>
                        {
                            panelLinks.map(link => (
                                <li key={link.id}>
                                    <NavLink onClick={() => setShowMobileMenu(prevState => !prevState)} to={link.path} className={`mobile-menu-item p-2 my-5 flex rounded-lg 
                                     ${isActive => isActive ? "active" : ""}`
                                    } >
                                        {link.title}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </HambergerMenu>
                {/* End of Hamberger menu  */}
            </div>
            {/* // End of Mobile Header  */}
            {/* // Desktop Header  */}
            <div id="desktop-header" className='hidden lg:flex bg-white p-4 items-center justify-between'>
                <ul className='flex items-center gap-3'>
                    {
                        panelLinks.map(link => (
                            <li key={link.id}>
                                <NavLink onClick={() => setShowMobileMenu(prevState => !prevState)} to={link.path} className={`mobile-menu-item py-2 px-5 my-5 flex hover:bg-gray-1 rounded-xl duration-300
                                     ${isActive => isActive ? "active" : ""}`
                                } >
                                    {link.title}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
                <UserAvatar />
            </div>
            {/* // End of Desktop Header  */}
        </div>
    )
}
