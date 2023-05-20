import React, { memo } from 'react'


// components
import InstagramBanner from '../../../../components/ui/InstagramBanner/InstagramBanner'
import Breadcrumb from '../Breadcrumb/Breadcrumb'

const CategoryHeader = memo(({ type , title = 'عنوان تست', description = 'توضیحات تست'}) => {
  return (
    <div className='category-header px-4 lg:px-0 flex flex-col gap-5'>
      {/* Section 1  */}
      <div className="flex justify-start items-center gap-3">
        {/* Breadcrumb  */}
        <div className='w-full lg:w-4/12'>
          <Breadcrumb type={type} />
        </div>
        {/* End of Breadcrumb  */}
        {/* Instagram baner  */}
        <div className="insta-baner lg:w-10/12 hidden lg:inline-block lg:my-10">
          <InstagramBanner showFollowers={false} customClass='lg:py-2' iconCustomWidth='lg:w-5/12' />
        </div>
        {/* End of Instagram baner  */}
      </div>
      {/* End of Section 1  */}
      {/* Section 2  */}
      <div className='flex flex-col gap-5'>
        <h2 className='font-bold text-2xl text-slate-700'>
          <strong>{title} </strong>
          <span className='text-slate-600'>قلموم</span>
        </h2>
        <p className='text-slate-400 font-semibold leading-9 text-base'>
          {description}
        </p>
        <div className='w-28 h-2 bg-custom-gold-100 mb-5'></div>
      </div>
      {/* End of Section 2  */}
    </div >
  )
});


export default CategoryHeader
