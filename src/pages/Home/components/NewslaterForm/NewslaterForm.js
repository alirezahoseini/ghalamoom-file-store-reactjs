import React from 'react'

// assets 
import newslaterIcon from '../../../../assets/images/home/newslater-image/newslater.png'

export default function NewslaterForm() {
    return (
        <div className='newslater px-4 lg:px-0 mb-10 mt-28 lg:mt-10'>
            <div className="wrraper flex flex-col bg-slate-800 rounded-2xl lg:flex-row items-center">
                {/* title  */}
                <div className="newslater_titles -mt-10 lg:mt-0 w-full lg:w-7/12 flex flex-col items-center lg:flex-row lg:gap-5">
                    <img src={newslaterIcon} alt="news_later_image" className='w-6/12 -mt-14 lg:w-56 lg:mt-0 md:max-w-xs' width='368px' height='368px' />
                    <div className='flex flex-col lg:gap-4'>
                        <h2 className='text-slate-100 font-black text-lg lg:text-3xl xl:text-4xl'>تخفیف هارو از دست نده!</h2>
                        <span className='font-normal text-slate-300 my-3 lg:text-lg'>ایمیل و شمارت رو بزار تا بهت خبر بدم</span>
                    </div>
                </div>
                {/* title  */}
                {/* form */}
                <div className="newslater_form w-full lg:w-5/12">
                    <form onSubmit={(e) => e.preventDefault()}
                        className='flex items-center justify-center w-full flex-col p-4 gap-4'
                    >
                        <div className="flex flex-col lg:flex-row w-full gap-3">
                            <input type="number" pattern='/[^\D]/' name="number" id="number" placeholder='تلفن'
                                malgength={14}
                                minLength={12}
                                className='border-2 outline-none bg-slate-700 text-slate-100 px-3 py-2 rounded-md w-full border-slate-700 focus:border-blue-500'
                            />
                            <input type="email" pattern='/[^\D]/' name="number" id="number" placeholder='ایمیل'
                                className='border-2 outline-none bg-slate-700 text-slate-100 px-3 py-2 rounded-md w-full border-slate-700 focus:border-blue-500'
                            />
                        </div>
                        <button
                            className='bg-custom-gold-100 w-full px-3 py-3 rounded-md font-bold text-slate-50 hover:bg-blue-600 '
                        >ارسال</button>
                    </form>
                </div>
                {/* form */}
            </div>
        </div>
    )
}
