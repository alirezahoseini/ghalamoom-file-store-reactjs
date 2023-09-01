import React from 'react'

// Utils
import { getCooki } from '../../../../../utils/cookis'

// Assets 
import loadingGif from '../../../../../assets/images/loading.gif'

export default function LoadingSection() {
  const userEmail = getCooki('email')
  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <img src={loadingGif} className='w-48' alt="loading gif" />
      <h1 className='font-black text-sm text-slate-600'>لطفا کمی صبر کنید...</h1>
      <p className='text-xs font-medium mt-3 text-slate-600'>درحال تایید ایمیل {userEmail} هستیم</p>
    </div>
  )
}
