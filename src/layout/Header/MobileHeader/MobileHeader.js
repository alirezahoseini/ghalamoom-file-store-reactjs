import React, { useMemo, useState } from 'react'
import { TbUser } from 'react-icons/tb'
import {Link} from 'react-router-dom'

import { FaBars, FaTimes, FaInstagram, FaLinkedin, FaTelegramPlane, FaYoutube } from 'react-icons/fa'

// datas
import { dynamicLinks } from '../../../data/links'

// Components
import Logo from '../../../components/ui/Logo'
import HambergerMenu from '../../../components/ui/HambergerMenu'
import MobileNav from './Nav/MobileNav'
import SocialIcon from './Nav/SocialIcon'
import ShoppingCart from '../ShoppingCart/ShoppingCart'

export default function MobileHeader() {

    const [showHamberger, setShowHamberger] = useState(false)
    const [haderBg, setHeaderBg] = useState('bg-transparent');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            setHeaderBg('bg-white shadow-both-2 ')
        } else if (window.scrollY < 5) {
            setHeaderBg('bg-transparent')
        }
    })

    const socialIcons = [
        { id: 'socialIcons-1', iconName: <FaTelegramPlane />, url: '#' },
        { id: 'socialIcons-2', iconName: <FaInstagram />, url: '#' },
        { id: 'socialIcons-3', iconName: <FaLinkedin />, url: '#' },
        { id: 'socialIcons-4', iconName: <FaYoutube />, url: '#' },
    ];


    return (
        <div id='mobile-header' className='lg:hidden'>
            {/* Visable Header  */}
            <div id='visable-header' className={`flex justify-between w-full items-center py-5 px-3 transition-colors duration-500 rounded-b-xl ${haderBg} `}>
                <Logo width='90' />
                <div className='flex items-center ml-1'>
                    {/* Login button  */}
                    <Link to={dynamicLinks.panel} className='shadow-both-0 text-xl bg-blue-600 w-10 h-10 flex items-center justify-center rounded-xl mx-2 text-white hover:bg-slate-600'>
                        <TbUser />
                    </Link>
                    {/* Login button  */}
                    {/* Shopping cart */}
                    <ShoppingCart />
                    {/* Shopping cart */}
                    {/* Hamberger toggler */}
                    <button id='hamberger-opener' className=' bg-gray-1  text-2xl p-2 rounded-lg text-gray-500 mr-2' onClick={() => setShowHamberger(prevState => !prevState)}>
                        {showHamberger ? <FaTimes /> : <FaBars />}
                    </button>
                    {/* Hamberger toggler */}

                </div>
            </div>
            {/* Start Hamberger menu  */}
            {useMemo(() => (
                <HambergerMenu isShow={showHamberger} onClose={() => setShowHamberger(prevState => !prevState)}>
                    <div className='px-4'>
                        {/* Close Button  */}
                        {<button onClick={() => setShowHamberger(prevState => !prevState)} className='text-2xl text-left w-full flex justify-end text-gray-500 mt-6 pl-4'>
                            <FaTimes />
                        </button>}
                        {/* Navigation  */}
                        <MobileNav onClose={() => setShowHamberger(prevState => !prevState)} />
                        {/* Social icons  */}
                        <div className='flex justify-center items-center gap-2 my-4'>
                            {
                                socialIcons.map(icon => (
                                    <SocialIcon key={icon.id} {...icon}>
                                        {icon.iconName}
                                    </SocialIcon>
                                ))
                            }
                        </div>
                    </div>
                </HambergerMenu>
            ), [showHamberger])}
            {/* End of Hamberger menu  */}
        </div>
    )
}
