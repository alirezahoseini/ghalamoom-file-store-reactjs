import axios from "axios";
import { v4 } from 'uuid'
import { useEffect, useState, useContext } from 'react'
import { NotificationContext } from "../../Contexts/Notifications/NotificationProvider";

export default function useAxiosGet() {
    const notificationDispatch = useContext(NotificationContext)
    const [axiosGetResult, setAxiosGetResult] = useState(null);               // ok result output 
    const [axiosGetUrl, setAxiosGetUrl] = useState(null);                     // request url
    const [axiosGetIsPending, setAxiosGetIsPending] = useState(false);        // request is loading?
    const [axiosGetError, setAxiosGetError] = useState(null);                 // errors output
    const [axiosGetToken, setAxiosGetToken] = useState(null);                   // authentication token ==> sending to api
    const [axiosGetId, setAxiosGetId] = useState(null)

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
                        notificationDispatch({
                            type: 'ADD_NOTE',
                            payload: {
                                id: v4(),
                                message: 'پاسخی از سرور دریافت نشد.!',
                                status: 'error'
                            }
                        })
                    }
                })
        } else {
            axios.get(axiosGetUrl, {
                headers: {
                    Authorization: `Bearer ${axiosGetToken}`
                }
            })
                .then(res => {
                    // ok response
                    if (axiosGetId) {
                        const data = { data: res.data, id: axiosGetId }
                        setAxiosGetResult(data);
                        return
                    }
                    setAxiosGetResult(res.data)
                    setAxiosGetUrl(null)
                    setAxiosGetIsPending(false)
                    setAxiosGetError(null)
                })
                .catch(err => {
                    // response errors // 400/500
                    if (err.response) {
                        if (axiosGetId) {
                            const data = { err: err.response, id: axiosGetId }
                            setAxiosGetError(data)
                            return
                        }
                        setAxiosGetError(err.response)
                        setAxiosGetUrl(null)
                        setAxiosGetIsPending(false)
                        console.log('respone error : ', err.response)
                    } else if (err.request) {
                        // request errors // not send request 
                        if (axiosGetId) {
                            const data = { err: err.response, id: axiosGetId }

                            setAxiosGetError(data)
                            return
                        }
                        setAxiosGetError(err.request)
                        setAxiosGetUrl(null)
                        setAxiosGetIsPending(false)
                        console.log('request error : ', err.request)
                        notificationDispatch({
                            type: 'ADD_NOTE',
                            payload: {
                                id: v4(),
                                message: 'پاسخی از سرور دریافت نشد.!',
                                status: 'error'
                            }
                        })
                    }
                })
        }


    }
    useEffect(() => {
        if (axiosGetUrl !== null) {
            sendRequest()
        }
    }, [axiosGetUrl])

    return { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl, setAxiosGetToken, axiosGetId, setAxiosGetId }
}
