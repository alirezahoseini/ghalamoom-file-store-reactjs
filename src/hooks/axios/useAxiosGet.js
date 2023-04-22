import axios from "axios";
import { useEffect, useState } from 'react'

export default function useAxiosGet() {
    const [axiosGetResult, setAxiosGetResult] = useState(null);               // ok result output 
    const [axiosGetUrl, setAxiosGetUrl] = useState(null);                     // request url
    const [axiosGetIsPending, setAxiosGetIsPending] = useState(false);        // request is loading?
    const [axiosGetError, setAxiosGetError] = useState(null);                 // errors output
    const [axiosGetToken, setAxiosGetToken] = useState(null);                   // authentication token ==> sending to api

    const sendRequest = () => {
        setAxiosGetIsPending(true);                // is loading === true
        if (axiosGetToken === null) {               // without Authentication request
            axios.get(axiosGetUrl)
                .then(res => {
                    // ok response
                    setAxiosGetResult(res.data)
                    setAxiosGetUrl(null)
                    setAxiosGetIsPending(false)
                    setAxiosGetError(null)
                })
                .catch(err => {
                    // response errors // 400/500
                    if (err.response) {
                        setAxiosGetUrl(null)
                        setAxiosGetIsPending(false)
                        setAxiosGetError(err.response)
                        console.log('request error : ', err.response)
                    } else if (err.request) {
                        // request errors // not send request 
                        setAxiosGetUrl(null)
                        setAxiosGetIsPending(false)
                        setAxiosGetError(err.request)
                        console.log('request error : ', err.request)
                        alert("ارتباط با سرور برقرار نشد. لطفا از VPN استفاده کنید")
                    }
                })
        } else {
            console.log('with token')
        }
    }
    useEffect(() => {
        if (axiosGetUrl !== null) {
            sendRequest()
        }
    }, [axiosGetUrl])

    return { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl, setAxiosGetToken }
}
