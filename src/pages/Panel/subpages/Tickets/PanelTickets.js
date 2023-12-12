import React from 'react'
import FormHeader from '../components/FormHeader/FormHeader'
import CounterBox from './CounterBox'
import { HiOutlineTicket, HiOutlineEnvelopeOpen, HiOutlineTrash, HiOutlinePlusCircle  } from "react-icons/hi2";

export default function PanelTickets() {
    const countersArray = [
        {
            id: 1,
            title: 'همه تیکت ها',
            count: 4,
            icon: <HiOutlineTicket />,
            color: '#FACC15'
        },
        {
            id: 2,
            title: "تیکت های باز",
            count: 0,
            icon: <HiOutlineEnvelopeOpen />,
            color: '#4E81FB'
        },
        {
            id: 3,
            title: "تیکت های بسته شده",
            count: 1,
            icon: <HiOutlineTrash />,
            color: '#F43F5E'
        },
    ]
    return (
        <div id='tickets' className="my-3 p-2 ">
            <FormHeader title={'تیکت ها'} />
            <div className="tickets_wrapper my-4 flex flex-wrap">
                {countersArray.map(item => (
                    <CounterBox key={item.id} {...item} />
                ))}
                <div className="w-6/12 md:w-4/12 xl:w-3/12 p-3 " >
                    <div className=' w-full text-white rounded-xl gap-3 inline-flex items-center justify-start p-2 bg-green-500 hover:bg-green-600 hover:cursor-pointer'>
                        <div className="icon text-3xl  p-5 rounded-xl ">
                            <HiOutlinePlusCircle />
                        </div>
                        <div className="body flex flex-col gap-2">
                            <span className='text-xl font-bold'>تیکت جدید</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
