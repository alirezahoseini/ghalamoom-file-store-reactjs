/************ This syntax requared to run inStock radio input **********

-- calling Copmonent ==>   <InStockRadio value={formData.inStock} onChangeEvent={changeHandler} {...inputsData.inStock} />

-- sending this object ==> 

    inStock: {
      name: 'inStock',
      label: 'وضعیت موجودی انبار',
    },

  ********************************/

import { useEffect, useState } from 'react';
import {TbCheck, TbX} from 'react-icons/tb'
import './Inputs.css'

export default function InStockRadio(props) {
    const [isTrue, setIsTrue] = useState(true)
    const { label, onChangeEvent, name, value } = props;

    const changeHandler = (event) => {
        setIsTrue(prev => !prev)
        onChangeEvent(event)
    }

    useEffect(()=> { setIsTrue(value) }, [])

    return (
        <div className='instock-input input-group flex gap-3 text-xs p-0 justify-start mt-5 items-center'>
            <label className='text-slate-500 pr-1 dark:text-slate-400'>{label}:</label>
            <div className='radio-group'>
                <input type='radio' id='inStock' name={name} value={true} onChange={(event) => changeHandler(event)}  className='hidden'/>
                <label htmlFor="inStock" className={`cursor-pointer flex items-center gap-2 text-white py-1 px-2 rounded-md  ${isTrue ? 'active' : ''}`}>
                    <TbCheck className='text-sm'/>
                    <span>موجود</span>
                </label>
            </div>
            <div className='radio-group'>
                <input type='radio' id='NotinStock' name={name} value={false} onChange={(event) => changeHandler(event)} className='hidden' />
                <label htmlFor="NotinStock" className={`cursor-pointer flex items-center gap-2 text-white py-1 px-2 rounded-md  ${!isTrue ? 'active' : ''}`}>
                    <TbX  className='text-sm'/> 
                    <span>ناموجود</span>
                </label>
            </div>

        </div>
    )
}