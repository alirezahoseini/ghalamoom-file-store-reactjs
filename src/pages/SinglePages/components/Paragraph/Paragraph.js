import React from 'react'

function Paragraph({content}) {
    return (
        <p className='text-xs lg:text-sm font-semibold text-slate-500 my-4 w-full break-words' style={{ lineHeight: '36px' }} >
            {content}
        </p>
    )
}

export default Paragraph