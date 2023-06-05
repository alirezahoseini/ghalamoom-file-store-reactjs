import React from 'react'

// datas 
import avatarsArray from '../../../../../data/avatarsArray'

// components
import AvatarImageSelectBox from './AvatarImageSelectBox/AvatarImageSelectBox';
import AvatarColorSelectBox from './AvatarColorSelectBox/AvatarColorSelectBox';

export default function Avatar(props) {
    const {value, onChangeEvent} = props;
    const currentUrl = process.env.PUBLIC_URL + avatarsArray[value.avatar.id - 1].image
    
    const changeHandler = (event) => {
        console.log(event.target)
    }
  return (
    <div id='user-avatar' className='mt-10'>
        <div className='rounded-full w-6/12 lg:w-8/12 mx-auto my-5 outline outline-offset-4 outline-slate-300' style={{backgroundColor: value.bgColor}}>
            <img src={ currentUrl } alt="avatar" className='w-full' />
        </div>
        <div className='flex items-center justify-evenly gap-2 mt-8'>
            <AvatarColorSelectBox value={value.bgColor} changeHandler={changeHandler}  />
            <AvatarImageSelectBox value={value.avatar.id} changeHandler={changeHandler}  />
        </div>
    </div>
  )
}
