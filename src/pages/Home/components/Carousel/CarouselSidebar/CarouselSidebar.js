import React from 'react'
import './CarouselSidebar.css'

// assets
import logo from '../../../../../assets/images/logos/ghalamoom-simple-logo.svg'

// components
import FirstTitle from '../../FirstTitle/FirstTitle'
import NormalParagraph from '../../NormalParagraph/NormalParagraph'
import MoreButton from '../../MoreButton/MoreButton'

export default function CarouselSidebar({ title, description, moreOptionsTitle }) {
    return (
        <div className="carousel-sidebar flex flex-col items-center lg:items-start relative p-3">
            <img src={logo} alt="logo" className='bg-logo w-20 lg:w-48 absolute top-1 z-0'  />
            <div className='z-10 w-full flex flex-col items-center lg:items-start'>
                <FirstTitle
                    title={title}
                    customClass={'items-center lg:items-start'} />
                <NormalParagraph
                    content={description}
                    customClass='text-center lg:text-right my-5'
                />
                <MoreButton
                    title={moreOptionsTitle}
                    customClass={'mx-auto lg:mx-0'}
                />
            </div>
        </div>
    )
}
