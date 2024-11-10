import React, { memo } from 'react'
// components
import CourseImageBox from './CourseImageBox';
import Title from '../../../Title/Title';
import Paragraph from '../../../Paragraph/Paragraph';
import Badge from '../../../../../../components/ui/Badge/Badge'
import LikeCounterButton from '../../../../../../components/ui/LikeCounterButton/LikeCounterButton'
import PriceBadge from '../../../../../../components/ui/PriceBadge/PriceBadge';
import { Link } from 'react-router-dom';
import { TbChevronLeft } from 'react-icons/tb';

const CarouselCourseItem = memo((props) => {
  const {
    image,
    title,
    level,
    prerequisite,
    price,
    duration,
    shortDes,
    _id,
    type
  } = props;

  console.log(props)
  return (
    <div className={`carousel-course-item px-3 pt-20`}>
      <div className="wrapper bg-white rounded-xl pb-3">
        <Link to={`/${type}s/${_id}`}>
          <CourseImageBox
            image={image}
            level={level}
            title={title}
            prerequisite={prerequisite}
          />
        </Link>
        <div className="flex flex-col px-5 mb-3 gap-3">
          <Link to={`/${type}s/${_id}`}>
            <Title title={title} />
          </Link>
          <Paragraph content={shortDes} maxLength={120} />
          <div className='flex items-center gap-3 justify-between my-3'>
            <div className='flex items-center gap-3'>
              <LikeCounterButton {...props} type={type} />
              <Badge title={duration} value={'ساعت'} />
            </div>
            <PriceBadge price={price} />
          </div>
          <Link to={`/${type}s/${_id}`} className='w-full'>
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
})

export default CarouselCourseItem
