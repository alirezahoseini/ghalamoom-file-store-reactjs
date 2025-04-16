import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TbUser, TbCalendarMinus } from 'react-icons/tb'
import './SingleArtwork.css'
import { v4 } from 'uuid'

// contexts
import { NotificationContext } from '../../../Contexts/Notifications/NotificationProvider'

// datas
import { apiLinks } from '../../../data/links';
import globalAuthToken from '../../../data/globalAuthToken';
import loaderSvg from '../../../assets/images/simple-loader.svg'

// hooks
import useAxiosGet from '../../../hooks/axios/useAxiosGet'

// components 
import SimpleDataLoader from '../../../components/ui/SimpleDataLoader/SimpleDataLoader'
import Title from '../components/Title/Title'
import SingleImage from '../components/SingleImage/SingleImage'
import Badge from '../../../components/ui/Badge/Badge'
import LikeCounterButton from '../../../components/ui/LikeCounterButton/LikeCounterButton'
import CommentsForm from '../components/CommentsForm/CommentsForm'
import SocialIcons from '../components/ShareBox/SocialIcons'
// import ImagesGallery from '../../Panel/components/ImagesGallery/ImagesGallery'
import Paragraph from '../components/Paragraph/Paragraph'
import NextAndPrevPostsButtons from '../components/NextAndPrevPostsButtons/NextAndPrevPostsButtons'

export default function SingleArtwork() {
    const notificationDispatch = useContext(NotificationContext)
    const { axiosGetResult, axiosGetError, setAxiosGetUrl, setAxiosGetToken } = useAxiosGet();
    const [artwork, setArtwork] = useState(null)
    const [simpleloadierStatus, setSimpleLoadierStatus] = useState('load');
    const [isLoadedData, setIsLoadedData] = useState(false);
    const [createdDate, setCreatedDate] = useState();
    const urlParams = useParams();
    //Paginate loader states
    /*
    Status : load , loading
    */
    const [paginateLoaderStatus, setPaginateLoaderStatus] = useState('load');

    // send request
    useEffect(() => {
        setAxiosGetUrl(`${apiLinks.artworks}/${urlParams.artworkId}`);
        setAxiosGetToken(globalAuthToken)
    }, [urlParams])
    // Result and error management
    useEffect(() => {
        if (axiosGetResult !== null) {
            // set data to state
            setArtwork(axiosGetResult);
        } else if (axiosGetError !== null) {
            if (axiosGetError.status === 404) {
                notificationDispatch({
                    type: 'ADD_NOTE',
                    payload: {
                        id: v4(),
                        message: `نمونه کاری با آیدی ${urlParams.productId} وجود ندارد `,
                        status: 'error'
                    }
                })
            }
            setSimpleLoadierStatus('error')
        }
    }, [axiosGetError, axiosGetResult])

    useEffect(() => {
        if (artwork !== null) {
            // created time
            accessTime();
            // Hide loader
            setSimpleLoadierStatus('hidde');
            setIsLoadedData(true);
            setPaginateLoaderStatus('load')
        }
    }, [artwork])

    const accessTime = () => {
        const now = new Date(artwork.createdAt);
        setCreatedDate(now.toLocaleDateString('fa-IR'))
    }

    return (
        <>
            <div id='single-artwork' className=' relative'>
                {/* Start paginate loader  */}
                {paginateLoaderStatus === 'loading' && (
                    <div className="paginate-loader w-full h-full bg-white fixed z-[100] top-0 right-0 bg-opacity-10 backdrop-blur-md flex items-center justify-center">
                        <div className='bg-white rounded-lg px-10 py-3 flex flex-col items-center justify-center gap-3 shadow-both-2'>
                            <img src={loaderSvg} className='w-[50px] block' alt="" />

                            <p className='font-sm'>
                                درحال بارگزاری...
                            </p>
                        </div>
                    </div>
                )}
                {/* End of paginate loader  */}

                {/* Main content  */}
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
                                                <LikeCounterButton type='ArtWork' {...artwork} />
                                                <Badge title="تاریخ اجرا:" icon={<TbCalendarMinus />} value={artwork.runTime} />
                                            </div>
                                            <div className='w-full lg:w-6/12'>
                                                <SocialIcons />
                                            </div>
                                        </div>
                                        {/* End of Share box  */}
                                        <div className="w-full">
                                            <NextAndPrevPostsButtons setLoading={setPaginateLoaderStatus} title={'نمونه کار'} type={'artwork'} itemId={artwork.id} />
                                        </div>
                                    </div>
                                    {/* End of Artwork body  */}
                                </div>
                                {/* Artwork gallery  */}
                                <div id="artwork-gallery" className='mt-8 px-3 lg:px-0'>
                                    <div className='w-36 h-1 bg-custom-gold-100 mt-8'></div>
                                    <Title title='تصاویر بیشتر' customClass={'text-right my-8'} />
                                    {/* <ImagesGallery images={artwork.gallery} /> */}
                                </div>
                                {/* End of Artwork gallery  */}
                                {/* Comments form */}
                                <div className='px-5'>
                                    <section className="bg-white p-8 rounded-3xl my-5 lg:mt-2">
                                        <CommentsForm  {...artwork} type={'ArtWork'} />
                                    </section>
                                </div>
                                {/* End of Comments form */}
                            </div>
                        </>
                    )}
                </div>
                {/* Main content  */}
            </div>
        </>
    )
}
