import React, { useContext } from 'react'

//  Contexts
import { UserAvatarContext } from '../Avatar'

export default function AvatarImageSelectBoxItem(props) {
  const { setUserAvaterDetails } = useContext(UserAvatarContext);
  const changeHandler = () => {
    setUserAvaterDetails(prev => {
      return {
        bgColor: prev.bgColor,
        avatar: {
          id: props.id,
          image: props.image
        }
      }})
      props.setIsShowSelectBox(false)
  }
  return (
    <div className='w-6/12 md:w-4/12 lg:w-3/12 p-2'>
      <input
        onChange={changeHandler}
        type="radio"
        name='avatar-image'
        id={`avatar-img-${props.id}`}
        value={props.id}
        className='hidden'
        checked={props.isChecked} />
      <label htmlFor={`avatar-img-${props.id}`} className='cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full border border-transparent hover:border-blue-500 w-full h-full inline-block'>
        <img src={process.env.PUBLIC_URL + props.image} alt="avatar-iamge" className='max-w-full' />
      </label>
    </div>
  )
}
