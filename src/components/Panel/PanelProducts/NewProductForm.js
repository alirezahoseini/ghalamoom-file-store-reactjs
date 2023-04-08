import React from 'react'
import { MdAddCircleOutline } from 'react-icons/md'

export default function NewProductForm() {
    return (
        <div id='new-product-form' className='bg-white p-3 rounded-lg'>
            <h2 className='flex items-center text-gray-5 mt-3 mb-10'>
                <MdAddCircleOutline  className='text-4xl ml-3'/>
                <span className='text-2xl'>افزودن محصول جدید</span>
            </h2>
            <form className='my-5 flex flex-col gap-3'>
                <input type="text" name='title' placeholder='عنوان محصول...' className='bg-gray-1 py-2 px-3 rounded-xl w-full outline-none border-2 border-transparent duration-300 focus:border-blue' />
                <textarea  name="description" cols="30" rows="10" placeholder='توضیحات محصول' className='bg-gray-1 py-2 px-3 rounded-xl w-full outline-none border-2 border-transparent duration-300 focus:border-blue'></textarea>
            </form>
        </div>
    )
}
