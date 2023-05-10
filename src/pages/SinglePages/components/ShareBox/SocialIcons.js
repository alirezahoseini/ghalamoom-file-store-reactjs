import React from 'react'
import { TbBrandTelegram, TbBrandWhatsapp, TbBrandLinkedin, TbMail } from 'react-icons/tb'


export default function SocialIcons() {
    return (
        <div className="social-icons flex items-center gap-3 text-xl text-white mx-auto flex-wrap justify-center">
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
    )
}
