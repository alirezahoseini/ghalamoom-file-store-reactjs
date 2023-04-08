import React from 'react'
import { FaTimes, } from 'react-icons/fa'


export default function HambergerMenu({ isShow, onClose, position = 'left', width = 'w-10/12', closeBtn = true, children }) {

    return (
        <div id='hamberger-menu' className={`w-screen h-screen p-0 m-0 fixed top-0 right-0 transition-all bg-black duration-700 z-50
        ${isShow ? ' pointer-events-auto visible bg-opacity-50	' : 'pointer-events-none invisible bg-opacity-0'}`}>
            {/* BackDrop Filter  */}
            <div id='BackDropFilter'
                className={`w-full h-full cursor-pointer`}
                onClick={() => onClose()}></div>
            {/* -------------------  Open from RIGHT SIDE  ------------------- */}
            {position === 'right' ? (
                <div id="mainMenu"
                    className={`${width} h-screen bg-white absolute top-0  transition-all duration-500 p-6 overflow-y-scroll -right-0
                    ${isShow ? `translate-x-0` : `translate-x-full`}`}>
                    {/* Close Button  */}
                    {
                        closeBtn && <button onClick={() => onClose()} className='text-2xl text-left w-full flex justify-end text-secondary-1'>
                            <FaTimes />
                        </button>
                    }
                    {/* Content  */}
                    {children}
                </div>
            ) : (
                /* -------------------  Open from LEFT SIDE  ------------------- */
                <div id="mainMenu"
                    className={`${width} h-screen bg-white absolute top-0  transition-all duration-500 p-6 overflow-y-scroll -left-0 
                    ${isShow ? `translate-x-0` : `-translate-x-full`}`}>
                    {/* Close Button  */}
                    {
                        closeBtn && <button onClick={() => onClose()} className='text-2xl text-left w-full flex justify-end text-secondary-1'>
                            <FaTimes />
                        </button>
                    }
                    {/* Content  */}
                    {children}
                </div>
            )
            }

        </div>
    )
}


