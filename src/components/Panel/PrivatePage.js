import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// files 
import { setCooki, getCooki } from '../../utils.js'


export default function PrivatePage({ children }) {

    const navegate = useNavigate()

    const checkLogin = async () => {
        // const cookies = document.cookie;

        // const cookiArray = cookies.split(';')

        // const cookiValue = await cookiArray.map(cooki => {
        //     if (cooki.includes('userToken')) {
        //         const value = cooki.split('=')[1];
        //         return value;
        //     }
        //     return null
        // })
        // console.log(cookiValue)
 
        // if ( cookiValue[0] == null ) {
        //     console.log('navid')
        //     navegate('/login')
        // } else {
        //     console.log('logined')
        // }
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
