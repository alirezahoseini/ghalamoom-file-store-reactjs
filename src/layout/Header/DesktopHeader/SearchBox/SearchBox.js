import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'

export default function SearchBox() {
    return (
        <div id="search-box">
            <form onSubmit={event => event.preventDefault()}>
                <div className="flex items-center justify-center relative bg-gray-1 bg-opacity-10 rounded-xl overflow-hidden p-0">
                    <input type="text" className='bg-gray-1 outline-none p-2 focus:bg-opacity-25 duration-150 transition-all font-yekan-bakh pl-3' placeholder='جستجو' />
                    <button type='submit' className='absolute left-0 bg-gray-1 h-full p-2 rounded-lg hover:bg-gray-2 text-secondary-1 ' >
                        <RiSearch2Line />
                    </button>
                </div>
            </form>
        </div>
    )
}
