import { useEffect, useState } from 'react'

// utils
import { setCooki, getCooki } from '../../../utils/cookis'
import axios from 'axios';

export default function useUserName() {
    const [userName, setUserName] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const url = 'https://x8ki-letl-twmt.n7.xano.io/api:hq-tx9uX/auth/me';
    const accessUserName = async () => {
        // first cheking cookis
        const isExistInCookis = getCooki('username');
        if(isExistInCookis){
            setUserName(isExistInCookis)
            setIsPending(false)
        }else if (isExistInCookis === null) {
            // get data from server
            const accessToken = getCooki('token')
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                const username = res.data.name;
                setCooki('username', username, 3);
                setUserName(username)
                setIsPending(false)
            }).catch((error) => {
                if (error.response) {
                    setIsPending(false)
                    console.log('response error in user Name:  ', error.response)
                } else if (error.request) {
                    setUserName('بارگزاری نشد')
                    setIsPending(false)
                    console.log('request error in user Name:  ', error.request)
                }
            })
        }
    }
    useEffect(() => {
        accessUserName()
    }, [])

    return {isPending, userName}
}
