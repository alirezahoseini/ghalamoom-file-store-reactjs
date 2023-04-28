import { useEffect, useState } from 'react'
import { TbCalendarEvent } from 'react-icons/tb'
export default function DateBadge({ date }) {
    const [newDate, setNewDate] = useState()
    useEffect(() => {
        const now = new Date();
        now.setTime(Number(date))
        setNewDate(now.toLocaleDateString('fa-IR'))
    }, [])
    return (
        <div className='badge inline-flex items-center py-2 px-2 w-fit rounded-md text-slate-500 font-bold gap-1 pointer-events-none my-1'>
            <span className="text-base">
                <TbCalendarEvent />
            </span>
            <div className="flex items-center gap-1" style={{ fontSize: '10px' }}>
                <span>
                    تاریخ انتشار:
                </span>
                <span>{ newDate }</span>
            </div>
        </div>
    )
}
