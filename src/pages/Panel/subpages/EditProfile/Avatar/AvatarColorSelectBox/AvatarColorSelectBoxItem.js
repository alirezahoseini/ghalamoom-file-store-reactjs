import React, { useContext, memo } from 'react'

//  Contexts
import { UserInformationContext } from '../../../../../../Contexts/UserInformationContext/UserInformationContextProvider'

const AvatarColorSelectBoxItem = memo((props) => {
  const { setUserInfoContext } = useContext(UserInformationContext);
  const changeHandler = () => {
    setUserInfoContext(prev => {
      return {
        ...prev,
        userInfo: {
          ...prev.userInfo,
          avatar: {
            bgColor: props,
            avatar: prev.userInfo.avatar.avatar
          }
        }
      }
    })
    props.setIsShowSelectBox(false)
  }

  return (

    <div className='w-20 h-20 p-1'>
      <input
        onChange={changeHandler}
        type="radio"
        name='avatar-bgColor'
        id={`avatar-bg-${props.id}`}
        value={props.id}
        className='hidden'
        checked={props.isChecked} />
      <label htmlFor={`avatar-bg-${props.id}`} className='cursor-pointer inline-block w-full h-full rounded-md hover:outline hover:outline-blue-400 relative' style={{ backgroundColor: props.color }}>
      </label>
    </div>
  )
})

export default AvatarColorSelectBoxItem
