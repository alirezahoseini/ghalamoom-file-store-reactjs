/************ This syntax requared to run Price input **********

-- calling Copmonent ==>    <PriceInput  value={formData.price} onChangeEvent={changeHandler} {...inputsData.price} />

-- sending this object ==> 

    price: {
      name: 'price',
      label: 'قیمت',
      placeholder: "قیمت محصول",
      pattern: "\\d*",
      required: true,
      maxLength: "6",
      errorMessage: 'قیمت را به عدد وارد کنید. اگر رایگان است 0 وارد کنید',
    },


  ********************************/

import { useState } from 'react';
import './Inputs.css'
import tomanIcon from '../../../../assets/icons/toman.svg'

export default function PriceInput(props) {
  const [onFocused, setOnFocused] = useState(false)
  const { label, onChangeEvent, errorMessage, ...otherProps } = props;

  const onFocusHandler = () => {
    setOnFocused(true)
  }

  const onChangeHandler = (event) => {
    onChangeEvent({id: 'price', value: Number(event.target.value)})
  }
  return (
    <div className='input-group flex flex-col xl:flex-row gap-2 text-xs p-0 justify-start xl:items-center'>
      <label htmlFor={otherProps.name} className='text-slate-500 pr-1 dark:text-slate-400'>{label}</label>
      <div className='flex flex-col w-full relative'>
        <input type={otherProps.type} {...otherProps} onChange={(event) => { onChangeHandler(event) }} onBlur={onFocusHandler} focused={onFocused.toString()} className='bg-slate-50 inline-block p-3 rounded-lg outline-none dark:bg-slate-900 dark:text-slate-200' />
        <span className='pr-1 text-custom-red-100 font-bold my-2'>{errorMessage}</span>
        <img src={tomanIcon} alt="toman icon" className='w-5 absolute left-3 top-3'/>
      </div>
    </div>
  )
}