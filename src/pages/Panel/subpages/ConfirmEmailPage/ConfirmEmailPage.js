import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Links
import {apiLinks} from '../../../../data/links'

// Hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet';


// Components
import LoadingSection from './Components/LoadingSection';
import ConfirmSuccessfullSection from './Components/ConfirmSuccessfullSection';

export default function ConfirmEmailPage() {
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  const location = useLocation();
  const token = location.search;
  const url = apiLinks.signup + '/confirm' + token

  useEffect(() => {
    // setAxiosGetUrl(url)
  }, [])

  useEffect(()=>{
    if(axiosGetResult){
      console.log(axiosGetResult)
    }
    if(axiosGetError){
      console.log(axiosGetError)
    }
  }, [axiosGetResult, axiosGetError, axiosGetIsPending])

  return (
    <div className='p-4'>
      <div className='bg-white rounded-2xl p-3'>
        <LoadingSection />
      </div>
      
    </div>
  )
}
