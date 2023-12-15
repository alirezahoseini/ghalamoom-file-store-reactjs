import axios from "axios";
import { useEffect, useState, useContext } from 'react'
import { NotificationContext } from "../../Contexts/Notifications/NotificationProvider";
import { v4 } from 'uuid'

export default function useAxiosDelete() {
    const notificationDispatch = useContext(NotificationContext)
    const [axiosDeleteResult, setAxiosDeleteResult] = useState(null);               // ok result output 
    const [axiosDeleteUrl, setAxiosDeleteUrl] = useState(null);                     // request url
    const [axiosDeleteIsPending, setAxiosDeleteIsPending] = useState(false);        // request is loading?
    const [axiosDeleteError, setAxiosDeleteError] = useState(null);                 // errors output
    const [axiosDeleteToken, setAxiosDeleteToken] = useState(null);                 // authentication token ==> sending to api

    const sendRequest = () => {
        console.log('sended in useAxios')
        setAxiosDeleteIsPending(true);   
         // is loading === true
        if (axiosDeleteToken === null) {            // without Authentication request
            axios.delete(axiosDeleteUrl)     // checking all dependencies
                .then(res => {
                    // ok response
                    setAxiosDeleteResult(res)
                    setAxiosDeleteUrl(null)
                    setAxiosDeleteIsPending(false)
                })
                .catch(err => {
                    // response errors // 400/500
                    if (err.response) {
                        setAxiosDeleteUrl(null)
                        setAxiosDeleteIsPending(false)
                        setAxiosDeleteError(err.response)
                        console.log('request error : ', err.response)
                    } else if (err.request) {
                        // request errors // not send request 
                        setAxiosDeleteUrl(null)
                        setAxiosDeleteIsPending(false)
                        setAxiosDeleteError(err.request)
                        console.log('request error : ', err.request)
                        notificationDispatch({
                            type: 'ADD_NOTE',
                            payload: {
                                id: v4(),
                                message: "اتصال ناموفق بود لطفا دوباره امتحان کنید",
                                status: 'error'
                            }
                        })
                    }
                })
        } else {
            axios.delete(axiosDeleteUrl, {
                headers: {
                    Authorization: `Bearer ${axiosDeleteToken}`
                }
            })     // checking all dependencies
            .then(res => {
                // ok response
                setAxiosDeleteResult(res.data)
                setAxiosDeleteUrl(null)
                setAxiosDeleteIsPending(false)
            })
            .catch(err => {
                // response errors // 400/500
                if (err.response) {
                    setAxiosDeleteUrl(null)
                    setAxiosDeleteIsPending(false)
                    setAxiosDeleteError(err.response)
                    console.log('request error : ', err.response)
                } else if (err.request) {
                    // request errors // not send request 
                    setAxiosDeleteUrl(null)
                    setAxiosDeleteIsPending(false)
                    setAxiosDeleteError(err.request)
                    console.log('request error : ', err.request)
                    notificationDispatch({
                        type: 'ADD_NOTE',
                        payload: {
                            id: v4(),
                            message: "اتصال ناموفق بود لطفا دوباره امتحان کنید",
                            status: 'error'
                        }
                    })
                }
            })
        }
    }


    useEffect(() => {
        if (axiosDeleteUrl !== null && axiosDeleteToken !== null) {
            sendRequest()
        }
    }, [axiosDeleteUrl])

    return { axiosDeleteResult, axiosDeleteIsPending, axiosDeleteError, setAxiosDeleteUrl, setAxiosDeleteToken, setAxiosDeleteError }
}
