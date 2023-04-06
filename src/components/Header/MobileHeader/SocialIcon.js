import React from 'react'


export default function SocialIcon({ url, children }) {
    return (
        <a href={url} target={'_blank'} rel='noreferrer' className='text-xl p-3 rounded-full bg-primary-1 text-white hover:bg-blue transition-colors duration-200'>
            {children}
        </a>
    )
}
