import React, { useEffect, useState } from 'react'

// datas 
import avatarsArray from '../../../../../data/avatarsArray'

// components
import AvatarImageSelectBox from './AvatarImageSelectBox/AvatarImageSelectBox';
import AvatarColorSelectBox from './AvatarColorSelectBox/AvatarColorSelectBox';
import { createContext } from 'react';

// Contexts
const UserAvatarContext = createContext()

export default function Avatar(props) {
    const [userAvaterDetails, setUserAvaterDetails] = useState(props.value)
    const currentUrl = process.env.PUBLIC_URL + avatarsArray[props.value.avatar.id - 1].image
    
    useEffect(() => {
        props.onChangeEvent(userAvaterDetails)
    }, [userAvaterDetails])
  return (
    <div id='user-avatar' className='mt-10'>
        <div className='rounded-full w-6/12 lg:w-8/12 mx-auto my-5 outline outline-offset-4 outline-slate-300' style={{backgroundColor: userAvaterDetails.bgColor}}>
            <img src={ currentUrl } alt="avatar" className='w-full' width='493px' height='493px'/>
        </div>
        <div className='flex items-center justify-evenly gap-2 mt-8'>
            <UserAvatarContext.Provider value={{userAvaterDetails, setUserAvaterDetails}} >
            <AvatarColorSelectBox />
            <AvatarImageSelectBox />
            </UserAvatarContext.Provider>
        </div>
    </div>
  )
}

export {UserAvatarContext}
