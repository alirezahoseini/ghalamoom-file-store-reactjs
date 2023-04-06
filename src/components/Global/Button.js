import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({ type, value, hover = false, link = false, url = '#' }) {
  return (
    <>
      {
        !link ? (
          <button type={type} className={`bg-blue-1 px-5 py-2 font-yekan-bakh font-bold text-white bg-blue rounded-xl tracking-wide  transition duration-200 ${hover ? 'hover:bg-gray-5' : ''}`}>
            {value}
          </button>
        ) : (
          <button type={type} className={`bg-blue-1 px-5 py-2 font-yekan-bakh font-bold text-white bg-blue rounded-xl tracking-wide  transition duration-200 ${hover ? 'hover:bg-gray-5' : ''}`}>
            <Link to={url}>{value}</Link>
          </button>
        )
      }
    </>
  )
}
