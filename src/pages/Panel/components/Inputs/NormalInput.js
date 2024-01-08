/************ This syntax requared to run Normal input **********

-- calling Copmonent ==>   <NormalInput  value={formData.title} onChangeEvent={changeHandler} {...inputsData.title} />

-- sending this object ==> 

    title: {
      name: 'title',
      label: 'عنوان محصول',
      placeholder: 'عنوان محصول را وارد کنید',
      type: 'text',
      required: true,
      errorMessage: 'عنوان محصول باید بین 5 الی 15 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{5,50}',
      maxLength: 50,
    },

  ********************************/


import { memo, useState } from 'react';
import './Inputs.css'

const NormalInput = memo((props) => {
  const [onFocused, setOnFocused] = useState(false)
  const { label, onChangeEvent, errorMessage, ...otherProps } = props;

  const onFocusHandler = () => {
    setOnFocused(true)
  }

  const onChangeHandler = (event) => {
    onChangeEvent({id: props.name, value: event.target.value})
  }
  return (
    <div className='input-group flex flex-col gap-2 text-xs p-0 justify-start mt-3'>
      <label htmlFor={otherProps.name} className='text-slate-500 pr-1 dark:text-slate-400'>{label}</label>
      <input type={otherProps.type} {...otherProps} onChange={(event) => { onChangeHandler(event)}} onBlur={onFocusHandler} focused={onFocused.toString()} className='bg-slate-50 p-3 rounded-lg outline-none dark:bg-slate-900 dark:text-slate-200' />
      <span className='pr-1 text-custom-red-100 font-bold my-2'>{errorMessage}</span>
    </div>

  )
})

export default NormalInput