import { useEffect, useState } from 'react'

// datas
import { apiLinks } from '../../../data/links'

// utils
import { setCooki, getCooki } from '../../../utils/cookis'
import axios from 'axios';

export default function useUserInfo() {
    const [userInfoObj, setUserInfoObj] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const userId = getCooki('userid');
    const url = `${apiLinks.users}/${userId}`;
    const accessUserName = async () => {
        // first cheking cookis
        const isExistInCookis = getCooki('username');
        if (isExistInCookis !== null) {
            setUserInfoObj({
                username: isExistInCookis,
                avatarImg: getCooki('avatarImg'),
                bgColorCode: getCooki('bgColorCode'),
            })
            setIsPending(false)
        } else if (userId !== null) {
            // get data from server
            const accessToken = getCooki('token')
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                const username = res.data.name;
                const avatarImg = res.data.avatar.avatar.image;
                const bgColorCode = res.data.avatar.bgColor.color;

                if (username) {

                    setCooki('username', username, 3);
                    setCooki('avatarImg', avatarImg, 3);
                    setCooki('bgColorCode', bgColorCode, 3);
                    setUserInfoObj({
                        username,
                        avatarImg,
                        bgColorCode
                    })
                    setIsPending(false)
                } else {
                    setUserInfoObj({
                        username: "بارگزاری نشد",
                        avatarId: 1,
                        bgColorId: 1
                    })
                    setIsPending(false)
                    console.log(res.data)
                }
            }).catch((error) => {
                console.log(error)
                if (error.response) {
                    setIsPending(false)
                    console.log('response error in user Name:  ', error.response)
                } else if (error.request) {
                    setUserInfoObj({
                        username: "بارگزاری نشد",
                        avatarImg: 1,
                        bgColorCode: 1
                    })
                    setIsPending(false)
                    console.log('request error in user Name:  ', error.request)
                }
            })
        }
    }
    useEffect(() => {
        accessUserName()
    }, [])

    return { isPending, userInfoObj }
}
