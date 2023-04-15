import React from 'react'
import {HiPlusSm} from 'react-icons/hi'

// assets
import userAvatar from '../../../../../../assets/images/panel/avatars/Avatar-9.png'

export default function UserInfo({userName, isOpen}) {
  return (
    <div id='user-info' className={`flex w-full items-center gap-6 border-b border-gray-2 pb-5`} >
        <div className={`user-img bg-pink-3 w-fit flex items-center justify-center rounded-full min-w-fit relative`} style={{outline: '1px solid #d8d8d8', outlineOffset: '2px'}}>
            <img src={userAvatar} alt="user avatar" style={{minWidth: '54px', maxWidth: '54px'}} />
            <div className="plus-btn absolute -left-2 -bottom-1 bg-blue-5 rounded-full p-1">
                <HiPlusSm className='bg-green-1 text-white text-base rounded-full' style={{boxShadow: '0 2px 10px #399b0086'}} />
            </div>
        </div> 
        <div className={`user-name transition-all duration-200 ${isOpen ? 'w-fit opacity-100 visible translate-x-0' : '-translate-x-5 w-0 opacity-0 invisible'}`}>
            <span className='text-gray-3 inline-block mb-1 text-xs font-bold' >سلام</span>
            <h4 className='font-bold text-text-1' >{userName}</h4>
        </div>
    </div>
  )
}
