import React from 'react'
// assets
import avatarImg from '../../../../assets/images/panel/avatar.png'

export default function UserAvatar() {
    return (
        <div id="user-avatar" className='w-fit bg-gray-1 pt-2 px-1 rounded-4xl overflow-hidden'>
            <img src={avatarImg}alt="avatar" width={42} />
        </div>
    )
}
