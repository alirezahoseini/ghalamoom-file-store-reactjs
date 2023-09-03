import React, { useEffect, useState, useContext } from 'react';
import { v4 } from 'uuid'

// Links
import { apiLinks } from '../../../../../../data/links';

// Contexts
import { NotificationContext } from '../../../../../../Contexts/Notifications/NotificationProvider'


// Hooks
import useAxiosPost from '../../../../../../hooks/axios/useAxiosPost'

// Components
import SubmitButton from '../SubmitButton/SubmitButton'
import LoginInput from '../LoginInput/LoginInput'
import axios from 'axios';


export default function ForgotPasswordForm({ setShowForm }) {
    const notificationDispatch = useContext(NotificationContext)
    const [isLoadingDataFromApi, setLoadingDataFromApi] = useState(false);
    const [values, setValues] = useState({
        email: ''
    });

    const inputsArray = [
        {
            id: 'forgot-pass-1',
            name: 'email',
            type: 'email',
            placeholder: 'ایمیل',
            pattern: '^[a-zA-Z0-9_.+-]{3,30}\\@[a-zA-Z0-9-]{3,15}\\.[a-zA-Z0-9-.]{2,5}$',
            errorMessage: 'ایمیل باید معتبر باشد مثل: myname@gmail.com',
            required: true
        },
    ]
    const onChangeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const onSubmitHandler = (event) => {
        setLoadingDataFromApi(true)
        event.preventDefault()
        const url = apiLinks.login + '/reset-password';

        console.log(values)
        console.log(" up forgot form ")

        axios.post(url, values)
            .then((res => {
                console.log(res)
                if (res.status === 200) {
                    isLoadingDataFromApi(false)
                    notificationDispatch({
                        type: 'ADD_NOTE',
                        payload: {
                            id: v4(),
                            message: "ایمیل بازیابی ارسال شد",
                            status: 'success'
                        }
                    })
                }
            }))
            .catch(err => {
                if (err.response.status === 404) {
                    setLoadingDataFromApi(false)
                    notificationDispatch({
                        type: 'ADD_NOTE',
                        payload: {
                            id: v4(),
                            message: 'حساب کاربری شما پیدا نشد!',
                            status: 'error'
                        }
                    })
                }
                if (err.response.status === 400) {
                    setLoadingDataFromApi(false)
                    notificationDispatch({
                        type: 'ADD_NOTE',
                        payload: {
                            id: v4(),
                            message: "ایمیل وارد شده درست نمیباشد",
                            status: 'warning'
                        }
                    })
                }
            })
    }

    return (
        <div id="login-form" className='flex flex-col text-center'>
            {/* Form Header */}
            <h2 className='text-gray-700 text-lg mt-5' >بازنشانی رمزعبور</h2>
            <h3 className='text-sm text-gray-400 mt-2'>لطفا ایمیل خود را وارد کنید</h3>
            {/* End of Form Header */}
            <form onSubmit={(event) => onSubmitHandler(event)} className='my-8 px-3 flex flex-col gap-4 text-xs lg:w-9/12 lg:mx-auto '>
                {/* Inputs */}
                {inputsArray.map(input => (
                    <LoginInput key={input.id} onChangeEvent={onChangeHandler} {...input} />
                ))}

                {/* Submit button  */}
                <SubmitButton value='ارسال لینک بازنشانی' loading={isLoadingDataFromApi} />
                {/* End of Submit button  */}

                <div className='font-bold my-4' >
                    <span>حساب کاربری ندارید.؟</span>
                    <span onClick={() => setShowForm('signup')} className='text-blue-600 mr-3 cursor-pointer hover:text-gray-700 hover:underline' > ساخت حساب </span>
                </div>
            </form>
        </div>
    )
}
