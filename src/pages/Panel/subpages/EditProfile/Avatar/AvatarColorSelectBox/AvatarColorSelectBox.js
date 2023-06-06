import React, {useContext} from 'react'
import { TbPalette } from 'react-icons/tb'

//  Contexts
import {UserAvatarContext} from '../Avatar'


export default function AvatarColorSelectBox() {
    const { userAvaterDetails , setUserAvaterDetails } = useContext(UserAvatarContext);

    const changeHandler = (event) => {
        setUserAvaterDetails(prev => {
          return {
            bgColor: event.target.value,
            avatar: prev.avatar
          }})
      }
    return (
        <div id='avatar-color-selectbox' className='inline-flex'>
            <label
            htmlFor='select-color-input'
             type='button' className='bg-slate-200 px-3 py-2 rounded-md flex items-center gap-2 text-slate-700 hover:bg-indigo-600 hover:text-slate-50 hover:shadow-both-0 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-indigo-600 ' >
                <TbPalette className='text-lg' />
                <span>تغییر رنگ پس زمینه</span>
            </label>
            <input value={userAvaterDetails.bgColor} onChange={changeHandler} type="color" name="select-color-input" id="select-color-input" className='w-0 h-0 invisible' />
        </div>
    )
}
