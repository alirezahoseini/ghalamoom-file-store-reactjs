import React, { useContext } from 'react'

//  Contexts
import { UserAvatarContext } from '../Avatar'

export default function AvatarColorSelectBoxItem(props) {
    console.log(props)
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
    // <div>
    //     <button type='button'
    //     className='w-20 h-20'
    //     style={{backgroundColor: props.color}}> l</button>
    // </div>

<div className=' p-2'>
<input
  onChange={changeHandler}
  type="radio"
  name='avatar-bgColor'
  id={props.id}
  value={props.id}
  className='hidden'
  checked={props.isChecked} />
<label htmlFor={props.id} className='cursor-pointer inline-block w-20 h-20 rounded-md hover:border-8 hover:border-blue-200' style={{backgroundColor: props.color}}>
f
</label>
</div>
    )
}
