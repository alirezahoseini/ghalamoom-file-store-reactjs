import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../../../Contexts/Notifications/NotificationProvider'

// Links
import { apiLinks } from '../../../../../../data/links'

// Import functions
import { setCooki } from '../../../../../../utils/cookis'

// Commponents
import Input from '../LoginInput/LoginInput'
import SubmitButton from '../SubmitButton/SubmitButton'
import LoginWithSocials from '../LoginWithSocials/LoginWithSocials'

export default function SignupForm({ showLogin }) {
    const notificationDispatch = useContext(NotificationContext)
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        // bio: "",
        // age: "",
        // avatar: {
        //     bgColor: {
        //         id: 1,
        //         color: '#FF6900'
        //     },
        //     avatar: {
        //         id: 1,
        //         image: '/images/avatars/Avatar-1.webp'
        //     }
        // }
    })
    const [isLoadingDataFromApi, setLoadingDataFromApi] = useState(false);
    const navigateTo = useNavigate();

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
        setLoadingDataFromApi(true)
        event.preventDefault()
        const url = apiLinks.signup

        console.log(url)
        console.log(values)

        axios.post(url, values)
            .then(res => {
                console.log(res)
                if (res.status === 201) { }
                setCooki('token', res.data.accessToken, 3)
                // setCooki('userid', res.data.user.id, 3)
                setCooki('email', values.email, 3)
                setLoadingDataFromApi(false)
                notificationDispatch({
                    type: 'ADD_NOTE',
                    payload: {
                        id: v4(),
                        message: 'حساب شما با موفقیت ایجاد شد.!',
                        status: 'success'
                    }
                })
                navigateTo('/please-confirm-email')
            })
            .catch(err => {
                console.log(err)
                if (err.response) {
                    // IF exist email
                    if (err.response.status === 409) {
                        setLoadingDataFromApi(false)
                        notificationDispatch({
                            type: 'ADD_NOTE',
                            payload: {
                                id: v4(),
                                message: 'این ایمیل قبلا در سایت ثبت شده است',
                                status: 'warning'
                            }
                        })
                    }
                    // IF isPending for confirm email
                    if (err.response.status === 403) {
                        setLoadingDataFromApi(false)
                        notificationDispatch({
                            type: 'ADD_NOTE',
                            payload: {
                                id: v4(),
                                message: 'این ایمیل در انتطار تایید است .!',
                                status: 'warning'
                            }
                        })
                    }
                } else if (err.request) {
                    setLoadingDataFromApi(false)
                    notificationDispatch({
                        type: 'ADD_NOTE',
                        payload: {
                            id: v4(),
                            message: 'پاسخی از سرور دریافت نشد.!',
                            status: 'error'
                        }
                    })
                } else {
                    setLoadingDataFromApi(false)
                    console.log(err)
                }
            })
    }
    return (
        <div id="login-form" className='flex flex-col text-center'>
            {/* Form Header */}
            <h2 className='text-gray-700 text-xl mt-5' >خوش اومدی.!</h2>
            {/* End of Form Header */}
            <form onSubmit={(event) => submitHandler(event)} className='my-8 px-3 flex flex-col gap-4 text-xs lg:w-9/12 lg:mx-auto transition-all duration-700 '>
                {/* Inputs */}
                {inputsArray.map(input => (
                    <Input key={input.id} onChangeEvent={onChangeHandler} {...input} />
                ))}
                {/* Submit button  */}
                <SubmitButton value='عضویت' loading={isLoadingDataFromApi} />
                {/* Login with socials  */}
                <LoginWithSocials />
                {/* End of Login with socials  */}
                <div className='font-bold my-4' >
                    <span>حساب کاربری دارید.؟</span>
                    <span onClick={() => showLogin(prevState => !prevState)} className='text-blue-600 mr-3 cursor-pointer hover:text-gray-700 hover:underline' >ورود به سایت</span>
                </div>
            </form>
        </div>
    )
}



