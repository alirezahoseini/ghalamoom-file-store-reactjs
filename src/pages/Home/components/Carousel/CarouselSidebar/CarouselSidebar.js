import React from 'react'
import './CarouselSidebar.css'

// assets
import logo from '../../../../../assets/images/logos/ghalamoom-simple-logo.svg'

// components
import FirstTitle from '../../FirstTitle/FirstTitle'
import NormalParagraph from '../../NormalParagraph/NormalParagraph'
import MoreButton from '../../MoreButton/MoreButton'

export default function CarouselSidebar({ title, description, moreOptionsTitle, isSidebar, type }) {
    return (
        <div className={`carousel-sidebar flex p-3`}>
            {isSidebar && <img src={logo} alt="logo" className='bg-logo w-20 lg:w-48 absolute top-5 right-1/3 lg:right-3 z-0' />}
            <div className={`z-10 w-full flex items-center lg:items-start
            ${isSidebar ? 'flex-col ' : 'flex-row justify-between'}
            `}>
                <div className={`flex flex-col ${isSidebar ? 'justify-between items-center ' : 'flex-col w-full xl:w-fit items-center xl:items-start'}`}>
                    <FirstTitle
                        title={title}
                        customClass={'items-center lg:items-start '} />
                    <NormalParagraph
                        content={description}
                        customClass={`text-center  my-5 w-full break-word ${isSidebar ? 'lg:text-right' : 'xl:text-right'}`}
                    />

                    <MoreButton
                        title={moreOptionsTitle}
                        customClass={`mx-auto lg:mx-0 ${isSidebar ? 'flex' : 'xl:hidden'}`}
                        path={`/${type}s`}
                    />
                </div>
                {!isSidebar && <MoreButton
                    title={moreOptionsTitle}
                    customClass={'mx-auto lg:mx-0 hidden xl:flex'}
                    path={`/${type}`}
                />}
            </div>
        </div>
    )
}
