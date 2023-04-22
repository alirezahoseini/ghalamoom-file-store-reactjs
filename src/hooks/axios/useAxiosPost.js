import axios from "axios";
import { useEffect, useState } from 'react'

export default function useAxiosPost() {
    const [axiosPostResult, setAxiosPostResult] = useState(null);               // ok result output 
    const [axiosPostUrl, setAxiosPostUrl] = useState(null);                     // request url
    const [axiosPostIsPending, setAxiosPostIsPending] = useState(false);        // request is loading?
    const [axiosPostError, setAxiosPostError] = useState(null);                 // errors output
    const [axiosPostData, setAxiosPostData] = useState(null);                   // request data ==> sending to api

    const sendRequest = () => {
        setAxiosPostIsPending(true);                // is loading === true
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
                    alert("ارتباط با سرور برقرار نشد. لطفا از VPN استفاده کنید")
                }
            })
    }


    useEffect(() => {
        if (axiosPostUrl !== null && axiosPostData !== null) {
            sendRequest()
        }
    }, [axiosPostUrl])

    return { axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostData }
}
