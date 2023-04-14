import { useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import './LoginInput.css'

export default function LoginInput(props) {
  const { onChangeEvent, errorMessage, type, ...otherProps } = props;
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onFocusHandler = () => { setFocused(true) }

  return (
    <>
      {
        type !== 'password' ? (
          <div>
            <input onChange={(event) => onChangeEvent(event)} {...otherProps} focused={focused.toString()} onBlur={onFocusHandler} tyoe={type} className={`text-xs p-4 rounded-xl w-full outline-none focus:shadow-both-2 transition-all duration-300 lg:text-md border-2  focus:border-pink-2 form-input`} />
            <span className='text-red-4 my-3 text-right leading-5 font-bold'>{errorMessage}</span>
          </div>
        ) : (
          <div className='relative'>
            <input onChange={(event) => onChangeEvent(event)} {...otherProps} focused={focused.toString()} onBlur={onFocusHandler} type={`${showPassword ? 'text' : 'password'}`} className={`text-xs p-4 rounded-xl w-full outline-none focus:shadow-both-2 transition-all duration-300 lg:text-md border-2  focus:border-pink-2 form-input`} />
            {/* Eye button  */}
            <button className='absolute top-4 left-4 text-base text-gray-5 ' type='button' onClick={() => setShowPassword(prevState => !prevState)}>
              {!showPassword ? (

                <BsEyeSlash />
              ) : (
                <BsEye />
              )
              }
            </button>
            <span className='text-red-4 my-3 text-right leading-5 font-bold'>{errorMessage}</span>
          </div>
        )
      }
    </>
  )
}
