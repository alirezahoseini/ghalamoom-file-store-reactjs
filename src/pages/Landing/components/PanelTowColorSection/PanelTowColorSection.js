import React from 'react'
import { Link } from 'react-router-dom'

// Components
import DefaultUserInfos from '../../../Panel/subpages/LoginPage/components/LoginInput/DefaultUserInfos/DefaultUserInfos'

// Assets
import panelImage from '../../../../assets/images/landing/2color-dashboard.jpg'

export default function PanelTowColorSection() {
    return (
        <div id='panel-tow-color-section' className='flex flex-col lg:flex-row items-center justify-between my-8 ' >
            <div className='lg:w-6/12'>
                <img src={panelImage} alt="panel" className='rounded-lg overflow-hidden' />
            </div>
            <div className='w-full lg:w-6/12 my-10 lg:my-5'>
                <div className='w-full lg:w-10/12 text-center mx-auto'>
                    <h2 className='text-5xl font-black text-slate-700 font-rokh mt-10'>تم تیره</h2>
                    <h3 className='mt-5 font-bold text-slate-800 text-base'>قلموم مجهز به داشبورد پیشرفته و با طراحی زیبا</h3>
                    <p className='mt-5 font-medium text-slate-700 text-sm'>
                        محصول جدید ایجاد کنید ، اطلاعات دوره ها را تغییر دهید، پروفایل خود را شخصی سازی کنید و بینهایت نمونه کار در پنل مدیریت اضافه کنید
                    </p>
                    <div className='w-9/12 mx-auto bg-white p-5 mt-5 rounded-md'>
                        <DefaultUserInfos />
                        <Link to={'/panel'} className='bg-blue-500 w-full py-2 text-white font-normal block rounded-md mt-3'>ورود به پنل</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
