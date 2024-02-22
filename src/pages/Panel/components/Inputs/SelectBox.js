/************ This syntax requared to run select box **********

-- calling Copmonent ==>  <SelectBox value={formData.format} onChangeEvent={changeHandler} {...inputsData.format} />

------ You must give ( Position: relative ) to the parent tag

-- sending this object ==> 

  format: {
      selectBoxName: 'format',
      label: 'فرمت فایل',
      items: [
        'Preliminary',
        'Intermediate',
        'Advanced'
      ]
    },
  }
  ********************************/



import { useEffect, useState } from 'react';
import { TbChevronDown } from 'react-icons/tb'

export default function SelectBox(props) {
    const { label, onChangeEvent, name, value, items } = props;
    const [selectedItem, setSelectedItem] = useState('');
    const [isOpenSelectBox, setIsOpenSelectBox] = useState(false)

    const changeHandler = (event) => {
        onChangeEvent({ id: event.target.name, value: event.target.id })
        setSelectedItem(event.target.id)
        setIsOpenSelectBox(false)
    }
    useEffect(() => {
        if (value.length) {
            setSelectedItem(value)
        }
    }, [props])

    return (
        <div className='custom-select input-group flex flex-col xl:flex-row gap-3 text-xs p-0 justify-start my-5 xl:items-center'>
            <label className='text-slate-500 pr-1 dark:text-slate-400'>{label}</label>
            {/* Selected Item  */}
            <div className='selected-item'>
                <div className="selected-item-button bg-slate-100 px-4 py-3 rounded-lg cursor-pointer flex items-center gap-2 justify-between xl:justify-start text-slate-800 font-bold dark:bg-slate-700 dark:text-slate-200" onClick={() => setIsOpenSelectBox(true)}>
                    {!selectedItem ? "انتخاب کنید" : selectedItem}
                    <TbChevronDown className='text-base' />
                </div>
            </div>
            {/* End of Selected Item  */}
            {/* SelectBox */}
            <div className={`custom-select-box flex flex-col w-full items-center gap-2 bg-slate-200 p-3 rounded-lg shadow-both absolute top-0 right-0 transition-all duration-200 dark:bg-slate-700 z-10 ${isOpenSelectBox ? 'pointer-events-auto translate-y-0 opacity-100 visible' : 'pointer-events-none translate-y-6 opacity-0 invisible'}`}>
                <h2 className='text-slate-800 dark:text-slate-200'>{label} ها</h2>
                {/* SelectItems  */}
                <div className='flex flex-wrap gap-2'>
                    {items.map(item => (
                        <div key={item} className="custom-select-box-item">
                            <input type="radio" name={name} id={item} value={item} className='custom-select-box-input hidden' onClick={(event) => changeHandler(event)} />
                            <label htmlFor={item} className={`py-2 px-3 bg-slate-100 text-slate-700 font-bold rounded-lg cursor-pointer my-1 inline-block border-4  dark:bg-slate-800 dark:text-slate-300 ${selectedItem === item ? ' border-blue-500 border-opacity-40' : 'border-transparent'}`}>{item}</label>
                        </div>
                    ))}
                </div>
                {/* End of SelectItems  */}
            </div>
            {/* End of SelectBox */}
        </div>
    )
}