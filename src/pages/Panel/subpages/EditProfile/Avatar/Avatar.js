import React, { memo, useContext } from 'react'

// datas 
import avatarsArray from '../../../../../data/avatarsArray'

// components
import AvatarImageSelectBox from './AvatarImageSelectBox/AvatarImageSelectBox';
import AvatarColorSelectBox from './AvatarColorSelectBox/AvatarColorSelectBox';

// Contexts
import { UserInformationContext } from '../../../../../Contexts/UserInformationContext/UserInformationContextProvider'

const Avatar = memo((
) => {
    const { userInfoContext } = useContext(UserInformationContext);
    const currentImageUrl = process.env.PUBLIC_URL + avatarsArray[userInfoContext.userInfo.avatar.avatar.id - 1].image;

    return (
        <div id='user-avatar' className='mt-10'>
            <div className='rounded-full w-6/12 lg:w-8/12 mx-auto my-5 outline outline-offset-4 outline-slate-300' style={{ backgroundColor: userInfoContext.userInfo.avatar.bgColor.color }}>
                <img src={currentImageUrl} alt="avatar" className='w-full' width='493px' height='493px' />
            </div>
            <div className='flex items-center justify-evenly gap-2 mt-8'>
                <AvatarColorSelectBox />
                <AvatarImageSelectBox />
            </div>
        </div>
    )
})

export default Avatar
