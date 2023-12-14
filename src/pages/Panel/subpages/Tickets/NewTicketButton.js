import React from 'react'
import { HiOutlinePlusCircle } from "react-icons/hi2";


function NewTicketButton() {
    return (
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
    )
}

export default NewTicketButton