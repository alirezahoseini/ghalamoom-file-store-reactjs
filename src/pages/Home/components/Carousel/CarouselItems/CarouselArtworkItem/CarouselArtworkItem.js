import React from 'react'
import { Link } from 'react-router-dom';

// accets
import defaultImage from '../../../../../../assets/images/panel/imageDefault.json'

// components
import Title from '../../../Title/Title';
import Paragraph from '../../../Paragraph/Paragraph';
import Badge from '../../../../../../components/ui/Badge/Badge'
import LikeCounterButton from '../../../../../../components/ui/LikeCounterButton/LikeCounterButton'


export default function CarouselArtworkItem(props) {
    const {
        image,
        title,
        runTime,
        description,
        _id,
        type
    } = props
    return (
        <div className={`carousel-artwork-item pt-20 px-3`}>
            <div className="wrapper bg-white rounded-xl relative">
                <Link to={`/${type}s/${_id}`} className='w-full'>
                    <img src={image ? image : defaultImage[0]} alt={title} className='mx-auto rounded-xl relative -top-10 shadow-both-2' style={{ width: '93%' }} />
                </Link>
                <div className="flex flex-col px-5 -mt-4">
                    <Link to={`/${type}s/${_id}`}>
                        <Title title={title} />
                    </Link>
                    <Paragraph content={description} maxLength={120} />
                    <div className='flex items-center gap-3 justify-start mt-6 mb-3 w-full'>
                        <LikeCounterButton {...props} type={type} />
                        <Badge title={runTime} />
                    </div>
                </div>
            </div>
        </div>
    )
}
