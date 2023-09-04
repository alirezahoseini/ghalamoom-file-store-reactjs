import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { apiLinks } from '../../../../../../data/links'
import axios from 'axios';
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../../../Contexts/Notifications/NotificationProvider'
// Assets 
import passwordIcon from '../../../../../../assets/images/panel/confirm-email-page/password.webp'
// Utils
import { getCooki } from '../../../../../../utils/cookis'
// Components
import LoginInput from '../LoginInput/LoginInput';
import SubmitButton from '../SubmitButton/SubmitButton';

export default function ResetPasswordForm() {
  const [values, setValues] = useState({
    password: ''
  });
  const [isLoadingDataFromApi, setLoadingDataFromApi] = useState(false);
  const notificationDispatch = useContext(NotificationContext);
  const navigateTo = useNavigate();
  const userEmail = getCooki('email');
  const userLocation = useLocation()
  const [resetToken, setResetToken] = useState();

  const inputProps =
  {
    id: 'rest-password-1',
    name: 'password',
    type: 'password',
    placeholder: 'رمزعبور جدید',
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*)[A-Za-z\\d]{8,30}$",
    errorMessage: 'رمزعبور باید حداقل 8 کاراکتر که شامل حروف کوچک و بزرگ انگلیسی و یک عدد است باشد',
    required: true
  }
  // Change handler
  const changeHandler = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  // Get reset token from url
  useEffect(() => {
    if (userEmail) {
      const token = userLocation.search;
      setResetToken(token)
    } else {
      navigateTo('/panel/dashboard');
    }
  }, [])

  // Reset password
  const resetPassword = (event) => {
    setLoadingDataFromApi(true)
    event.preventDefault()
    const url = apiLinks.login + '/reset-password/check' + resetToken;
    const data = {
      password: values.password
    }

    axios.post(url, data)
      .then(res => {
        // If change password successfull
        console.log(res)
        if (res.status === 200) {
          notificationDispatch({
            type: 'ADD_NOTE',
            payload: {
              id: v4(),
              message: 'رمزعبور با موفقیت تغییر کرد',
              status: 'success'
            }
          });
          setTimeout(() => {
            navigateTo('/login')
          }, 2000);
          setLoadingDataFromApi(false)
        }
      })
      .catch(err => {
        console.log(err)
        // If validation error
        if (err.response.status === 400) {
          notificationDispatch({
            type: 'ADD_NOTE',
            payload: {
              id: v4(),
              message: 'رمزعبور معتبر نیست',
              status: 'error'
            }
          })
          setLoadingDataFromApi(false)
        }
        // If server rejected
        if (err.response.status === 406) {
          notificationDispatch({
            type: 'ADD_NOTE',
            payload: {
              id: v4(),
              message: 'درخواست توسط سرور رد شد',
              status: 'error'
            }
          })
          setLoadingDataFromApi(false)
        }
        // If server rejected
        if (err.response.status === 410) {
          notificationDispatch({
            type: 'ADD_NOTE',
            payload: {
              id: v4(),
              message: 'لینک تغییر رمزعبور منقضی شده است',
              status: 'error'
            }
          })
          navigateTo('/please-check-your-email-forgot-password')
          setLoadingDataFromApi(false)
        }
      })


  }
  return (
    <div className='p-5 text-xs lg:text-sm'>
      <div className='rounded-2xl flex flex-col lg:flex-row items-center justify-center px-3'>
        <div className='lg:w-6/12'>
          <img src={passwordIcon} alt="email icon" className='w-7/12 lg:w-10/12 mx-auto' />
        </div>
        <div className='lg:w-6/12 flex flex-col w-full rounded-xl p-4 justify-center items-center '>
          <h2 className='font-black text-lg text-slate-700 -mt-8 lg:mt-0'>بازنشانی رمزعبور</h2>
          <form onSubmit={resetPassword} className='mt-2 flex flex-col w-full lg:h-3/4 xl:w-1/2'>
            <div className='flex flex-col gap-4'>
              <span className='text-slate-600 font-medium mt-5 mr-1 '>رمزعبور جدید را وارد کنید</span>
              <LoginInput onChangeEvent={changeHandler} {...inputProps} />
              <SubmitButton value="تایید" loading={isLoadingDataFromApi} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

