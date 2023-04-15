import React, { useState } from 'react'
import { BiMicrophone } from 'react-icons/bi'
import { RiSearchLine } from 'react-icons/ri'
import { TbX } from 'react-icons/tb'

// components
import Modal from '../../../../../../components/ui/Modal'

export default function SearchBox() {
    const [isOpenMobileSearchModal, setIsOpenMobileSearchModal] = useState(false)
    return (
        <>
            {/* Desktop Search box  */}
            <div id="search-box-desktop" className='hidden bg-gray-100 lg:flex items-center py-3 px-4 rounded-5xl dark:bg-slate-700'>
                <BiMicrophone className='text-blue-600 text-base ml-2 dark:text-blue-400' />
                <input type="text" placeholder=' جستجو ... ' className='bg-transparent outline-none border-none text-xs dark:text-slate-100' />
                <i className='border-r-2 border-gray-300  h-full mr-2 dark:border-gray-500'></i>
                <RiSearchLine className='mr-3 text-gray-500 cursor-pointer dark:text-slate-300' />
            </div>
            {/* End of Desktop Search box  */}
            <div id='search-box-mobile' className='lg:hidden'>
                <button className="search-btn  text-lg p-3 rounded-lg bg-gray-100 text-gray-500 cursor-pointer hover:bg-gray-200 dark:text-slate-300 dark:bg-slate-700 " onClick={() => setIsOpenMobileSearchModal(true)}>
                    <RiSearchLine />
                </button>
                <Modal isShow={isOpenMobileSearchModal} onClose={() => setIsOpenMobileSearchModal(false)}>
                    <div className='w-full flex p-1 gap-2 text-xs'>
                        <div className='w-full flex bg-gray-100 justify-between py-3 px-4 items-center rounded-md dark:bg-slate-700'>
                            <input type="text" className='bg-transparent outline-none border-none dark:text-slate-100' placeholder='جستجو...' />
                            <RiSearchLine className='text-slate-700 dark:text-slate-200' />
                        </div>
                        <button className="close-btn px-3 rounded-lg bg-gray-100 dark:text-slate-400 dark:bg-slate-700 " onClick={() => setIsOpenMobileSearchModal(false)}>
                            <TbX/>
                        </button>
                    </div>
                    <div className="recent-searches w-full flex flex-col items-start text-xs px-2">
                        <h3 className='text-gray-600 dark:text-slate-300'>جستجو های اخیر</h3>
                        <ul className='w-full flex flex-wrap gap-2 my-2'>
                            <li className='flex gap-2 items-center my-1 p-2 bg-slate-100 dark:bg-slate-900 w-fit rounded-md '>
                                <span className='text-slate-600 dark:text-slate-400'>دوره مستر گرافیک</span>
                                <TbX className='text-slate-500'/>
                            </li>
                            <li className='flex gap-2 items-center my-1 p-2 bg-slate-100 dark:bg-slate-900 w-fit rounded-md '>
                                <span className='text-slate-600 dark:text-slate-400'>اعضای سایت</span>
                                <TbX className='text-slate-500'/>
                            </li>
                            <li className='flex gap-2 items-center my-1 p-2 bg-slate-100 dark:bg-slate-900 w-fit rounded-md '>
                                <span className='text-slate-600 dark:text-slate-400'>تغییر تصویر</span>
                                <TbX className='text-slate-500'/>
                            </li>
                        </ul>
                    </div>
                </Modal>
            </div>
        </>
    )
}
