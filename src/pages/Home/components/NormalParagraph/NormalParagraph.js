import React from 'react'

export default function NormalParagraph({ content, customClass = '' }) {
    return (
        <p className={`normal-pragraph text-sm lg:text-base font-light leading-7 lg:leading-8 text-slate-700 ${customClass}`}>
            {content}
        </p>
    )
}
