import React from 'react'
import { Link } from 'react-router-dom'



export default function FooterLink({url, name}) {
  return (
    <Link to={url} className='footer-link text-gray-300 font-bold py-2 px-4 rounded-lg hover:bg-gray-500 hover:bg-opacity-50 hover:text-gray-100 transition-all duration-400' >
        {name}
    </Link>
  )
}
