import React, { useState, useContext } from 'react'
import { v4 } from 'uuid'
import { FiCopy } from 'react-icons/fi'


// contexts 
import { NotificationContext } from '../../../../../../../Contexts/Notifications/NotificationProvider'


export default function DefaultUserInfos() {
    const notificationDispatch = useContext(NotificationContext);

    const clickHandler = (textValue) => {
        notificationDispatch({
            type: 'ADD_NOTE',
            payload: {
                id: v4(),
                message: `${textValue} در کلیپ برد کپی شد`,
                status: 'success'
            }
        })
        navigator.clipboard.writeText(textValue)
    }

    return (
        <div className='mt-4 flex flex-col'>
            <h1 className='font-bold text-gray-700 mb-3'>برای ورود از این اطلاعات استفاده کنید</h1>
            <div title='کپی شود' onClick={() => clickHandler('admin@gmail.com')} className='bg-gray-100 my-2 rounded-md p-3 cursor-pointer flex items-center justify-around'>
                <FiCopy className='text-lg text-blue-600' />
                <span>ایمیل: </span>
                <span className='font-bold'>admin@gmail.com</span>
            </div>
            <div title='کپی شود' onClick={() => clickHandler('Password1')} className='bg-gray-100 my-2 rounded-md p-3 cursor-pointer flex items-center justify-around'>
                <FiCopy className='text-lg text-blue-600' />
                <span>رمزعبور : </span>
                <span className='font-bold'>Password1</span>
            </div>
        </div>
    )
}
