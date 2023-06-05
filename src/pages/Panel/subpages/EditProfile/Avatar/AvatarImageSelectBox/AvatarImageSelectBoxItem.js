import React from 'react'

export default function AvatarImageSelectBoxItem(props) {
  return (
    <div className='w-6/12 md:w-4/12 lg:w-3/12 p-2'>
    <input type="radio" name='avatar-image' id={props.id} value={props.id} className='hidden' />
    <label htmlFor={props.id} className='cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full border border-transparent hover:border-blue-500 w-full h-full inline-block'>
        <img src={process.env.PUBLIC_URL + props.image} alt="avatar-iamge" className='max-w-full' />
    </label>
</div>
  )
}
