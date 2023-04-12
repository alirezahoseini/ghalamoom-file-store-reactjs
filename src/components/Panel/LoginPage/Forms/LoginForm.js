import React, { useEffect, useState } from 'react'
import axios from 'axios'

import SubmitButton from '../ChilldComponents/SubmitButton'
import LoginWithSocials from '../ChilldComponents/LoginWithSocials'
import Input from '../ChilldComponents/Input'

export default function LoginForm({ showLogin }) {
    const [values , setValues] = useState({
        email: '',
        password: ''
    });

    const inputsArray = [
        {
            id: 'login-1',
            name: 'email',
            type: 'email',
            placeholder: 'ایمیل',
            pattern: '^[a-zA-Z0-9_.+-]{3,30}@[a-zA-Z0-9-]{3,15}\\.[a-zA-Z0-9-.]{2,5}$',
            errorMessage: 'ایمیل باید معتبر باشد مثل: myname@gmail.com',
            required: true
        },
        {
            id: 'login-2',
            name: 'password',
            type: 'password',
            placeholder: 'رمزعبور',
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*)[A-Za-z\\d]{8,30}$",
            errorMessage: 'رمزعبور باید حداقل 8 کاراکتر که شامل حروف کوچک و بزرگ انگلیسی و یک عدد است باشد',
            required: true
        },
    ]

    const onChangeHandler = (event) => {
        setValues({...values , [event.target.name] : event.target.value})
    }

    const onSubmitHandler = (event) => {
        console.log(values)
    }

    return (
        <div id="login-form" className='flex flex-col text-center'>
            {/* Form Header */}
            <h2 className='text-secondary-2 text-xl mt-5' >خوش برگشتی</h2>
            <h3 className='text-sm text-text-2 mt-2'>دلمون برات تنگ شده بود!</h3>
            {/* End of Form Header */}
            <form onSubmit={(event) => onSubmitHandler(event)} className='my-8 px-3 flex flex-col gap-4 text-xs lg:w-9/12 lg:mx-auto '>
                {/* Inputs */}
                {inputsArray.map(input => (
                    <Input key={input.id} onChangeEvent={onChangeHandler} {...input} />
                ))}
                {/* Submit button  */}
                <SubmitButton value='ورود' />
                {/* Login with socials  */}
                <LoginWithSocials />
                {/* End of Login with socials  */}
                <div className='font-bold my-4' >
                    <span>حساب کاربری ندارید.؟</span>
                    <span onClick={() => showLogin(prevState => !prevState)} className='text-blue mr-3 cursor-pointer hover:text-secondary-1 hover:underline' > ساخت حساب </span>
                </div>
            </form>
        </div>
    )
}
