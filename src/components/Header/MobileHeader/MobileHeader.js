import React, { useState } from 'react'
import { FaBars, FaTimes, FaInstagram, FaLinkedin, FaTelegramPlane, FaYoutube } from 'react-icons/fa'


// files 
import { dynamicLinks } from '../../../dynamicLinks.js'
import {getCooki} from '../../../utils.js'

// Components
import Logo from '../../Global/Logo'
import Button from '../../Global/Button'
import HambergerMenu from '../../Global/HambergerMenu'
import MobileNav from './Nav/MobileNav'
import SocialIcon from './Nav/SocialIcon'

export default function MobileHeader() {
    const [showHamberger, setShowHamberger] = useState(false)

    const [socialIcons, setSocialIcons] = useState([
        { id: 'socialIcons-1', iconName: <FaTelegramPlane />, url: '#' },
        { id: 'socialIcons-2', iconName: <FaInstagram />, url: '#' },
        { id: 'socialIcons-3', iconName: <FaLinkedin />, url: '#' },
        { id: 'socialIcons-4', iconName: <FaYoutube />, url: '#' },
    ])

    return (
        <div id='mobile-header' className='lg:hidden py-10 mx-5'>
            {/* Visable Header  */}
            <div id='visable-header' className='flex justify-between w-full items-center pr-2'>
                <Logo />
                <div className='flex items-center ml-2'>
                    <Button type='button' value={`${getCooki('token') !== null ? 'پنل کاربری' : 'ورود | ثبت نام'}`} link={true} url={dynamicLinks.panel} />
                    <button id='hamberger-opener' className=' bg-gray-1  text-2xl p-2 rounded-lg text-secondary-1 shadow-both mr-6' onClick={() => setShowHamberger(prevState => !prevState)}>
                        {showHamberger ? <FaTimes /> : <FaBars />}
                    </button>

                </div>
            </div>
            {/* Start Hamberger menu  */}
            <HambergerMenu isShow={showHamberger} onClose={() => setShowHamberger(prevState => !prevState)}>
                {/* Navigation  */}
                <MobileNav onClose={() => setShowHamberger(prevState => !prevState)} />
                {/* Social icons  */}
                <div className='flex justify-center items-center gap-2 my-4'>
                    {
                        socialIcons.map(icon => (
                            <SocialIcon key={icon.id} {...icon} پ >
                                {icon.iconName}
                            </SocialIcon>
                        ))
                    }
                </div>
            </HambergerMenu>
            {/* End of Hamberger menu  */}
        </div>
    )
}
