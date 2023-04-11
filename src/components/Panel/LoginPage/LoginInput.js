
import {useEffect, useState} from 'react'

export default function LoginInput({ value, setValue, type = 'text', placeholder = 'default', isValid }) {

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
        <input value={value} onChange={(event) => setValue(event.target.value)} type={type} placeholder={placeholder} className={`text-xs p-4 rounded-xl w-full outline-none focus:shadow-both-2 border transition-all duration-300 lg:text-md ${borderColor}`} />
    )
}
