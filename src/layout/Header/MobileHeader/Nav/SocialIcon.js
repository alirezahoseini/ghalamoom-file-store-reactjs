import React from 'react'


export default function SocialIcon({ url, children }) {
    return (
        <a href={url} target={'_blank'} rel='noreferrer' className='social-icon text-xl p-3 rounded-full bg-slate-500 text-white hover:bg-blue-600 transition-colors duration-300'>
            {children}
        </a>
    )
}
