import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { BsBoxSeam, BsMortarboard, BsHouse, BsColumns } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

// Components 
import UserAvatar from './UserAvatar'
import HambergerMenu from '../../Global/HambergerMenu'
import PanelHeaderItem from './PanelHeaderItem'

export default function PanelHeader() {

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const panelLinks = [
        { id: 'panelLink-3', title: 'داشبورد', path: 'dashbord', icon: <BsHouse /> },
        { id: 'panelLink-1', title: 'محصولات', path: 'products', icon: <BsBoxSeam /> },
        { id: 'panelLink-2', title: 'دوره ها', path: 'courses', icon: <BsMortarboard /> },
        { id: 'panelLink-5', title: 'نمونه کار ها', path: 'artworks', icon: <BsColumns /> },
        { id: 'panelLink-6', title: 'حساب کاربری', path: 'profile', icon: <FiUser /> },
    ]

    return (
        <div id="panel-header" className='w-full'>
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
                                <PanelHeaderItem key={`mobile-${link.id}`} {...link} />
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
                            <PanelHeaderItem key={`desktop-${link.id}`} {...link} />
                        ))
                    }
                </ul>
                <UserAvatar />
            </div>
            {/* // End of Desktop Header  */}
        </div>
    )
}
