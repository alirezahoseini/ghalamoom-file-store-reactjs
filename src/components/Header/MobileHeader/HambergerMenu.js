import React, { useState } from 'react'
import { FaTimes, FaInstagram, FaLinkedin, FaTelegramPlane, FaYoutube } from 'react-icons/fa'

// Components
import MobileNav from './MobileNav'
import SocialIcon from './SocialIcon'

export default function HambergerMenu({ isShow, onClose }) {


    const [socialIcons, setSocialIcons] = useState([
        { id: 1, iconName: <FaTelegramPlane />, url: '#' },
        { id: 2, iconName: <FaInstagram />, url: '#' },
        { id: 3, iconName: <FaLinkedin />, url: '#' },
        { id: 4, iconName: <FaYoutube />, url: '#' },
    ])


    return (
        <div className={`w-screen h-screen p-0 m-0 fixed top-0 right-0 transition-all bg-black duration-700
        ${isShow ? ' pointer-events-auto visible bg-opacity-50	' : 'pointer-events-none invisible bg-opacity-0'}`}>
            {/* BackDrop Filter  */}
            <div id='BackDropFilter'
                className={`w-full h-full cursor-pointer`}
                onClick={() => onClose()}></div>
            {/* Main menu  */}
            <div id="mainMenu"
                className={`w-2/3 h-screen bg-white absolute top-0  transition-all duration-500 p-6 overflow-y-scroll
            ${isShow ? 'left-0' : ' -left-2/3'}`}>
                {/* Close Button  */}
                <button onClick={() => onClose()} className='text-2xl text-left w-full flex justify-end text-secondary-1'>
                    <FaTimes />
                </button>
                {/* Navigation  */}
                <MobileNav />
                {/* Social icons  */}
                <div className='flex justify-center items-center gap-2 my-4'>
                    {
                        socialIcons.map(icon => (
                            <SocialIcon key={icon.id} {...icon} >
                                {icon.iconName}
                            </SocialIcon>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


