import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { FiUser, FiLogOut } from 'react-icons/fi'
import { AiOutlineDashboard } from 'react-icons/ai'
import { BsBoxSeam, BsMortarboard, BsHouse, BsColumns } from 'react-icons/bs'

// files 
import { deleteCooki } from '../../../utils.js'

// Components 
import UserAvatar from './UserAvatar'
import HambergerMenu from '../../Global/HambergerMenu'
import PanelHeaderItem from './PanelHeaderItem'

export default function PanelHeader() {
    const navigateTo = useNavigate();

    const logoutHandler = () => {
        deleteCooki('token')
        deleteCooki('email')
        deleteCooki('username')
        navigateTo('/')
    }

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const panelLinks = [
        { id: 'panelLink-3', title: 'داشبورد', path: 'dashboard', icon: <AiOutlineDashboard /> },
        { id: 'panelLink-1', title: 'محصولات', path: 'products', icon: <BsBoxSeam /> },
        { id: 'panelLink-2', title: 'دوره ها', path: 'courses', icon: <BsMortarboard /> },
        { id: 'panelLink-5', title: 'نمونه کار ها', path: 'artworks', icon: <BsColumns /> },
        { id: 'panelLink-6', title: 'حساب کاربری', path: 'profile', icon: <FiUser /> },
        { id: 'panelLink-7', title: 'بازگشت به سایت', path: '/', icon: <BsHouse /> },
    ]

    return (
        <div id="panel-header" className='w-full'>
            {/* // Mobile Header  */}
            <div id='mobile-header' className='rounded-none sm:rounded-xl lg:hidden bg-white flex items-center p-4'>
                <div className='w-full flex items-center justify-between'>
                    <button id='menu-opener-btn' className='  text-2xl p-2 text-text-1 mr-1' onClick={() => setShowMobileMenu(prevState => !prevState)}>
                        {showMobileMenu ? <FaTimes /> : <FaBars />}
                    </button>
                    <UserAvatar />
                </div>
                {/* Start Hamberger menu  */}
                <HambergerMenu isShow={showMobileMenu} onClose={() => setShowMobileMenu(prevState => !prevState)} position='right' width='w-7/12' closeBtn={false}>
                    <ul>
                        {
                            panelLinks.map(link => (
                                <PanelHeaderItem key={`mobile-${link.id}`} {...link} onClose={() => setShowMobileMenu(prevState => !prevState)} />
                            ))
                        }
                        <li onClick={logoutHandler} className='mobile-menu-item p-2 text-secondary-2 my-2 flex rounded-lg lg:rounded-r-none items-center hover:bg-red-4 hover:text-red-4 hover:bg-opacity-10 transition-all duration-300 cursor-pointer' >
                            <span className='text-lg ml-2'>
                                <FiLogOut />
                            </span>
                            <span>خروج از حساب</span>
                        </li>
                    </ul>
                </HambergerMenu>
                {/* End of Hamberger menu  */}
            </div>
            {/* // End of Mobile Header  */}
            {/* // Desktop Header  */}
            <div id="desktop-header" className='hidden lg:flex bg-white h-fit py-3 pl-3 rounded-2xl'>
                <ul className='w-full' >
                    {
                        panelLinks.map(link => (
                            <PanelHeaderItem key={`desktop-${link.id}`} {...link} onClose={() => setShowMobileMenu(prevState => !prevState)} />
                        ))
                    }
                    <li onClick={logoutHandler} className='mobile-menu-item p-2 text-secondary-2 my-2 flex rounded-lg lg:rounded-r-none items-center hover:bg-red-4 hover:text-red-4 hover:bg-opacity-10 transition-all duration-300 cursor-pointer' >
                        <span className='text-lg ml-2'>
                            <FiLogOut />
                        </span>
                        <span>خروج از حساب</span>
                    </li>
                </ul>
            </div>
            {/* // End of Desktop Header  */}
        </div>
    )
}
