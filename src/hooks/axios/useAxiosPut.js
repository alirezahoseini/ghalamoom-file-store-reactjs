import axios from "axios";
import { v4 } from 'uuid'
import { useEffect, useState, useContext } from 'react'
import { NotificationContext } from "../../components/ui/Notifications/NotificationProvider";

export default function useAxiosPut() {
    const notificationDispatch = useContext(NotificationContext)
    const [axiosPutResult, setAxiosPutResult] = useState(null);               // ok result output 
    const [axiosPutUrl, setAxiosPutUrl] = useState(null);                     // request url
    const [axiosPutIsPending, setAxiosPutIsPending] = useState(false);        // request is loading?
    const [axiosPutError, setAxiosPutError] = useState(null);                 // errors output
    const [axiosPutData, setAxiosPutData] = useState(null);                   // request data ==> sending to api

    const sendRequest = () => {
        setAxiosPutIsPending(true);            // is loading === true
        axios.put(axiosPutUrl, axiosPutData)     // checking all dependencies
            .then(res => {
                // ok response
                setAxiosPutResult(res.data)
                setAxiosPutData(null)
                setAxiosPutUrl(null)
                setAxiosPutIsPending(false)
                setAxiosPutData(null)
            })
            .catch(err => {
                // response errors // 400/500
                if (err.response) {
                    setAxiosPutUrl(null)
                    setAxiosPutIsPending(false)
                    setAxiosPutError(err.response)
                    console.log('request error : ', err.response)
                } else if (err.request) {
                    // request errors // not send request 
                    setAxiosPutUrl(null)
                    setAxiosPutIsPending(false)
                    setAxiosPutError(err.request)
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
        if (axiosPutUrl !== null && axiosPutData !== null) {
            sendRequest()
        }
    }, [axiosPutUrl])

    return { axiosPutResult, axiosPutIsPending, axiosPutError, setAxiosPutUrl, setAxiosPutData }
}
