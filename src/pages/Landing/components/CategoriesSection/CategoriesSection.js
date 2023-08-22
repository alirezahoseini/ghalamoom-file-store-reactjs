import React from 'react'

// Assets
import categoriesImage from '../../../../assets/images/landing/categories.png'

export default function CategoriesSection() {
  return (
    <div id='categories-section' className='flex flex-col bg-white rounded-2xl items-center my-10 lg:flex-row justify-between w-full'>
      <div className='w-full lg:w-5/12 mt-3 mb-10 lg:my-5'>
        <div className='w-full lg:w-10/12 text-center mx-auto'>
          <h2 className='text-5xl font-black text-slate-600 font-rokh mt-10'>دسته بندی ها</h2>
          <h3 className='mt-5 font-bold text-slate-800 text-base'>
            دسته بندی اختصاصی برای محتوای سایت
          </h3>
        </div>
      </div>
      <div className='lg:w-7/12 lg:my-8 mb-8 '>
        <img src={categoriesImage} alt="pagination" />
      </div>
    </div>
  )
}
