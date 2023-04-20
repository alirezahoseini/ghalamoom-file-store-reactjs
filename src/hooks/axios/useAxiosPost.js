import axios from "axios";

import { useEffect, useState } from 'react'

export default function useAxiosPost() {
    const [axiosPostResult, setAxiosPostResult] = useState(null);
    const [axiosPostUrl, setAxiosPostUrl] = useState(null);
    const [axiosPostIspending, setAxiosPostIspending] = useState(false);
    const [axiosPostError, setAxiosPostError] = useState(null);
    const [axiosPostData, setAxiosPostData] = useState(null);

    const sendRequest = () => {
        console.log('send request is run')
        setAxiosPostIspending(true);

        axios.post(axiosPostUrl, axiosPostData)
            .then(res => {
                setAxiosPostResult(res.data)
                setAxiosPostData(null)
                setAxiosPostUrl(null)
                setAxiosPostIspending(false)
                setAxiosPostData(null)
            })
            .catch(err => {
                if (err.response) {
                    setAxiosPostUrl(null)
                    setAxiosPostIspending(false)
                    setAxiosPostError(err.response)
                    console.log('request error : ', err.response)
                } else if (err.request) {
                    setAxiosPostUrl(null)
                    setAxiosPostIspending(false)
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

    return { axiosPostResult, axiosPostIspending, axiosPostError, setAxiosPostUrl, setAxiosPostData }
}
