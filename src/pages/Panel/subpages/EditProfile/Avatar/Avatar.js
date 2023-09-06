import React, { useEffect, useState, createContext, memo, useMemo } from 'react'

// datas 
import avatarsArray, {bgColorsArray}  from '../../../../../data/avatarsArray';

// components
import AvatarImageSelectBox from './AvatarImageSelectBox/AvatarImageSelectBox';
import AvatarColorSelectBox from './AvatarColorSelectBox/AvatarColorSelectBox';

// Contexts
const UserAvatarContext = createContext();

const Avatar = memo((
    {
        onChangeEvent,
        bgColor = 1,
        avatar = 1 
    }
) => {
    const [userAvaterDetails, setUserAvaterDetails] = useState({ bgColor: bgColorsArray[bgColor - 1], avatar })
    const currentImageUrl = process.env.PUBLIC_URL + avatarsArray[avatar - 1].image
    const changeHandler = () => { onChangeEvent(userAvaterDetails) }

    useEffect(() => {
        changeHandler()
    }, [userAvaterDetails]);

    return (
        <div id='user-avatar' className='mt-10'>
            <div className='rounded-full w-6/12 lg:w-8/12 mx-auto my-5 outline outline-offset-4 outline-slate-300' style={{ backgroundColor: userAvaterDetails.bgColor.color }}>
                <img src={currentImageUrl} alt="avatar" className='w-full' width='493px' height='493px' />
            </div>
            <div className='flex items-center justify-evenly gap-2 mt-8'>
                {useMemo(() => (
                    <UserAvatarContext.Provider value={{ userAvaterDetails, setUserAvaterDetails }} >
                        <AvatarColorSelectBox />
                        <AvatarImageSelectBox />
                    </UserAvatarContext.Provider>
                ), [userAvaterDetails])}
            </div>
        </div>
    )
})

export default Avatar
export { UserAvatarContext }
