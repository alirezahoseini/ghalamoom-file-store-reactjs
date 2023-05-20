import React, { useMemo } from 'react'
import './StarterBaner.css'
import { Link } from 'react-router-dom'
// datas 
import { dynamicLinks } from '../../../../data/links'
// assets
import heartIcon from '../../../../assets/icons/heart-icon.svg'
import starIcon from '../../../../assets/icons/star-icon.svg'
import gBoyImage from '../../../../assets/images/home/starterBaner/g-boy.webp'
import usersIcons from '../../../../assets/images/home/starterBaner/user-icons-starter.png'
import StartCounter from './StartCounter'


export default function StarterBaner() {

    return (
        <div id="starter-baner" className='w-full p-2 mt-20 py-10 lg:mt-10'>
            <div id="main-wrapper" className=' relative flex flex-col-reverse lg:flex-row items-end justify-between rounded-4xl p-5 md:p-0 lg:rounded-4xl  '>
                {/* Start Baner Content */}
                <div className="content text-center flex flex-col gap-9 mt-6 md:mb-10 lg:mb-0 lg:w-5/12 lg:text-right lg:p-10 lg:gap-12 self-center">
                    <p className='text-gray-400 text-base lg:text-xl'>به <strong>قلموم</strong> خوش اومدی!</p>
                    <h2 className='text-xl md:text-3xl font-yekan font-black tracking-tighter text-gray-300 lg:text-5xl lg:leading-11 '>برای یادگیری گرافیک دیزاین آماده ای؟!</h2>
                    {/* Start buttons */}
                    <div className="starter-buttons flex w-full font-bold justify-around text-sm  lg:items-start lg:justify-start">
                        {useMemo(() => (
                            <Link to={dynamicLinks.course} className='flex items-center bg-gray-400 py-3 w-6/12 rounded-lg justify-evenly text-gray-900 hover:bg-gray-300 transition-all duration-500 lg:rounded-3xl lg:w-5/12'>
                                <img src={starIcon} alt="star icon" />
                                <span>مشاهده دوره ها</span>
                            </Link>
                        ), [])}
                        {useMemo(() => (
                            <Link to={dynamicLinks.videos} className='flex items-center py-3 w-6/12 rounded-lg justify-evenly text-gray-400 lg:w-5/12'>
                                <img src={heartIcon} alt="heart icon" />
                                <span>آموزش رایگان</span>
                            </Link>
                        ), [])}
                    </div>
                    {/* End of buttons */}
                </div>
                {/* End of Baner Content */}
                {/* Start Background shape  */}
                <div id='background-shape' className='pointer-events-none lg:w-6/12 flex lg:items-end  relative lg:h-full' >
                    <div id='shape' className='-mt-32 w-full p-1 flex justify-center items-start bg-custom-primary-200 rounded-t-fifty rounded-b-5xl  md:w-7/12 md:mx-auto lg:mx-0 lg:rounded-b-none lg:-mt-0  lg:pb-0 relative'>
                        {/* Bakground  */}
                        <div className='w-full bg-custom-primary-200 border-4 pt-3 border-custom-primary-100  rounded-t-fifty rounded-b-5xl lg:rounded-b-none lg:border-b-0 '>
                            {/* This image show in Mobile */}
                            <img id='one' src={gBoyImage} alt="bg" className='lg:opacity-0' width='500px' height='500px' />
                        </div>
                        {/* This image show in Desktop */}
                        <img id='two' src={gBoyImage} alt="bg" className='absolute bottom-0 opacity-0 hidden lg:opacity-100 lg:block ' width='500px' height='500px' />
                        {/* Users Counter  */}
                        <div id='users-counter' className='absolute bottom-5 left-0 flex items-center px-5 py-3 lg:py-3 lg:px-6 rounded-2xl bg-white backdrop-blur-md bg-opacity-10 text-white lg:-left-1/3 '>
                            <StartCounter />
                            <img src={usersIcons} alt="users" className='w-20 lg:w-24' />
                        </div>
                        {/* End of Users Counter  */}
                    </div>
                </div>
                {/* End of Background shape  */}
            </div>
        </div>
    )
}
