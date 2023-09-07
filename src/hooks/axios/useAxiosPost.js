import axios from "axios";
import { useEffect, useState, useContext } from 'react'
import { NotificationContext } from "../../Contexts/Notifications/NotificationProvider";
import { v4 } from 'uuid'

export default function useAxiosPost() {
    const notificationDispatch = useContext(NotificationContext)
    const [axiosPostResult, setAxiosPostResult] = useState(null);               // ok result output 
    const [axiosPostUrl, setAxiosPostUrl] = useState(null);                     // request url
    const [axiosPostIsPending, setAxiosPostIsPending] = useState(false);        // request is loading?
    const [axiosPostError, setAxiosPostError] = useState(null);                 // errors output
    const [axiosPostToken, setAxiosPostToken] = useState(null);                 // authentication token ==> sending to api
    const [axiosPostData, setAxiosPostData] = useState(null);                   // request data ==> sending to api

    const sendRequest = () => {
        console.log('sended in useAxios')
        setAxiosPostIsPending(true);            // is loading === true
        if (axiosPostToken === null) {            // without Authentication request
            axios.post(axiosPostUrl, axiosPostData)     // checking all dependencies
                .then(res => {
                    // ok response
                    setAxiosPostResult(res.data)
                    setAxiosPostData(null)
                    setAxiosPostUrl(null)
                    setAxiosPostIsPending(false)
                    setAxiosPostData(null)
                })
                .catch(err => {
                    // response errors // 400/500
                    if (err.response) {
                        setAxiosPostUrl(null)
                        setAxiosPostIsPending(false)
                        setAxiosPostError(err.response)
                        console.log('request error : ', err.response)
                    } else if (err.request) {
                        // request errors // not send request 
                        setAxiosPostUrl(null)
                        setAxiosPostIsPending(false)
                        setAxiosPostError(err.request)
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
            axios.post(axiosPostUrl, axiosPostData, {
                headers: {
                    Authorization: `Bearer ${axiosPostToken}`
                }
            })     // checking all dependencies
            .then(res => {
                // ok response
                setAxiosPostResult(res.data)
                setAxiosPostData(null)
                setAxiosPostUrl(null)
                setAxiosPostIsPending(false)
                setAxiosPostData(null)
            })
            .catch(err => {
                // response errors // 400/500
                if (err.response) {
                    setAxiosPostUrl(null)
                    setAxiosPostIsPending(false)
                    setAxiosPostError(err.response)
                    console.log('request error : ', err.response)
                } else if (err.request) {
                    // request errors // not send request 
                    setAxiosPostUrl(null)
                    setAxiosPostIsPending(false)
                    setAxiosPostError(err.request)
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
        if (axiosPostUrl !== null && axiosPostData !== null) {
            sendRequest()
        }
    }, [axiosPostUrl])

    return { axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostData, setAxiosPostToken, setAxiosPostError }
}
