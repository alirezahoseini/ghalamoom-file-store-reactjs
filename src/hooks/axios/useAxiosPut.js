import axios from "axios";
import { useEffect, useState } from 'react'

export default function useAxiosPut() {
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
                    alert("ارتباط با سرور برقرار نشد. لطفا از VPN استفاده کنید")
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
