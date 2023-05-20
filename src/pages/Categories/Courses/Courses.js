import React, { useState, useEffect } from 'react'

// hooks
import useAxiosGet from '../../../hooks/axios/useAxiosGet';
import withPaginate from '../../../components/HOCs/withPaginate/withPaginate';

// links
import { apiLinks } from '../../../data/links';

// components
import CategoryHeader from '../components/CategoryHeader/CategoryHeader';
import CarouselCourseItem from '../../Home/components/Carousel/CarouselItems/CarouselCourseItem/CarouselCourseItem'
import CarouselLoaderCard from '../../Home/components/Carousel/CarouselItems/components/CarouselLoaderCard/CarouselLoaderCard'
import LoadDataError from '../../Home/components/Carousel/CarouselItems/components/LoadDataError/LoadDataError';

export default function Courses() {
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  const [dataArray, setDataArray] = useState();
  const [loadDataIsFailed, setLoadDataIsFailed] = useState(false)

  useEffect(() => {
    // send request to api for get datas
    setAxiosGetUrl(`${apiLinks.courses}?_sort=id&_order=desc`)
  }, []);

  // 
  useEffect(() => {
    if (axiosGetResult !== null) {
      setDataArray(axiosGetResult)
    } else if (axiosGetError !== null) {
      console.log(axiosGetError)
      setLoadDataIsFailed(true)
    }
  }, [axiosGetResult, axiosGetError]);

  console.log(dataArray)
  return (
    <div className='category-courses container mx-auto'>
      <div className="wrapper">
        {/* Page Header  */}
        <CategoryHeader type='course'
          title='دوره های آموزشی'
          description="قلموم کلی دوره گرافیک دیزاین براتون داره که با تهیه هر کدوم پشتیبانی همیشگی و کلی آپدیت دائمی رو دریافت میکنین"
        />
        {/* End of Page Header  */}
        <div className='my-5'>
          {/* Start loader card  */}
          {axiosGetIsPending && <CarouselLoaderCard isSidebar={false} />}
          {loadDataIsFailed &&
            <LoadDataError />}
          {/* End of loader card  */}
          <div className='flex items-center flex-wrap mb-10'>
            {
              dataArray && axiosGetIsPending === false && (
                dataArray.map(item => (
                    <div key={item.id} className='w-full md:w-6/12 lg:w-4/12'>
                      <CarouselCourseItem {...item} />
                    </div>
                )))
            }
          </div>
        </div>
        {/* <CarouselCourseItem /> */}
      </div>
    </div>
  )
}
