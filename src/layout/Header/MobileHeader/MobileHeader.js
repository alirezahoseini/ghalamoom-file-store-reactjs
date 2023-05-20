import React, { useMemo, useReducer, useRef, useState } from 'react'
import { FaBars, FaTimes, FaInstagram, FaLinkedin, FaTelegramPlane, FaYoutube } from 'react-icons/fa'

// datas
import { dynamicLinks } from '../../../data/links'
// utils
import { getCooki } from '../../../utils/cookis'

// Components
import Logo from '../../../components/ui/Logo'
import Button from '../../../components/ui/Button'
import HambergerMenu from '../../../components/ui/HambergerMenu'
import MobileNav from './Nav/MobileNav'
import SocialIcon from './Nav/SocialIcon'

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
            <div id='visable-header' className={`flex justify-between w-full items-center py-5 px-4 transition-colors duration-500 rounded-b-xl ${haderBg} `}>
                <Logo />
                <div className='flex items-center ml-2'>
                    <Button type='button' value={`${getCooki('token') !== null ? 'پنل کاربری' : 'ورود | ثبت نام'}`} link={true} url={dynamicLinks.panel} />
                    <button id='hamberger-opener' className=' bg-gray-1  text-2xl p-2 rounded-lg text-gray-500  mr-8' onClick={() => setShowHamberger(prevState => !prevState)}>
                        {showHamberger ? <FaTimes /> : <FaBars />}
                    </button>

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
