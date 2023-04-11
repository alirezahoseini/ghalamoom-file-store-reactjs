import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrivatePage({ children }) {

    const navegate = useNavigate()

    useEffect(() => {
        const a = false
        if (a) {
            console.log('yes')
        } else {
            navegate('/login')
        }
    })


    return (
        <>
            {

                children

            }
        </>
    )
}
