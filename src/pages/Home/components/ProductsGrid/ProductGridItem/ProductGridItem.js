import React, { useState } from 'react'
import { TbCategory, TbDownload, TbPlus } from 'react-icons/tb'

// assets
import defaultImage from '../../../../../assets/images/panel/imageDefault.json'

// components
import Badge from '../../../../../components/ui/Badge/Badge';
import Title from '../../Title/Title'
import Paragraph from '../../Paragraph/Paragraph';
import LikeCounterButton from '../../../../../components/ui/LikeCounterButton/LikeCounterButton';
import PriceBadge from '../../../../../components/ui/PriceBadge/PriceBadge';
import { Link } from 'react-router-dom';

export default function ProductGridItem(props) {
    const {
        id,
        category,
        title,
        downloadCount,
        image,
        miniDes,
        price,
        customClass,
        type
    } = props;
    return (
        <div className={`product-grid-item w-full md:w-6/12 xl:w-4/12 flex p-3 my-5 ${customClass}`}>
            <div className="wrapper w-full border rounded-xl p-3 hover:bg-white hover:border-white transition-all duration-500 relative">
                {/* item header  */}
                <div className="product-grid-item_header flex items-start justify-between">
                    <picture className='w-36 rounded-lg -mt-14 shadow-both-0'>
                        <Link to={`/${type}s/${id}`} >
                            <img src={image ? image : defaultImage[0]} alt={title} className='w-full rounded-lg' />
                        </Link>
                    </picture>
                    <Badge title={category.name} customClass='bg-slate-200' icon={<TbCategory />} />
                </div>
                {/* end of item header  */}
                {/*  */}
                <div className="product-grid-item_body mt-6 flex flex-col gap-2 pb-16">
                    <Link to={`/${type}s/${id}`} >
                        <Title title={title} />
                    </Link>
                    <Paragraph content={miniDes} />
                    <div className="flex items-center gap-3 absolute bottom-3" style={{width: '94%'}}>
                        <LikeCounterButton {...props} />
                        <Badge title={downloadCount} icon={<TbDownload />} customClass='bg-slate-200' />
                        <div className="mr-auto flex items-center gap-3">
                            <PriceBadge price={price} />
                            <Link to={`/${type}s/${id}`} className='bg-blue-500 text-white text-2xl p-3 rounded-lg hover:bg-slate-500' >
                                <TbPlus />
                            </Link>
                        </div>
                    </div>
                </div>
                {/*  */}
            </div>
        </div>
    )
}
