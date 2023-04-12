import React, { useEffect, useState } from 'react'
import axios from 'axios'

// 
import { addNewMessage } from '../../../Header/Message/NewMessage.js'

// Commponents
import Input from '../ChilldComponents/Input.js'
import SubmitButton from '../ChilldComponents/SubmitButton.js'
import LoginWithSocials from '../ChilldComponents/LoginWithSocials.js'
import Message from '../../../Header/Message/Message.js'

export default function SignupForm({ showLogin }) {
    const [messages, setMessages] = useState([])
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    })

    const inputsArray = [
        {
            id: 'sing-1',
            name: 'name',
            type: 'text',
            placeholder: 'نام خود را وارد کنید',
            pattern: "^[\u0600-\u06FF\\s]{3,20}$",
            errorMessage: 'نام خود را فقط به صورت فارسی و بین 3 الی 20 کاراکتر وارد کنید',
            required: true
        },
        {
            id: 'sing-2',
            name: 'email',
            type: 'email',
            placeholder: 'ایمیل',
            pattern: '^[a-zA-Z0-9_.+-]{3,30}@[a-zA-Z0-9-]{3,15}\\.[a-zA-Z0-9-.]{2,5}$',
            errorMessage: 'ایمیل باید معتبر باشد مثل: myname@gmail.com',
            required: true
        },
        {
            id: 'sing-3',
            name: 'password',
            type: 'password',
            placeholder: 'رمزعبور',
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*)[A-Za-z\\d]{8,30}$",
            errorMessage: 'رمزعبور باید حداقل 8 کاراکتر که شامل حروف کوچک و بزرگ انگلیسی و یک عدد است باشد',
            required: true
        },
    ]

    const onChangeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(values)
        // const url = 'https://x8ki-letl-twmt.n7.xano.io/api:hq-tx9uX/auth/signup'
        // // create user data object 
        // const userData = {
        //     name: nameValue,
        //     email: emailValue,
        //     password: passwordValue,
        // }
    }

    useEffect(() => { console.log(messages) }, [messages])

    return (
        <div id="login-form" className='flex flex-col text-center'>
            {/* Form Header */}
            <h2 className='text-secondary-2 text-xl mt-5' >خوش اومدی.!</h2>
            {/* End of Form Header */}
            <form onSubmit={(event) => submitHandler(event)} className='my-8 px-3 flex flex-col gap-4 text-xs lg:w-9/12 lg:mx-auto transition-all duration-700 '>
                {/* Inputs */}
                {inputsArray.map(input => (
                    <Input key={input.id} onChangeEvent={onChangeHandler} {...input} />
                ))}
                {/* Submit button  */}
                <SubmitButton value='عضویت' />
                {/* Login with socials  */}
                <LoginWithSocials />
                {/* End of Login with socials  */}
                <div className='font-bold my-4' >
                    <span>حساب کاربری دارید.؟</span>
                    <span onClick={() => showLogin(prevState => !prevState)} className='text-blue mr-3 cursor-pointer hover:text-secondary-1 hover:underline' >ورود به سایت</span>
                </div>
            </form>

            <button onClick={() => {
                addNewMessage('پیام من', 5000, messages, setMessages)
            }}>Add New message</button>
        </div>
    )
}
