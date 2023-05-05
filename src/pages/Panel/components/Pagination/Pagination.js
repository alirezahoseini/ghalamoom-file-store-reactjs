import React, { memo } from 'react'
import { TbChevronRight, TbChevronLeft } from 'react-icons/tb'

const Pagination = memo(({currentPage = 1, totalItems = 10, setCurrentPage, pageSize}) => {
    const totalPagesCount = Math.ceil(totalItems / pageSize);
    const pagesArray = Array.from(Array(totalPagesCount).keys())
    
  return (
    <div className='pagination w-full flex flex-row-reverse items-center justify-center font-yekan-bakh gap-3 text-lg font-bold h-fit my-3'>
        <div className={`prev p-2 rounded-lg  cursor-pointer   transition-colors duration-150 bg-white border-2 border-white text-slate-600 hover:border-blue-500 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-700 dark:hover:border-blue-500 ${currentPage === 1 && 'pointer-events-none opacity-50' }`} onClick={()=> setCurrentPage(currentPage - 1)}>
            <TbChevronLeft />
        </div>
        {pagesArray.map(item => (
                <div className={` px-3 pt-1 rounded-lg  cursor-pointer  border-2 transition-colors duration-150 ${item + 1 === currentPage ? 'bg-blue-500 text-slate-50 border-blue-500' : 'bg-white text-slate-600 border-white hover:border-blue-600 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-700 dark:hover:border-blue-500'}`} key={item + 1} onClick={() => setCurrentPage(item + 1)}>
                    {item + 1}
                </div>
        ))}
        <div   
            className={`prev p-2 rounded-lg  cursor-pointer   transition-colors duration-150 bg-white border-2 border-white text-slate-600 hover:border-blue-500 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-700 dark:hover:border-blue-500 ${currentPage === totalPagesCount && 'pointer-events-none opacity-50' }`} onClick={()=> setCurrentPage(currentPage + 1)}>
            <TbChevronRight />
        </div>
    </div>
  )
})

export default Pagination
