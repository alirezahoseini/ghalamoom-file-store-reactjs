import React, { memo } from 'react'


// components
import InstagramBanner from '../../../../components/ui/InstagramBanner/InstagramBanner'
import Breadcrumb from '../Breadcrumb/Breadcrumb'

const CategoryHeader = memo(() => {
  return (
    <div className='category-header px-4 lg:px-0'>
      <div className="wrapper flex justify-start items-center gap-3">
        {/* Breadcrumb  */}
        <div className='lg:w-4/12'>
          <Breadcrumb type="courses"/>
        </div>
        {/* End of Breadcrumb  */}
        {/* Instagram baner  */}
        <div className="insta-baner lg:w-10/12 hidden lg:inline-block lg:my-10">
          <InstagramBanner showFollowers={false} customClass='lg:py-0' iconCustomWidth='lg:w-5/12' />
        </div>
        {/* End of Instagram baner  */}
      </div>
    </div >
  )
});


export default CategoryHeader
