import React from 'react'

export default function Paragraph({content}) {
  return (
    <p className='text-xs text-slate-500 leading-6'>
        {content}
    </p>
  )
}
