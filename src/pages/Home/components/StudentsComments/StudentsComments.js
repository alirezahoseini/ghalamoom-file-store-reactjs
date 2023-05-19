
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./StudentsComments.css"

// assets
import ghalamoomLogo from '../../../../assets/images/logos/ghalamoom-simple-logo.svg'
// datas
import { comments } from '../../../../data/studentsComments'




export default function StudentsComments() {
    return (
        <>
            <div className='students-comments w-full p-10'>
                <div className="mb-10 flex items-center gap-4 justify-center lg:justify-start">
                    <img src={ghalamoomLogo} alt="ghalamoom logo" className="hidden lg:flex logo-ghalamoom" width={'40px'}/>
                    <div className="flex flex-col items-center gap-3 lg:items-start">
                        <h2 className="text-2xl text-slate-700 font-bold">نظرات دانشجویان قلموم</h2>
                        <p className="text-slate-600">بخش کوچکی از نظرات ارزشمند شما در مورد قلموم</p>
                    </div>
                </div>
                {/* Slider */}
                <Swiper modules={[Pagination]}
                    spaceBetween={30}
                    pagination={{ clickable: true, }}
                    breakpoints={{
                        0: {
                            // xs
                            slidesPerView: 1
                        },
                        640: {
                            // sm,
                            slidesPerView: 2,
                        }
                    }}
                    className="students_comments_slider w-full p-10">
                    {comments.map(item => (
                        <SwiperSlide key={item.id}>
                            <div>
                                <div className="flex items-center gap-2">
                                    <picture className="w-16 h-16 rounded-full overflow-hidden inline-block">
                                        <img src={item.image} alt={item.name} className="w-full" />
                                    </picture>
                                    <div className="flex flex-col gap-1  text-slate-500">
                                        <h2 className=" text-base font-black">{item.name}</h2>
                                        <span className="text-xs">{item.instaId}</span>
                                    </div>
                                </div>
                                <div className=" mt-8 mb-16 bg-white p-5 rounded-xl relative before:w-5 before:h-5 before:bg-white before:block before:rotate-45 before:absolute before:-top-2  ">
                                    {item.comment}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* End of Slider */}
            </div>
        </>
    );
}

