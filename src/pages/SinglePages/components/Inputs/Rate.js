import { useEffect, useState } from 'react'
import { TbStar, TbStarFilled } from 'react-icons/tb'

export default function Rate(props) {
    const { onChangeEvent, errorMessage, reset, name, isValid } = props;

    const [rateArray, setRateArray] = useState([
        { id: 'one', value: 1, selected: false },
        { id: 'tow', value: 2, selected: false },
        { id: 'three', value: 3, selected: false },
        { id: 'four', value: 4, selected: false },
        { id: 'fiwe', value: 5, selected: false }
    ]);
    const [selectedRate, setSelectedRate] = useState(null);

    useEffect(() => {
        const newRate = [...rateArray];
        newRate.forEach(item => {
            if (item.value <= selectedRate) {
                item.selected = true
            } else {
                item.selected = false
            }
        });
        setRateArray(newRate)
    }, [selectedRate])

    useEffect(()=>{
        if(reset){
            setSelectedRate(null)
        }
    })

    const onChangeHandler = (event) => {
        console.log()
        setSelectedRate(Number(event.target.value))
        onChangeEvent(event)
    }

    return (
        <div className='rate my-3'>
            <label className='text-slate-500 pr-1 dark:text-slate-400 text-xs'>امتیاز شما*</label>
            <div className="wrapper flex gap-2 items-center justify-start my-2">
                {rateArray.map((item => (
                    <div key={item.id}>
                        <input type="radio" name={name} id={item.id} value={item.value} onChange={(event) => onChangeHandler(event)} className='hidden' />
                        <label htmlFor={item.id}
                            className='cursor-pointer text-custom-blue-700 text-sm'
                            key={item.id}>
                            {item.selected ? (<TbStarFilled />) : (<TbStar />)}
                        </label>
                    </div>
                )))}
            </div>
            {!isValid && (
                <span className='text-xs text-custom-red-100 font-bold'>
                    {errorMessage}
                </span>
            )}
        </div>
    )
}
