import React from 'react'
import { Link } from 'react-router-dom'



export default function FooterLink({url, name}) {
  return (
    <Link to={url} className='footer-link text-gray-3 font-bold py-2 px-4 rounded-lg hover:bg-gray-5 hover:bg-opacity-50 hover:text-gray-1 transition-all duration-400' >
        {name}
    </Link>
  )
}
