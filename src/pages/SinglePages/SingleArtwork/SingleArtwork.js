import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TbUser, TbCalendarMinus } from 'react-icons/tb'
import './SingleArtwork.css'

// datas
import { apiLinks } from '../../../data/links'

// hooks
import useAxiosGet from '../../../hooks/axios/useAxiosGet'

// components 
import SimpleDataLoader from '../../../components/ui/SimpleDataLoader/SimpleDataLoader'
import Title from '../components/Title/Title'
import SingleImage from '../components/SingleImage/SingleImage'
import Badge from '../components/Badge/Badge'
import LikeCounterButton from '../components/LikeCounterButton/LikeCounterButton'
import CommentsForm from '../components/CommentsForm/CommentsForm'
import SocialIcons from '../components/ShareBox/SocialIcons'
import ImagesGallery from '../../Panel/components/ImagesGallery/ImagesGallery'
import Paragraph from '../components/Paragraph/Paragraph'
import NextAndPrevPostsButtons from '../components/NextAndPrevPostsButtons/NextAndPrevPostsButtons'

export default function SingleArtwork() {
    const { axiosGetResult, axiosGetError, setAxiosGetUrl } = useAxiosGet();
    const [artwork, setArtwork] = useState(null)
    const [simpleloadierStatus, setSimpleLoadierStatus] = useState('load');
    const [isLoadedData, setIsLoadedData] = useState(false);
    const [createdDate, setCreatedDate] = useState()
    const urlParams = useParams();
    // send request
    useEffect(() => {
        setAxiosGetUrl(`${apiLinks.artworks}/${urlParams.artworkId}`);
    }, [urlParams])
    // Result and error management
    useEffect(() => {
        if (axiosGetResult !== null) {
            // set data to state
            setArtwork(axiosGetResult);
            // created time
            accessTime(axiosGetResult.created_at)
        } else if (axiosGetError !== null) {
            if (axiosGetError.status === 404) {
                alert(`نمونه کاری با آیدی ${urlParams.artworkId} وجود ندارد `)
            }
            setSimpleLoadierStatus('error')
        }
    }, [axiosGetError, axiosGetResult])

    useEffect(() => {
        if (artwork !== null) {
            setSimpleLoadierStatus('hidde')
            setIsLoadedData(true)
        }
    }, [artwork])

    const accessTime = (time) => {
        const now = new Date();
        now.setTime(Number(time))
        setCreatedDate(now.toLocaleDateString('fa-IR'))
    }

    return (
        <>
            <div id='single-artwork'>
                <div className="container mx-auto">
                    {!isLoadedData && <SimpleDataLoader status={simpleloadierStatus} />}
                    {isLoadedData && (
                        <>
                            <div className="wrapper">
                                <div className="content flex flex-col lg:flex-row px-3 lg:px-7 py-4 gap-10">
                                    <div id="artwork-image" className='w-full lg:w-6/12 px-3 lg:px-0'>
                                        <SingleImage image={artwork.image} alt={artwork.title} />
                                    </div>
                                    {/* Artwork body  */}
                                    <div id="artwork-body" className='w-full lg:w-6/12 p-5'>
                                        <section>
                                            <Title title={artwork.title} />
                                            <div className='flex items-center gap-5 my-3 justify-center lg:justify-start'>
                                                <span className='flex items-center justify-start text-slate-500 gap-2'>
                                                    <TbCalendarMinus className='text-xl lg:text-2xl' />
                                                    <span className='mt-1 text-sm lg:text-base'>
                                                        {createdDate}
                                                    </span>
                                                </span>
                                                <span className='flex items-center justify-start text-slate-500 gap-2'>
                                                    <TbUser className='text-xl lg:text-2xl' />
                                                    <span className='mt-1 text-sm lg:text-base'>
                                                        مینا آقایی
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="w-28 h-1 bg-slate-200 rounded-xl my-5"></div>
                                            <Paragraph content={artwork.description} />
                                        </section>
                                        {/* Share box  */}
                                        <div className="share-box bg-white p-4 rounded-xl flex flex-col justify-center lg:flex-row gap-5 lg:gap-0">
                                            <div className='flex items-center justify-center gap-3 w-full lg:w-6/12'>
                                                <LikeCounterButton type='artwork' {...artwork} />
                                                <Badge title="تاریخ اجرا:" icon={<TbCalendarMinus />} value={artwork.runTime} />
                                            </div>
                                            <div className='w-full lg:w-6/12'>
                                                <SocialIcons />
                                            </div>
                                        </div>
                                        {/* End of Share box  */}
                                        <div className="w-full">
                                            <NextAndPrevPostsButtons title={'نمونه کار'} type={'artwork'} itemId={artwork.id} />
                                        </div>
                                    </div>
                                    {/* End of Artwork body  */}
                                </div>
                                {/* Artwork gallery  */}
                                <div id="artwork-gallery" className='mt-8 px-3 lg:px-0'>
                                    <div className='w-36 h-1 bg-custom-gold-100 mt-8'></div>
                                    <Title title='تصاویر بیشتر' customClass={'text-right my-8'} />
                                    <ImagesGallery images={artwork.gallery} />
                                </div>
                                {/* End of Artwork gallery  */}
                                {/* Comments form */}
                                <div className='px-5'>
                                    <section className="bg-white p-8 rounded-3xl my-5 lg:mt-2">
                                        <CommentsForm  {...artwork} type={'artwork'} />
                                    </section>
                                </div>
                                {/* End of Comments form */}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
