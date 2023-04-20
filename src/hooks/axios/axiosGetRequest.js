import axios from "axios";

import  { useEffect, useState } from 'react'

export default function useAxiosGet(url, authToken = null) {
    const [result, setResult] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authToken === null) {
            console.log('normal request')
            axios.get(url)
                .then(res => {
                    setResult(res.data)
                    setIsPending(false)
                    setError(null)
                })
                .catch(err => {
                    if (err.response) {
                        setIsPending(false)
                        setError(err.response)
                        console.log('response error : ', err.response)
                    } else if (err.request) {
                        setIsPending(false)
                        setError(err.request)
                        console.log('request error : ', err.request)
                        alert("ارتباط با سرور برقرار نشد. لطفا از VPN استفاده کنید")
                    }
                })
        } else {
            console.log('auth request')
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then(res => {
                    setResult(res.data)
                    setIsPending(false)
                    setError(null)
                })
                .catch(err => {
                    if (err.response) {
                        setIsPending(false)
                        setError(err.response)
                        console.log('response error : ', err.response)
                    } else if (err.request) {
                        setIsPending(false)
                        setError(err.request)
                        console.log('request error : ', err.request)
                        alert("ارتباط با سرور برقرار نشد. لطفا از VPN استفاده کنید")
                    }
                })
        }
    }, [])

    return [result, isPending, error]
}
