import React from 'react'
// assets
import circleLoading from '../../../../../../assets/images/panel/circleLoading.svg'
export default function SubmitButton({ value, loading }) {
  return (
    <button type='submit' className='text-white p-4 rounded-xl shadow-xl bg-custom-golbehi-100 text-sm hover:bg-gray-400 transition-all duration-300 mt-6 flex justify-center items-center' disabled={loading} >
      {!loading ? (
        <span>{value}</span>
      ) : (
        <div className='h-5 w-fit mx-auto flex items-center justify-center'>
          <img src={circleLoading} alt=""  />
        </div>
      )
      }
    </button>
  )
}
