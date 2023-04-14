import React from 'react'
// assets
import circleLoading from '../../../../../../assets/images/panel/circleLoading.svg'
export default function SubmitButton({ value, loading }) {
  return (
    <button type='submit' className='text-white p-4 rounded-xl shadow-xl bg-golbehi text-sm hover:bg-gray-4 transition-all duration-300 mt-6' disabled={loading} >
      {!loading ? (
        <span>{value}</span>
      ) : (
        <div className='h-5 w-fit mx-auto flex items-center justify-center'>
          <img src="./images/icons/loading.svg" alt=""  />
        </div>
      )
      }
    </button>
  )
}
