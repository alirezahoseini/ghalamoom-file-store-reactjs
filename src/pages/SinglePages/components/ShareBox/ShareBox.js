import { TbBrandTelegram, TbBrandWhatsapp, TbBrandLinkedin, TbMail } from 'react-icons/tb'

export default function ShareBox() {
    return (
        <div className='share-box  w-full'>
            <div className="wrapper w-full bg-white p-4 rounded-2xl flex items-center justify-between gap-3">
                <h5 className='font-black text-3xl  flex flex-col text-slate-300 justify-center mt-2'>
                    <span>اشتراک</span>
                    <span>گــذاری</span>
                </h5>
                <div className="flex items-center gap-3 text-xl text-white mx-auto flex-wrap justify-center">
                    <div className="bg-custom-blue-700 p-3 rounded-full cursor-pointer hover:rotate-12 hover:scale-105">
                        <TbBrandTelegram />
                    </div>
                    <div className="bg-green-500 p-3 rounded-full cursor-pointer hover:rotate-12 hover:scale-105">
                        <TbBrandWhatsapp />
                    </div>
                    <div className="bg-custom-golbehi-100 p-3 rounded-full cursor-pointer hover:rotate-12 hover:scale-105">
                        <TbMail />
                    </div>
                    <div className="bg-blue-800 p-3 rounded-full cursor-pointer hover:rotate-12 hover:scale-105">
                        <TbBrandLinkedin />
                    </div>
                </div>
            </div>
        </div>
    )
}
