import React, { useEffect, useState } from 'react'
import { v4 } from "uuid";



// components
import NormalInput from '../../components/Inputs/NormalInput'
import Textarea from '../../components/Inputs/Textarea'
import Rate from '../../components/Inputs/Rate'
import SubmitButton from './SubmitButton/SubmitButton'

export default function Form({ addNewComment, isPending, isResetForm }) {
    const [formData, setFormData] = useState({
        content: '',
        rating: 0,
    });
    const [isValidRate, setIsValidRate] = useState(true);
    const inputsObj = {
        content: {
            name: 'content',
            label: 'دیدگاه شما*',
            placeholder: 'دیدگاه خود را اینجا بنویسید',
            required: true,
            errorMessage: 'دیدگاه باید بین 3 الی 150 کلمه باشد',
            pattern: '^[\\w\u0600-\u06FF\\s]{3,150}',
            maxLength: 150,
            minLength: 3,
            rows: '2'
        },
        rating: {
            name: 'rating',
            label: 'امتیاز شما*',
            errorMessage: 'لطفا امتیاز دهید',
        }
    }
    const onChangeHandler = (event) => {
        if (event.target.name === 'rating') {
            setFormData({ ...formData, [event.target.name]: Number(event.target.value) });
            if (isValidRate === false) {
                setIsValidRate(true)
            }
        } else {
            setFormData({ ...formData, [event.target.name]: event.target.value });
        }
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (formData.rating !== 0) {
            addNewComment(formData);
        } else {
            setIsValidRate(false)
        }
    }

    useEffect(() => {
        if (isResetForm) {
            setFormData({
                content: '',
                rating: 0,
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
                <Rate isValid={isValidRate} {...inputsObj.rating} onChangeEvent={onChangeHandler} reset={isResetForm} />
                <Textarea {...inputsObj.content} onChangeEvent={onChangeHandler} value={formData.content} reset={isResetForm} />
                <SubmitButton value={'ثبت دیدگاه'} loading={isPending} />
            </form>
        </div>
    )
}
