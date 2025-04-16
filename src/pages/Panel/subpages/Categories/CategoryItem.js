import React from 'react'
import { FiTrash2 } from "react-icons/fi";

function CategoryItem({_id, name, type, deleteItem}) {
    const clickHandler = () => {
        deleteItem(_id)
    }
  return (
    <div className='flex gap-2 my-2 p-3 hover:bg-slate-50 dark:hover:bg-slate-900 items-center rounded-xl'>
        <h3 className='font-bold dark:text-slate-200'>{name}</h3>
        <span className='bg-slate-100 text-xs  px-3 py-1 rounded-md text-slate-600 dark:bg-slate-700 dark:text-slate-400'>
            {type === 'Product' && "محصول"}
            {type === 'Course' && "دوره"}
        </span>
        <FiTrash2 onClick={clickHandler} className='mr-auto cursor-pointer text-slate-600 p-1 hover:bg-red-500 text-3xl hover:text-slate-100 rounded-md dark:text-slate-400 dark:hover:text-slate-100 ' title='حذف دسته'/>
    </div>
  )
}

export default CategoryItem