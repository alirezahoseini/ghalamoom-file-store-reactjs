/************ This syntax requared to run Textarea **********

-- calling Copmonent ==>  <Textarea  value={formData.largeDes} onChangeEvent={changeHandler} {...inputsData.largeDes} />


-- sending this object ==> 

    largeDes: {
      name: 'largeDes',
      label: 'توضیح بلند',
      placeholder: 'توضیحات محصول',
      required: true,
      errorMessage: 'توضیحات باید بین 40 الی 400 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{40,400}',
      maxLength: 400,
      minLength: 50,
      rows: '5'
    },
    
  ********************************/

import { memo, useState } from 'react';
import './Inputs.css'

const Textarea = memo((props) => {
    const [onFocused, setOnFocused] = useState(false)
    const { label, onChangeEvent, errorMessage, ...otherProps } = props;

    const onFocusHandler = () => {
        setOnFocused(true)
    }
    return (
        <div className='input-group flex flex-col gap-2 text-xs p-0 justify-start mt-3'>
            <label htmlFor={otherProps.name} className='text-slate-500 pr-1 dark:text-slate-400'>{label}</label>
            <textarea  cols="30" type={otherProps.type} {...otherProps} onChange={(event) => { onChangeEvent(event) }} onBlur={onFocusHandler} focused={onFocused.toString()} className='bg-slate-50 p-3 rounded-lg outline-none dark:bg-slate-900 dark:text-slate-200 leading-6' > </textarea>
            <span className='pr-1 text-custom-red-100 font-bold my-2'>{errorMessage}</span>
        </div>
    )
})
export default Textarea