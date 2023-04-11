import React from 'react'

export default function LoginButton({value}) {
  return (
    <button type='submit' className='text-white p-4 rounded-xl shadow-xl bg-golbehi text-sm hover:bg-gray-4 transition-all duration-300'>
        {value}
    </button>
  )
}
