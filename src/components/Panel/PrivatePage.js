import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// files 
import { getCooki } from '../../utils.js'


export default function PrivatePage({ children }) {

    const navegate = useNavigate()

    const checkLogin = async () => {
        const cookiValue = await getCooki('token')
        if ( cookiValue === null ) {
            navegate('/login')
        } 
        return
    }

    useEffect(() => {

        checkLogin()
    })


    return (
        <>
            {

                children

            }
        </>
    )
}
