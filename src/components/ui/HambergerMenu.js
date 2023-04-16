import React from 'react'
import { FaTimes, } from 'react-icons/fa'


export default function HambergerMenu({ isShow, onClose, position = 'left', width = 'w-10/12', bgColor = 'bg-white', children }) {

    return (
        <div id='hamberger-menu' className={`w-full h-screen p-0 m-0 fixed top-0 right-0 transition-all bg-black duration-700 z-50
        ${isShow ? ' pointer-events-auto visible bg-opacity-50	' : 'pointer-events-none invisible bg-opacity-0'}`}>
            {/* BackDrop Filter  */}
            <div id='BackDropFilter'
                className={`w-full h-full cursor-pointer`}
                onClick={() => onClose()}></div>
            {/* -------------------  Open from RIGHT SIDE  ------------------- */}
            {position === 'right' ? (
                <div id="mainMenu"
                    className={`${width} h-screen ${bgColor} absolute top-0  transition-all duration-500 overflow-y-scroll -right-0
                    ${isShow ? `translate-x-0` : `translate-x-full`}`}>
                    {/* Content  */}
                    {children}
                </div>
            ) : (
                /* -------------------  Open from LEFT SIDE  ------------------- */
                <div id="mainMenu"
                    className={`${width} h-screen bg-white absolute top-0  transition-all duration-500 overflow-y-scroll -left-0 
                    ${isShow ? `translate-x-0` : `-translate-x-full`}`}>
                 
                    {/* Content  */}
                    {children}
                </div>
            )
            }

        </div>
    )
}


