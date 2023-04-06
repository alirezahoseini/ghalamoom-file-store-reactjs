import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'


// Components
import Logo from '../../Global/Logo'
import Button from '../../Global/Button'
import HambergerMenu from './HambergerMenu'

export default function MobileHeader() {
    const [showHamberger, setShowHamberger] = useState(false)


    return (
        <div className='lg:hidden py-10 mx-5'>
            <div className='flex justify-between w-full items-center'>
                <Logo />
                <Button type='button' value='ورود | ثبت نام' link={true} url='/panel' />
            </div>
            <div className='text-left mt-7 ml-2'>
                <button className=' bg-gray-1  text-2xl p-2 rounded-lg text-secondary-1 shadow-both' onClick={() => setShowHamberger(prevState => !prevState)}>
                    {showHamberger ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            <HambergerMenu isShow={showHamberger} onClose={() => setShowHamberger(prevState => !prevState)} />
        </div>
    )
}
