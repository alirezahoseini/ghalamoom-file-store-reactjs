import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

export default function Message({text, duration}) {

  return (
    <div id='global-message' className='fixed w-screen h-screen button-0 right-0 bg-red-4 z-50' >
        <div>
          <h4>{text}</h4>
          <FaTimes />
        </div>
    </div>
  )
}


