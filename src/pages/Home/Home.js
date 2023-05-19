import React, { useState } from 'react'

// datas
import { apiLinks } from '../../data/links';

// Components
import StarterBaner from './components/StarterBaner/StarterBaner'
import Carousel from './components/Carousel/Carousel'
import ProductsGrid from './components/ProductsGrid/ProductsGrid';
import NewslaterForm from './components/NewslaterForm/NewslaterForm';
import InstagramBanner from '../../components/ui/InstagramBanner/InstagramBanner';
import StudentsComments from './components/StudentsComments/StudentsComments';

export default function Home() {
  const sectionsData = {
    courses: {
      id: 'courses-carousel',
      bgColor: 'bg-slate-200',
      title: 'پکیج های آموزشی قلموم',
      desc: 'قلموم کلی دوره گرافیک دیزاین براتون داره که با تهیه هر کدوم پشتیبانی همیشگی و کلی آپدیت دائمی رو دریافت میکنین',
      moreOptionsTitle: 'مشاهده همه دوره ها',
      sideBar: false,
      apiUrl: apiLinks.courses,
      autoPlay: true,
      limit: 6,
      type: 'course'
    },
    products: {
      id: 'products-grid',
      title: 'فروشگاه فایل قلموم',
      desc: 'اینجا کلی فایل مثل فونت های جذاب، آیکون های سه بعدی، موکاپ های کاربردی و ... رو میتونین تهیه کنین. کلی ازشون هم رایگانن. حتما یه چرخی بینشون بزن ببین چیزی برای طرح بعدیت نیاز نداری.',
      moreOptionsTitle: 'مشاهده همه فایل ها',
      apiUrl: apiLinks.products,
      limit: 6,
      type: 'product'
    },
    artworks: {
      id: 'artworks-carousel',
      bgColor: 'bg-slate-100',
      title: 'نمونه کارهای قلموم',
      desc: 'تو این بخش میتونین آخرین نمونه کارهای من رو ببینین. منتظر نظراتتون در بخش دیدگاه ها هستم.',
      moreOptionsTitle: 'مشاهده همه نمونه کارها',
      sideBar: false,
      apiUrl: apiLinks.artworks,
      autoPlay: true,
      limit: 6,
      type: 'artwork'
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
          <Carousel {...sectionsData.courses} />
        </section>
        {/* End of Courses Carousel  */}
        {/* Products grid */}
        <section className='mb-8'>
          <ProductsGrid {...sectionsData.products} />
        </section>
        {/* End of Products grid */}
        {/* Newslater form  */}
        <NewslaterForm />
        {/* End of Newslater form  */}
        {/* Courses Carousel  */}
        <section className='mb-8'>
          <Carousel {...sectionsData.artworks} />
        </section>
        {/* End of Courses Carousel  */}
        {/* Instagram banner  */}
        <section className='mb-8'>
          <InstagramBanner />
        </section>
        {/* End of Instagram banner  */}
        {/* Instagram banner  */}
        <section className='mb-8'>
          <StudentsComments />
        </section>
        {/* End of Instagram banner  */}
      </div>
    </>
  )
}
