import React from 'react'
// components
import CourseImageBox from './CourseImageBox';
import Title from '../components/Title/Title';
import Paragraph from '../components/Paragraph/Paragraph';
import Badge from '../../../../../../components/ui/Badge/Badge'
import LikeCounterButton from '../../../../../../components/ui/LikeCounterButton/LikeCounterButton'
import PriceBadge from '../../../../../../components/ui/PriceBadge/PriceBadge';
import { Link } from 'react-router-dom';
import { TbChevronLeft } from 'react-icons/tb';


export default function CarouselCourseItem(props) {
  console.log(props)
  const {
    image,
    title,
    level,
    prerequisite,
    price,
    time,
    miniDes,
    id
  } = props
  return (
    <div className={`carousel-course-item px-3 pt-20`}>
      <div className="wrapper bg-white rounded-xl pb-3">
        <CourseImageBox
          image={image}
          level={level}
          title={title}
          prerequisite={prerequisite}
        />
        <div className="flex flex-col px-5 mb-3 gap-3">
          <Title title={title} />
          <Paragraph content={miniDes} />
          <div className='flex items-center gap-3 justify-between my-3'>
            <div className='flex items-center gap-3'>
              <LikeCounterButton {...props} type='course' />
              <Badge title={time} value={'ساعت'} />
            </div>
            <PriceBadge price={price} />
          </div>
          <Link to={`/courses/${id}`} className='w-full'>
            <button className='flex items-center justify-center font-bold text-slate-500 w-full border-2 py-3 rounded-md gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-600'>
              <span>
                مشاهده اطلاعات بیشتر
              </span>
              <TbChevronLeft className='text-xl' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
