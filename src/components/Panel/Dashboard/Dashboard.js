import { useEffect, useState } from 'react'

// files 
import { setCooki, getCooki } from '../../../utils.js'

// Components 
import ProductList from './ProductList'
import axios from 'axios'

export default function Dashboard() {
    const [userName, setUserName] = useState('')
    const accessUserData = async () => {
        const username = await getCooki('username');
        if (username !== null) {
            setUserName(username);
        } else {
            console.log(username)
            console.log('dddd')
            const token = await getCooki('token');
            const url = 'https://x8ki-letl-twmt.n7.xano.io/api:hq-tx9uX/auth/me'
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    setCooki('username', res.data.name, 7)
                    setUserName(res.data.name)
                })
                .catch(err => {
                    if (err.response) {
                        console.log('response error : ', err.response)
                    } else if (err.request) {
                        console.log('request error dashboard access to user info : ', err.request)
                    }
                })
        }
    }

    useEffect(() => {
        accessUserData()
    }, [])

    return (
        <div id='panel-dashboard' className='flex flex-col gap-3 p-2'>
            {/* User info  */}
            <div id='user-info' className='flex flex-col gap-4 mt-3'>
                <div id="alert" className='bg-red-2 text-white p-3 rounded-2xl leading-8 shadow-both'>
                    سلام دوست من <br />
                    این پنل کاربری برای <strong>تست نیست</strong> و تمام اطلاعات سایت رو مدیریت میکنه. <br />
                    <strong> لطفا چیزی رو حذف نکن</strong>.<br />
                    اگر هم برای تست محصولی اضافه کردی آخرسر پاکش کن.<br />
                    مرسی ❤️
                </div>
                <div className='bg-blue text-white p-3 rounded-2xl leading-8 shadow-both'>
                    <h2 className='flex items-center gap-1'>خوش اومدی {
                        userName.length > 0 ? (userName) : (
                            <span className='w-20 h-3 inline-block bg-gray-1 rounded-sm animate-bounce' ></span>
                        )
                    } عزیز.!</h2>
                    <p>برای مدیریت هر بخش به همون تب برو </p>
                </div>
            </div>
            {/* End of User info  */}
            {/* Lists  */}
            <div className='flex flex-col '>
                {/* Products  */}
                <div className=''>
                    {/* <ProductList category={'products'} headTitle={'محصولات'} /> */}
                </div>
                {/* End of Products  */}
                {/* Courses */}
                <div className=''>
                    Courses
                </div>
                {/* End of Courses */}
            </div>
            {/* End of Lists  */}
        </div>
    )
}
