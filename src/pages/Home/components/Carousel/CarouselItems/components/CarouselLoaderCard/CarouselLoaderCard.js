import React from 'react'

export default function CarouselLoaderCard({ isSidebar = true}) {
  return (
    <div className='carousel-loader-card'>
      <div className="wrapper flex items-center w-full gap-5">
        <Card customClass={'w-full md:w-6/12 xl:w-4/12'} />
        <Card customClass={'hidden md:block md:w-6/12 xl:w-4/12'} />
        <Card customClass={'hidden xl:block xl:w-4/12'} />
        {!isSidebar && (
          <Card customClass={'hidden xl:block xl:w-4/12'} />
        )}
      </div>
    </div>
  )
}


const Card = ({ customClass }) => {
  return (
    <div className={`bg-white rounded-3xl p-3 w-full ${customClass}`}>
      <div className="simple-image w-full h-64 bg-slate-200 rounded-3xl animate-pulse"></div>
      <div className='w-full h-3 bg-slate-200 my-5 rounded-xl animate-pulse'></div>
      <div className='w-full h-3 bg-slate-200 my-5 rounded-xl animate-pulse'></div>
      <div className='w-6/12 h-3 bg-slate-200 my-5 rounded-xl animate-pulse'></div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4 w-10/12 my-5'>
          <div className="w-3/12 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="w-3/12 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
        <span className="w-3/12 h-8 bg-slate-200 rounded-lg animate-pulse"></span>
      </div>
      <div className='w-full h-10 bg-slate-200 mt-5 mb-3 rounded-lg animate-pulse '></div>
    </div>
  )
}