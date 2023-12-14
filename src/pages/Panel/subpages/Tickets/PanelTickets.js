import React from 'react'
import { HiOutlineTicket, HiOutlineEnvelopeOpen, HiOutlineTrash } from "react-icons/hi2";
import FormHeader from '../components/FormHeader/FormHeader'
import CounterBox from './CounterBox'
import NewTicketButton from './NewTicketButton';
import TicketItem from './TicketItem';

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
    const ticketArray = [
        {
            id: 35423,
            title: 'دسترسی نداشتن به پلیر',
            date: '1402/10/27',
            departeman: 'پشتیبانی',
            ticketStatus: 'open'
        },
        {
            id: 75996,
            title: 'ثبت سفارش جدید',
            date: '1402/10/124',
            departeman: 'واحد فروش',
            ticketStatus: 'open'
        },
        {
            id: 47552,
            title: 'رفع باگ سایت',
            date: '1402/8/13',
            departeman: 'پشتیبانی',
            ticketStatus: 'close'
        },
    ]
    return (
        <div id='tickets' className="my-3 p-2 ">
            <FormHeader title={'تیکت ها'} />
            <div className="tickets_header my-4 flex flex-wrap">
                {countersArray.map(item => (
                    <CounterBox key={item.id} {...item} />
                ))}
                <NewTicketButton />
            </div>
            <div className="all_tickets bg-white p-5 rounded-xl dark:bg-slate-800">
                <h2 className='border-b pb-4 dark:border-slate-700 
                dark:text-slate-300 text-lg font-bold text-gray-700'>تیکت ها</h2>
                {
                    ticketArray.map(item => (
                        <TicketItem key={item.id}  {...item} />
                    ))
                }
            </div>
        </div>
    )
}
