import React, { useState, useEffect } from 'react'


export default function StartCounter() {
    const [userCount, setUserCount] = useState(0)

    useEffect(() => {
        const a = setInterval(() => {
            setUserCount(prev => prev + 1)
        }, 20);
        setTimeout(() => {
            clearInterval(a)
        }, 3000)
    }, [])
    return (
        <span className='text-lg lg:text-3xl font-black ml-5 mt-2' >
            {userCount}k+
        </span>
    )
}
