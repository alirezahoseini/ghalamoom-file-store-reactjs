import axios from "axios";
import { v4 } from 'uuid'
import { useEffect, useState, useContext } from 'react'
import { NotificationContext } from "../../Contexts/Notifications/NotificationProvider";

export default function useAxiosPatch() {
    const notificationDispatch = useContext(NotificationContext)
    const [axiosPatchResult, setAxiosPatchResult] = useState(null);               // ok result output
    const [axiosPatchUrl, setAxiosPatchUrl] = useState(null);                     // request url
    const [axiosPatchIsPending, setAxiosPatchIsPending] = useState(false);        // request is loading?
    const [axiosPatchError, setAxiosPatchError] = useState(null);                 // errors output
    const [axiosPatchData, setAxiosPatchData] = useState(null);                   // request data ==> sending to api

    const sendRequest = () => {
        setAxiosPatchIsPending(true);            // is loading === true
        axios.patch(axiosPatchUrl, axiosPatchData)     // checking all dependencies
            .then(res => {
                // ok response
                setAxiosPatchResult(res.data)
                setAxiosPatchData(null)
                setAxiosPatchUrl(null)
                setAxiosPatchIsPending(false)
                setAxiosPatchData(null)
            })
            .catch(err => {
                // response errors // 400/500
                if (err.response) {
                    setAxiosPatchUrl(null)
                    setAxiosPatchIsPending(false)
                    setAxiosPatchError(err.response)
                    console.log('request error : ', err.response)
                } else if (err.request) {
                    // request errors // not send request 
                    setAxiosPatchUrl(null)
                    setAxiosPatchIsPending(false)
                    setAxiosPatchError(err.request)
                    console.log('request error : ', err.request)
                    notificationDispatch({
                        type: 'ADD_NOTE',
                        payload: {
                            id: v4(),
                            message: 'اتصال به سرور ناموفق بود ، لطفا با vpn امتحان کنید',
                            status: 'error'
                        }
                    })
                }
            })
    }


    useEffect(() => {
        if (axiosPatchUrl !== null && axiosPatchData !== null) {
            sendRequest()
        }
    }, [axiosPatchUrl])

    return { axiosPatchResult, axiosPatchIsPending, axiosPatchError, setAxiosPatchUrl, setAxiosPatchData }
}
