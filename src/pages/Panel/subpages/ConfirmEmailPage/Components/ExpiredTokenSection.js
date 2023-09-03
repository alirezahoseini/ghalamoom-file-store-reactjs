import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../../Contexts/Notifications/NotificationProvider'

// Links
import { apiLinks } from '../../../../../data/links'

// Utils 
import { getCooki } from '../../../../../utils/cookis'

// Hooks 
import useAxiosPost from '../../../../../hooks/axios/useAxiosPost'

// Assets
import expiredTokenImage from '../../../../../assets/images/panel/confirm-email-page/expired-token.webp'

export default function ExpiredTokenSection() {
    const notificationDispatch = useContext(NotificationContext)
    const { axiosPostResult, axiosPostError, setAxiosPostUrl, setAxiosPostData } = useAxiosPost();
    const userEmail = getCooki('email');
    const navigateTo = useNavigate();

    const resendEmail = () => {
        const url = apiLinks.signup + '/confirm';
        const data = {
            email: userEmail
        }
        if (userEmail) {
            setAxiosPostData(data);
            setAxiosPostUrl(url);
        }
    }

    useEffect(() => {
        if (axiosPostResult) {
            console.log(axiosPostResult)
            if (axiosPostResult.status === 200) {
                notificationDispatch({
                    type: 'ADD_NOTE',
                    payload: {
                        id: v4(),
                        message: "لینک احراز هویت جدید ارسال شد",
                        status: 'error'
                    }
                })
                navigateTo('/please-confirm-email')
            }
        }
        if (axiosPostError) {
            console.log(axiosPostError)
            if (axiosPostError.status === 409) {
                notificationDispatch({
                    type: 'ADD_NOTE',
                    payload: {
                        id: v4(),
                        message: "این ایمیل قبلا تایید شده",
                        status: 'error'
                    }
                })
                navigateTo('/panel/dashbord')
            }
            if (axiosPostError.status === 404) {
                notificationDispatch({
                    type: 'ADD_NOTE',
                    payload: {
                        id: v4(),
                        message: "این ایمیل در سرور ثبت نشده است",
                        status: 'error'
                    }
                })
                navigateTo('/login')
            }
        }
    }, [axiosPostError, axiosPostResult])
    return (
        <div className='flex flex-col lg:flex-row items-center justify-center' >
            <div className="lg:w-6/12 justify-center">
                <img src={expiredTokenImage} className='w-full lg:w-10/12 mx-auto' alt="confirm success" />
            </div>
            <div className='lg:w-6/12 justify-center -mt-8 lg:mt-0'>
                <div className='pr-4 border-r-4 border-red-200'>
                    <h1 className='font-rokh text-xl lg:text-2xl font-black text-red-800 mb-5'>لینک احراز هویت منقضی شده است</h1>
                    <p className='mt-1 font-medium leading-5'>لینک احراز هویت یکبار مصرف است </p>
                    <p className='mt-1 font-medium leading-5'>این لینک فقط تا 2 ساعت اعتبار دارد</p>
                    <p className='font-bold text-sm mt-2'>برای دریافت مجدد از دکمه زیر استفاده کنید</p>
                </div>
                <div className='my-6 pr-5'>
                    <button type='button' onClick={resendEmail} className='px-4 py-2 rounded-md hover:bg-slate-300 hover:text-slate-700 text-white bg-blue-500 mx-1'>ارسال مجدد</button>
                </div>
            </div>
        </div>
    )
}
