import React, { useEffect, useState } from 'react'
import { BsEyeSlash, BsEye } from 'react-icons/bs'

export default function LoginPasswordInput({ value, setValue, showPass = false, setShowPass, placeholder = 'default', isValid }) {

    const [borderColor, setBorderColor] = useState('')

    useEffect(() => {
        if(isValid === null ){
            setBorderColor('border-transparent focus:border-pink-2')
        }else if(isValid === false ){
            setBorderColor('border-red-4 focus:border-red-4 ')
        }else if(isValid === true){
            setBorderColor('border-green focus:border-green')
        }
    })
    
    return (
        <div className='relative'>
            <input value={value} onChange={(event) => setValue(event.target.value)} type={showPass ? 'text' : 'password'} placeholder={placeholder} className={`text-xs p-4 rounded-xl w-full outline-none focus:shadow-both-2 border  transition-all duration-300 lg:text-md ${borderColor}`}/>
            {/* Eye button  */}
            <button className='absolute top-4 left-4 text-base text-gray-5 ' type='button' onClick={() => setShowPass(prevState => !prevState)}>
                {!showPass ? (

                        <BsEyeSlash />
                    ) : (
                        <BsEye />
                    )
                }
            </button>
        </div>
    )
}
