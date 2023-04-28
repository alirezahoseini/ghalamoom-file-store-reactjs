import React, { useEffect, useState } from 'react'
import { v4 } from "uuid";



// components
import NormalInput from '../../components/Inputs/NormalInput'
import Textarea from '../../components/Inputs/Textarea'
import Rate from '../../components/Inputs/Rate'
import SubmitButton from './SubmitButton/SubmitButton'

export default function Form({ addNewComment, isPending, isResetForm }) {
    const [formData, setFormData] = useState({
        created_at: new Date().getTime(), 
        id: v4(),
        name: '',
        email: '',
        comment: '',
        rate: 0
    });
    const [isValidRate, setIsValidRate] = useState(true);
    const inputsObj = {
        name: {
            name: 'name',
            label: 'نام*',
            placeholder: 'نام خود را وارد کنید',
            type: 'text',
            required: true,
            errorMessage: 'نام خود را فقط به فارسی و بین 3 الی 15 کلمه وارد کنید',
            pattern: '^[\u0600-\u06FF\\s]{3,15}$',
            maxLength: 15,
        },
        email: {
            name: 'email',
            label: 'ایمیل*',
            placeholder: 'ایمیل خود را وارد کنید',
            type: 'email',
            required: true,
            errorMessage: 'لطفا یک ایمیل معتبر وارد کنید',
            pattern: '^[a-zA-Z0-9_.+-]{3,30}@[a-zA-Z0-9-]{3,15}\\.[a-zA-Z0-9-.]{2,5}$',
            maxLength: 25,
        },
        comment: {
            name: 'comment',
            label: 'دیدگاه شما*',
            placeholder: 'دیدگاه خود را اینجا بنویسید',
            required: true,
            errorMessage: 'دیدگاه باید بین 3 الی 150 کلمه باشد',
            pattern: '^[\\w\u0600-\u06FF\\s]{3,150}',
            maxLength: 150,
            minLength: 3,
            rows: '2'
        },
        rate: {
            name: 'rate',
            label: 'امتیاز شما*',
            errorMessage: 'لطفا امتیاز دهید',
        }
    }
    const onChangeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        if (isValidRate === false && event.target.name === 'rate') {
            setIsValidRate(true)
        }
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (formData.rate !== 0) {
            addNewComment(formData);
        } else {
            setIsValidRate(false)
        }
    }

    useEffect(() => {
        if (isResetForm) {
            setFormData({
                created_at: new Date().getTime(), 
                id: v4(),
                name: '',
                email: '',
                comment: '',
                rate: 0
            })
        }
    })

    return (
        <div className='form text-xs lg:text-sm my-3'>
            <div className="dess text-slate-600 flex flex-col gap-2">
                <span>دیدگاه خود را بنویسید</span>
                <span>نشانی ایمیل شما منتشر نخواهد شد. بخش های مورد نیاز علامت گذاری شده اند*</span>
            </div>
            <form onSubmit={onSubmitHandler}>
                <Rate isValid={isValidRate} {...inputsObj.rate} onChangeEvent={onChangeHandler} reset={isResetForm} />
                <NormalInput {...inputsObj.name} onChangeEvent={onChangeHandler} value={formData.name} reset={isResetForm} />
                <NormalInput {...inputsObj.email} onChangeEvent={onChangeHandler} value={formData.email} reset={isResetForm} />
                <Textarea {...inputsObj.comment} onChangeEvent={onChangeHandler} value={formData.comment} reset={isResetForm} />
                <SubmitButton value={'ثبت دیدگاه'} loading={isPending} />
            </form>
        </div>
    )
}
