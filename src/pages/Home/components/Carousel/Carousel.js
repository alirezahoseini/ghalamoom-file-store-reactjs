import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Autoplay } from "swiper";

// styles
import "swiper/css";
import "./Carousel.css"

// hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet';

// components
import CarouselSidebar from './CarouselSidebar/CarouselSidebar'
import CarouselCourseItem from './CarouselItems/CarouselCourseItem/CarouselCourseItem';
import SwiperNavButtons from './SwiperNavButtons/SwiperNavButtons';
import CarouselLoaderCard from './CarouselItems/components/CarouselLoaderCard/CarouselLoaderCard'
import LoadDataError from './CarouselItems/components/LoadDataError/LoadDataError';

export default function Carousel(props) {
  const {
    id,
    isSidebar = true,
    bgColor = '',
    title,
    desc,
    customClass = '',
    moreOptionsTitle = '',
    autoPlay = false,
    apiUrl,
    limit = 6
  } = props;
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl, setAxiosGetToken } = useAxiosGet();
  const [dataArray, setDataArray] = useState();
  const [carouselBreakPoints, setcarouselBreakPoints] = useState();
  const [loadDataIsFailed, setLoadDataIsFailed] = useState(false)


  useEffect(() => {
    // send request to api for get datas
    setAxiosGetUrl(`${apiUrl}?_sort=id&_order=desc&_page=1&_limit=${limit}`)
    // access and Set showing slides count
    if (isSidebar) {
      setcarouselBreakPoints(
        {
          0: {
            // xs
            slidesPerView: 1
          },
          640: {
            // sm,
            slidesPerView: 2,
          },
          1280: {
            // lg
            slidesPerView: 3,
          },
        }
      )
    } else {
      setcarouselBreakPoints(
        {
          0: {
            // xs
            slidesPerView: 1
          },
          640: {
            // sm,
            slidesPerView: 2,
          },
          1024: {
            // lg
            slidesPerView: 3,
          },
          1280: {
            // Xl
            slidesPerView: 4,
          },
        }
      )
    }
  }, []);

  // 
  useEffect(() => {
    if (axiosGetResult !== null) {
      setDataArray(axiosGetResult)
    } else if (axiosGetError !== null) {
      console.log(axiosGetError)
      setLoadDataIsFailed(true)
    }
  }, [axiosGetResult, axiosGetError])

  return (
    <div className='carousel' id={id}>
      <div className={`wrpper w-full relative rounded-4xl flex flex-col  items-center justify-center gap-2 p-5 ${isSidebar && 'lg:flex-row'} ${bgColor} ${customClass}`}>
        <div className={`w-full ${isSidebar ? 'lg:w-3/12' : ''}`}>
          <CarouselSidebar
            title={title}
            description={desc}
            moreOptionsTitle={moreOptionsTitle}
            isSidebar={isSidebar}
          />
        </div>
        <div className={`${isSidebar ? 'w-full lg:w-9/12' : 'w-full'}`}>
          {/* Start loader card  */}
          {axiosGetIsPending && <CarouselLoaderCard isSidebar={isSidebar} />}
          {loadDataIsFailed &&
            <LoadDataError />}
          {/* End of loader card  */}
          {carouselBreakPoints && axiosGetIsPending === false && (
            <Swiper
              wrapperTag='div'
              modules={[Navigation, Pagination, A11y, Autoplay]}
              slidesPerView={4}
              breakpoints={carouselBreakPoints}
              autoplay={autoPlay && {
                delay: 4000,
                disableOnInteraction: true
              }}
              className="carousel">
              {/* Carousel Items  */}
              {
                dataArray !== undefined && (
                  dataArray.map(item => (
                    <SwiperSlide key={item.id}  >
                      <CarouselCourseItem {...item} />
                    </SwiperSlide>
                  )))
              }
              {/* Pagination buttons  */}
              <SwiperNavButtons />
            </Swiper>
          )}
        </div>
      </div>
    </div>
  )
}
