import { useSwiper } from "swiper/react"
import {TbChevronLeft, TbChevronRight} from 'react-icons/tb'

export default function SwiperNavButtons() {
    const swiper = useSwiper()
    return (
        <div className="swiper-nav-btns flex gap-5 w-full">
            <button className="prev-slide-btn" onClick={() => swiper.slidePrev()}><TbChevronRight /></button>
            <button className="next-slide-btn" onClick={() => swiper.slideNext()}><TbChevronLeft /></button>
        </div>
    )
}
