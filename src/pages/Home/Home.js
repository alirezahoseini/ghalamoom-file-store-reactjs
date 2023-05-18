import React, { useState } from 'react'

// datas
import { apiLinks } from '../../data/links';

// Components
import StarterBaner from './components/StarterBaner/StarterBaner'
import Carousel from './components/Carousel/Carousel'

export default function Home() {
  const carouselsData = {
    courses: {
      id: 'courses-carousel',
      bgColor: 'bg-slate-200',
      title: 'پکیج های آموزشی قلموم',
      desc: 'قلموم کلی دوره گرافیک دیزاین براتون داره که با تهیه هر کدوم پشتیبانی همیشگی و کلی آپدیت دائمی رو دریافت میکنین',
      moreOptionsTitle: 'مشاهده همه دوره ها',
      sideBar: false,
      apiUrl: apiLinks.courses,
      autoPlay: true
    }
  }

  return (
    <>
      <div id='home-page' className='mx-auto container' >
        {/* Starter Baner  */}
        <section>
          <StarterBaner />
        </section>
        {/* End of Starter Baner  */}
        {/* Courses Carousel  */}
        <section className='mb-8'>
          <Carousel {...carouselsData.courses} />
        </section>
        {/* End of Courses Carousel  */}
      </div>
    </>
  )
}
