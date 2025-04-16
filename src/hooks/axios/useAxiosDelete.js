import axios from "axios";
import { useEffect, useState, useContext, useCallback } from 'react'
import { NotificationContext } from "../../Contexts/Notifications/NotificationProvider";
import { v4 } from 'uuid'

export default function useAxiosDelete() {
    const notificationDispatch = useContext(NotificationContext)
    const [axiosDeleteResult, setAxiosDeleteResult] = useState(null);
    const [axiosDeleteUrl, setAxiosDeleteUrl] = useState(null);
    const [axiosDeleteIsPending, setAxiosDeleteIsPending] = useState(false);
    const [axiosDeleteError, setAxiosDeleteError] = useState(null);

    const sendRequest = useCallback(() => {
        setAxiosDeleteIsPending(true);

        axios.delete(axiosDeleteUrl)
            .then(res => {
                setAxiosDeleteResult(res)
                setAxiosDeleteUrl(null)
                setAxiosDeleteIsPending(false)
            })
            .catch(err => {
                if (err.response) {
                    setAxiosDeleteUrl(null)
                    setAxiosDeleteIsPending(false)
                    setAxiosDeleteError(err.response)
                    console.log('request error : ', err.response)
                } else if (err.request) {
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
    }, [axiosDeleteUrl, notificationDispatch]);

    useEffect(() => {
        if (axiosDeleteUrl !== null) {
            sendRequest()
        }
    }, [axiosDeleteUrl, sendRequest])

    return { axiosDeleteResult, axiosDeleteIsPending, axiosDeleteError, setAxiosDeleteUrl, setAxiosDeleteError, setAxiosDeleteResult, axiosDeleteUrl }
}
