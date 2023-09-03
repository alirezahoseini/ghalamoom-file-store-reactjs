import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../Contexts/Notifications/NotificationProvider'

// Links
import { apiLinks } from '../../../../data/links'

// Hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet';


// Components
import LoadingSection from './Components/LoadingSection';
import ConfirmSuccessfullSection from './Components/ConfirmSuccessfullSection';
import ExpiredTokenSection from './Components/ExpiredTokenSection';
import RejectedTokenSection from './Components/RejectedTokenSection'

export default function ConfirmEmailPage() {
  const notificationDispatch = useContext(NotificationContext)
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  const navigateTo = useNavigate();
  /*
   CONFIRM STATUSES 

   --- pending
   --- confirmed
   --- rejected

  */
  const [confirmStatus, setConfirmStatus] = useState('rejected')
  const location = useLocation();
  const token = location.search;
  const url = apiLinks.signup + '/confirm' + token;

  useEffect(() => {
    if (token) {
      setAxiosGetUrl(url)
    } else {
      navigateTo('/login')
    }
  }, [])

  useEffect(() => {
    if (axiosGetResult) {
      setConfirmStatus('confirmed')
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'ایمیل شما تایید شد',
          status: 'success'
        }
      })
    }
    if (axiosGetError) {
      if (axiosGetError.status === 410) {
        setConfirmStatus('expired')
        notificationDispatch({
          type: 'ADD_NOTE',
          payload: {
            id: v4(),
            message: "لینک احراز هویت شما منقضی شده است",
            status: 'error'
          }
        })
      }
      if (axiosGetError.status === 409) {
        setConfirmStatus('rejected')
        notificationDispatch({
          type: 'ADD_NOTE',
          payload: {
            id: v4(),
            message: "فقط یکبار مجاز به احراز هویت هستید",
            status: 'error'
          }
        })
      }
      if (axiosGetError.status === 400) {
        notificationDispatch({
          type: 'ADD_NOTE',
          payload: {
            id: v4(),
            message: "درخواست شما توسط سرور رد شد",
            status: 'error'
          }
        })
      }
    }
  }, [axiosGetResult, axiosGetError, axiosGetIsPending])

  return (
    <div className='p-4'>
      <div className='bg-white rounded-2xl p-3'>
        {confirmStatus === 'pending' && <LoadingSection />}
        {confirmStatus === 'confirmed' && <ConfirmSuccessfullSection />}
        {confirmStatus === 'expired' && <ExpiredTokenSection />}
        {confirmStatus === 'rejected' && <RejectedTokenSection />}
      </div>

    </div>
  )
}
