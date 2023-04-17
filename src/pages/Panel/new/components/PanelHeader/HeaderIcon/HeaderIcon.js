import { useEffect, useState } from 'react'
import './HeaderIcon.css'

export default function HeaderIcon({ badgeColor = 'before:bg-green-600', delay = 1000, children }) {
    const [notifColor, setNotifColor] = useState('')

    useEffect(()=> {
        setTimeout(()=>{
            setNotifColor(badgeColor)
        }, delay)
    },[])

    return (
        <div className={`header-icon flex items-center justify-center text-lg p-3 rounded-full text-slate-600 dark:text-slate-300 relative before:transition-all before:duration-100 ${notifColor ? 'before:scale-100' : 'before:scale-0'} ${notifColor}`}>
            <div className={`background-blur ${notifColor} absolute w-full h-full rounded-full overflow-hidden after:bg-gray-400 after:bg-opacity-10 after:dark:bg-slate-700 after:dark:bg-opacity-10`}>
            </div>
            <div className='z-10'>
                {children}
            </div>
        </div>
    )
}
