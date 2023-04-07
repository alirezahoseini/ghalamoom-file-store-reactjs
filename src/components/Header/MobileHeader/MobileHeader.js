import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'


// Components
import Logo from '../../Global/Logo'
import Button from '../../Global/Button'
import HambergerMenu from './Nav/HambergerMenu'

export default function MobileHeader() {
    const [showHamberger, setShowHamberger] = useState(false)


    return (
        <div id='mobile-header' className='lg:hidden py-10 mx-5'>
            {/* Visable Header  */}
            <div id='visable-header' className='flex justify-between w-full items-center pr-2'>
                <Logo />
                <Button type='button' value='ورود | ثبت نام' link={true} url='/panel' />
            </div>
            {/* Hamberger menu  */}
            <div className='text-left mt-7 ml-2'>
                <button id='hamberger-opener' className=' bg-gray-1  text-2xl p-2 rounded-lg text-secondary-1 shadow-both' onClick={() => setShowHamberger(prevState => !prevState)}>
                    {showHamberger ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            <HambergerMenu isShow={showHamberger} onClose={() => setShowHamberger(prevState => !prevState)} />
        </div>
    )
}
