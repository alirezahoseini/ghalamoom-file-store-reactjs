import { useEffect, useState } from 'react'

function getLocalValue (key) {
    const prevData = localStorage.getItem(key)
    if(prevData){
        return prevData
    } return ''
}
export default function useLocalStorage(key) {
    const [localValue, setLocalValue] = useState(() => {
        return getLocalValue(key)
    })
    useEffect(() => {
        localStorage.setItem(key, localValue)
    }, [localValue])

    return [localValue, setLocalValue]
}
