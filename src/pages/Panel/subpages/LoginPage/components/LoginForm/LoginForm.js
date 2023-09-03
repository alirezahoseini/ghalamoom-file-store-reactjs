import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../../../Contexts/Notifications/NotificationProvider'
// links
import { apiLinks } from '../../../../../../data/links'

// utils
import { setCooki } from '../../../../../../utils/cookis'

// components
import SubmitButton from '../SubmitButton/SubmitButton'
import LoginWithSocials from '../LoginWithSocials/LoginWithSocials'
import LoginInput from '../LoginInput/LoginInput'
import DefaultUserInfos from '../LoginInput/DefaultUserInfos/DefaultUserInfos'

export default function LoginForm({ setShowForm }) {
    const notificationDispatch = useContext(NotificationContext);

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [isLoadingDataFromApi, setLoadingDataFromApi] = useState(false);
    const navigateTo = useNavigate();

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
            // pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*)[A-Za-z\\d]{8,30}$",
            errorMessage: 'رمزعبور باید حداقل 8 کاراکتر که شامل حروف کوچک و بزرگ انگلیسی و یک عدد است باشد',
            required: true
        },
    ]

    const onChangeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const onSubmitHandler = async (event) => {
        setLoadingDataFromApi(true)
        event.preventDefault()
        const url = apiLinks.login

        axios.post(url, values)
            .then(res => {
                setCooki('token', res.data.token, 3)
                // setCooki('userid', res.data.user.id, 3)
                setCooki('email', values.email, 3)
                setLoadingDataFromApi(false)
                notificationDispatch({
                    type: 'ADD_NOTE',
                    payload: {
                        id: v4(),
                        message: 'با موفقیت وارد شدید',
                        status: 'success'
                    }
                })
                navigateTo('/panel/dashbord')
            })
            .catch(err => {
                if (err.response) {
                    // if wrong data
                    if (err.response.status === 400) {
                        setLoadingDataFromApi(false)
                        notificationDispatch({
                            type: 'ADD_NOTE',
                            payload: {
                                id: v4(),
                                message: "اطلاعات وارد شده اشتباه است!",
                                status: 'error'
                            }
                        })
                        // if pending email
                    } else if (err.response.status === 403) {
                        setLoadingDataFromApi(false)
                        notificationDispatch({
                            type: 'ADD_NOTE',
                            payload: {
                                id: v4(),
                                message: 'ایمیل شما در انتظار تایید است',
                                status: 'warning'
                            }
                        })
                        navigateTo('/please-confirm-email')
                    } else {
                        console.log(err.response)
                    }
                    // if not connect to server
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
            <h2 className='text-gray-700 text-xl mt-5' >خوش برگشتی</h2>
            <h3 className='text-sm text-gray-400 mt-2'>دلمون برات تنگ شده بود!</h3>
            {/* End of Form Header */}
            <form onSubmit={(event) => onSubmitHandler(event)} className='my-8 px-3 flex flex-col gap-4 text-xs lg:w-9/12 lg:mx-auto '>
                {/* Inputs */}
                {inputsArray.map(input => (
                    <LoginInput key={input.id} onChangeEvent={onChangeHandler} {...input} />
                ))}
                {/* Forgot password Button */}
                <button onClick={() => setShowForm('forgotPass')} type='button' className='text-right font-medium text-xs text-slate-600 hover:text-blue-600 mr-1  hover:underline'>رمزعبور خود را فراموش کرده اید؟</button>
                {/* Forgot password Button */}
                {/* Submit button  */}
                <SubmitButton value='ورود' loading={isLoadingDataFromApi} />
                {/* Default user infos  */}
                <div className='mt-3'>
                    <DefaultUserInfos />
                </div>
                {/* End of Default user infos  */}
                {/* Login with socials  */}
                <LoginWithSocials />
                {/* End of Login with socials  */}
                <div className='font-bold my-4' >
                    <span>حساب کاربری ندارید.؟</span>
                    <span onClick={() => setShowForm('signup')} className='text-blue-600 mr-3 cursor-pointer hover:text-gray-700 hover:underline' > ساخت حساب </span>
                </div>
            </form>
        </div>
    )
}
