import React from 'react'

export default function FooterSocialLinks({ name, title, url, icon }) {
  return (
    <a href={url} className='footer-social-link flex gap-3 font-bold justify-between text-gray-4 my-5'>
      <div className='flex gap-3 items-center'>
        <span className='text-gold-1 text-3xl'>{icon}</span>
        <span>{name}</span>
      </div>
      <span>
        {title}
      </span>

    </a>
  )
}
