import React from 'react'

function TicketItem({ id, title, date, departeman, ticketStatus }) {
    return (
        <div className="ticket_item flex flex-col xl:flex-row xl:items-center justify-between my-5 gap-3 border-b pb-4 dark:border-slate-700">
            <div className='flex gap-3 items-center'>
                <span className="item_id font-bold text-slate-600 dark:text-slate-400">#{id}</span>
                <h4 className='font-bold text-slate-900 dark:text-slate-100'>{title}</h4>
            </div>
            <div className='flex  gap-3 items-center'>
                <span className='text-slate-600 dark:text-slate-300 text-xs font-bold'>{date}</span>
                <span className="bg-slate-200 dark:bg-slate-700 dark:text-slate-300 py-1 px-3 rounded-md text-xs">{departeman}</span>
                <span className={` ${ticketStatus === 'open' ? 'bg-green-200 dark:bg-green-400' : 'bg-orange-200 dark:bg-orange-400'} py-1 px-3 rounded-md text-xs`}>{
                    ticketStatus === 'open' ? 'باز' : 'بسته'
                }</span>
            </div>
        </div>
    )
}

export default TicketItem