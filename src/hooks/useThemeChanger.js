import { useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { useEffect } from 'react'

export default function useThemeChanger() {
    const [localValue, setLocalValue] = useLocalStorage('theme')
    const [theme, setTheme] = useState(() => {
        if(localValue){
            return localValue
        }else{
            return 'light'
        }
    })
    useEffect(() => {
        setLocalValue(theme);
        if(theme === 'dark'){
            window.document.documentElement.classList.add('dark')
        }else{
            window.document.documentElement.classList.remove('dark')
        }
    }, [theme] )

    return [theme, setTheme]
}
