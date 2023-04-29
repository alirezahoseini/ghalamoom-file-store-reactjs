
import telegramIcon from '../../../../assets/icons/telegram-3d-icon.webp'

export default function TelegramSupportBanner() {
  return (
    <div className='telegram-support-banner mt-8 md:mb-5'>
        <div className="wrapper bg-gradient-to-r from-blue-500 to-sky-400 rounded-2xl flex flex-col items-center px-3 pb-5 relative justify-end md:flex-row md:py-6 ">
            <div className="banner-image -mt-8 md:-mt-0 md:absolute md:-bottom-8 md:right-1 md:block">
                <img src={telegramIcon} alt="telegram icon" className='w-32 md:w-28'/>
            </div>
            <div className="banner-body flex flex-col md:flex-row items-center justify-between gap-4 w-full mt-2 md:mt-0 md:w-10/12">
                <h2 className='font-rokh text-white font-bold text-lg md:text-xl '>دسترسی آسان و سریع به پشتیبان دوره </h2>
                <a href='http://t.me/alir_ezahosseini' target='_blank' rel='noreferrer' className='text-white border-2 font-bold border-white px-7 py-2 rounded-xl hover:bg-white hover:text-blue-500 inline-block'>
                    پشتیبانی پکیج
                </a>
            </div>
        </div>
    </div>
  )
}
