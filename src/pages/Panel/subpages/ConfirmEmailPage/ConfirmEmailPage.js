import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../Contexts/Notifications/NotificationProvider'

// Links
import {apiLinks} from '../../../../data/links'

// Hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet';


// Components
import LoadingSection from './Components/LoadingSection';
import ConfirmSuccessfullSection from './Components/ConfirmSuccessfullSection';

export default function ConfirmEmailPage() {
  const notificationDispatch = useContext(NotificationContext)
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  /*
   CONFIRM STATUSES 

   --- pending
   --- confirmed
   --- rejected

  */
  const [confirmStatus , setConfirmStatus] = useState('pending')
  const location = useLocation();
  const token = location.search;
  const url = apiLinks.signup + '/confirm' + token

  useEffect(() => {
    setAxiosGetUrl(url)
  }, [])

  useEffect(()=>{
    if(axiosGetResult){
      console.log(axiosGetResult)
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
    if(axiosGetError){
      if(axiosGetError.status === 410){
        notificationDispatch({
          type: 'ADD_NOTE',
          payload: {
            id: v4(),
            message: "لینک احراز هویت شما منقضی شده است",
            status: 'error'
          }
        })
      }
      if(axiosGetError.status === 409){
        notificationDispatch({
          type: 'ADD_NOTE',
          payload: {
            id: v4(),
            message: "فقط یکبار مجاز به احراز هویت هستید",
            status: 'error'
          }
        })
      }
      if(axiosGetError.status === 400){
        notificationDispatch({
          type: 'ADD_NOTE',
          payload: {
            id: v4(),
            message: "درخواست شما توسط سرور رد شد",
            status: 'error'
          }
        })
      }
      console.log(axiosGetError)
    }
  }, [axiosGetResult, axiosGetError, axiosGetIsPending])

  return (
    <div className='p-4'>
      <div className='bg-white rounded-2xl p-3'>
        {confirmStatus === 'pending' && <LoadingSection />}
        {confirmStatus === 'confirmed' && <ConfirmSuccessfullSection/>}
        
        
      </div>
      
    </div>
  )
}
