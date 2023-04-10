import React from 'react'

// Components 
import ProductList from './ProductList'

export default function Dashbord() {
    return (
        <div id='panel-dashbord' className='flex flex-col gap-3 p-2 lg:p-4'>
            {/* User info  */}
            <div id='user-info' className='flex flex-col md:flex-row gap-4 mt-3'>
                <div id="alert" className='bg-red-2 text-white p-3 rounded-2xl leading-8 shadow-both md:w-6/12'>
                    سلام دوست من <br />
                    این پنل کاربری برای <strong>تست نیست</strong> و تمام اطلاعات سایت رو مدیریت میکنه. <br />
                    <strong> لطفا چیزی رو حذف نکنید</strong>.<br />
                    اگر هم برای تست محصولی اضافه کردید آخرسر پاکش کنید.<br />
                    مرسی ❤️
                </div>
                <div className='bg-blue text-white p-3 rounded-2xl leading-8 shadow-both md:w-6/12'>
                    <h2>خوش اومدی {'علیرضا'} عزیز.!</h2>
                    <p>برای مدیریت هر بخش به همون تب برو </p>
                </div>
            </div>
            {/* End of User info  */}
            <div className='flex flex-col xl:flex-row '>
                {/* Products  */}
                <div className='xl:w-6/12'>
                    <ProductList category={'products'} headTitle={'محصولات'} />
                </div>
                {/* End of Products  */}
                {/* Courses */}
                <div className='xl:w-6/12'>
                    Courses
                </div>
                {/* End of Courses */}
            </div>
        </div>
    )
}
