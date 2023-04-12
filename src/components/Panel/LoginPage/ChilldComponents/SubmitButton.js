import React from 'react'

export default function SubmitButton({value}) {
  return (
    <button type='submit' className='text-white p-4 rounded-xl shadow-xl bg-golbehi text-sm hover:bg-gray-4 transition-all duration-300 mt-6'>
        {value}
    </button>
  )
}
