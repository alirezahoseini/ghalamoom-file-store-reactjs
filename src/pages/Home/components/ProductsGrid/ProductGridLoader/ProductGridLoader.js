import React from 'react'

export default function ProductGridLoader() {
    return (
        <div className='carousel-loader-card'>
            <div className="wrapper flex items-center w-full gap-5">
                <Card customClass={'w-full md:w-6/12 xl:w-4/12'} />
                <Card customClass={'hidden md:block md:w-6/12 xl:w-4/12'} />
                <Card customClass={'hidden xl:block xl:w-4/12'} />
            </div>
        </div>
    )
}

const Card = ({ customClass }) => {
    return (
        <div className={`bg-white rounded-3xl p-3 w-full ${customClass}`}>
            <div className="flex items-start justify-between">
                <div className="simple-image w-36 h-36 bg-slate-200 rounded-3xl -mt-14 animate-pulse"></div>
                <div className="w-16 h-8 bg-slate-200 rounded-xl animate-pulse"></div>
            </div>
            <div className='w-full h-3 bg-slate-200 my-5 rounded-xl animate-pulse'></div>
            <div className='w-full h-3 bg-slate-200 my-5 rounded-xl animate-pulse'></div>
            <div className='w-6/12 h-3 bg-slate-200 my-5 rounded-xl animate-pulse'></div>
            <div className="flex items-start justify-between mt-8">
                <div className='flex items-center gap-3 w-9/12'>
                    <div className="w-1/3 h-10 bg-slate-200 rounded-xl animate-pulse"></div>
                    <div className="w-1/3 h-10 bg-slate-200 rounded-xl animate-pulse"></div>
                </div>
                <div className="w-3/12 h-10 bg-slate-200 rounded-xl animate-pulse"></div>
            </div>
        </div>
    )
}
