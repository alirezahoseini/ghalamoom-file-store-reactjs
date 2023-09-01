import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { apiLinks } from '../../../../../../data/links'
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../../../Contexts/Notifications/NotificationProvider'

// Assets 
import emailIcon from '../../../../../../assets/images/panel/confirm-email-page/tik.webp'

// Utils
import { getCooki } from '../../../../../../utils/cookis'
import axios from 'axios';

export default function PleaseConfirmEmail() {
  const notificationDispatch = useContext(NotificationContext)
  const userEmail = getCooki('email');

  // Resend confirm email
  const resendConfirmEmail = () => {
    const url = apiLinks.signup + '/confirm';
    const data = {
      email: userEmail
    }
    console.log(data)
    axios.post(url, data)
      .then(res => {
        console.log(res)
        // If sending successful
        if (res.status === 200) {
          notificationDispatch({
            type: 'ADD_NOTE',
            payload: {
              id: v4(),
              message: 'ایمیل جدید برای شما ارسال شد',
              status: 'success'
            }
          })
        }
      })
      .catch(err => {
        console.log(err)
        // If this email not exist
        if (err.response.status === 404) {
          notificationDispatch({
            type: 'ADD_NOTE',
            payload: {
              id: v4(),
              message: 'ایمیل شما در سرور ثبت نشده است',
              status: 'error'
            }
          })
        }
        // If this email before confirmed
        if (err.response.status === 409) {
          notificationDispatch({
            type: 'ADD_NOTE',
            payload: {
              id: v4(),
              message: 'این ایمیل قبلا تایید شده است',
              status: 'error'
            }
          })
        }
      })

  }
  return (
    <div className='p-5 text-xs lg:text-sm'>
      <div className='bg-white rounded-2xl flex flex-col lg:flex-row items-center justify-center px-3'>
        <div className='lg:w-6/12'>
          <img src={emailIcon} alt="email icon" className='w-10/12 mx-auto' />
        </div>
        <div className='lg:w-6/12'>
          <div className='border-r-2 pr-5'>
            <h1 className='font-rokh text-xl lg:text-2xl font-black text-slate-700 mb-5'>لطفا ایمیل خود را تایید کنید</h1>
            <p className='mt-1 font-medium leading-5'>یک ایمیل احراز هویت برای {userEmail} ارسال شد</p>
            <p className='mt-1 font-medium'>پس از تایید ایمیل وارد حساب کاربری خود شوید</p>
          </div>
          <div className='mt-8 pr-5 flex'>
            <p className=''>ایمیلی دریافت نکرده اید؟</p>
            <button onClick={resendConfirmEmail} className='text-blue-600 font-semibold mr-3'>ارسال مجدد</button>
          </div>
          <div className='my-5 pr-4'>
            <Link className='px-3 py-1 rounded-md bg-slate-300 text-slate-700 hover:text-white hover:bg-blue-500 mx-1' to={'/login'}>صفحه ورود</Link>
            <Link className='px-3 py-1 rounded-md bg-slate-300 text-slate-700 hover:text-white hover:bg-blue-500 mx-1' to={'/'}>خانه</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
