import axios from "axios";
import { v4 } from 'uuid'
import { useEffect, useState, useContext } from 'react'
import { NotificationContext } from "../../Contexts/Notifications/NotificationProvider";

export default function useAxiosDelete() {
    const notificationDispatch = useContext(NotificationContext)
    const [axiosDeleteResult, setAxiosDeleteResult] = useState(null);               // ok result output 
    const [axiosDeleteUrl, setAxiosDeleteUrl] = useState(null);                     // request url
    const [axiosDeleteIsPending, setAxiosDeleteIsPending] = useState(false);        // request is loading ?
    const [axiosDeleteError, setAxiosDeleteError] = useState(null);                 // errors output


    const sendRequest = () => {
        setAxiosDeleteIsPending(true);                // is loading === true
        axios.delete(axiosDeleteUrl)
            .then(res => {
                // ok response
                setAxiosDeleteResult(res)
                setAxiosDeleteUrl(null)
                setAxiosDeleteIsPending(false)
                setAxiosDeleteError(null)
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
                            message: "ارتباط با سرور برقرار نشد. لطفا از VPN استفاده کنید",
                            status: 'error'
                        }
                    })
                }
            })

    }
    useEffect(() => {
        if (axiosDeleteUrl !== null) {
            sendRequest()
        }
    }, [axiosDeleteUrl])

    return { axiosDeleteResult, axiosDeleteIsPending, axiosDeleteError, setAxiosDeleteUrl }
}
