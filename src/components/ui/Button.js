import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const Button = memo(({ type, value, hover = false, link = false, url = '#', size = '', bgColor = 'bg-custom-blue-700', textColor = 'text-white', clickEvent = null }) => {
  return (
    <>
      {
        !link ? (
          <button type={type} className={`px-5 py-2 font-yekan-bakh font-bold ${textColor} ${bgColor} rounded-xl tracking-wide  transition duration-200 text-base ${hover ? 'hover:bg-gray-500' : ''} ${size}`} onClick={clickEvent}>
            {value}
          </button>
        ) : (
          <Link to={url} type={type} className={`px-5 py-2 font-yekan-bakh font-bold ${textColor} ${bgColor} rounded-xl tracking-wide  transition duration-200 text-base ${hover ? 'hover:bg-gray-500' : ''} ${size}`} onClick={clickEvent}>
            {value}
          </Link>
        )
      }
    </>
  )
})

export default Button