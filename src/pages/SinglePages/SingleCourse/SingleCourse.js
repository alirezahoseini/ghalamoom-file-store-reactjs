import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TbDatabase, TbClockHour7, TbUserCheck, TbArrowMoveUp, TbHeadset, TbAlbum, TbBookDownload } from 'react-icons/tb'
import { v4 } from 'uuid'

// contexts
import { NotificationContext } from '../../../Contexts/Notifications/NotificationProvider'

//assetes
import authorImage from '../../../assets/images/global/author.jpg'
// datas
import { apiLinks } from '../../../data/links'
import globalAuthToken from '../../../data/globalAuthToken'

// hooks
import useAxiosGet from '../../../hooks/axios/useAxiosGet'

// components 
import SimpleDataLoader from '../../../components/ui/SimpleDataLoader/SimpleDataLoader'
import Title from '../components/Title/Title'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import SingleImage from '../components/SingleImage/SingleImage'
import AddToCartBox from '../components/AddToCartBox/AddToCartBox'
import Badge from '../../../components/ui/Badge/Badge'
import DateBadge from '../components/DateBadge/DateBadge'
import LikeCounterButton from '../../../components/ui/LikeCounterButton/LikeCounterButton'
import SecondeTitle from '../components/SecondeTitle/SecondeTitle'
import CommentsForm from '../components/CommentsForm/CommentsForm'
import Accordion from '../../../components/ui/Accordion/Accordion'
import AuthorBox from '../components/AuthorBox/AuthorBox'
import ShareBox from '../components/ShareBox/ShareBox';
import Paragraph from '../components/Paragraph/Paragraph'
import TrustBadgesBox from '../components/TrustBadgesBox/TrustBadgesBox'
import TelegramSupportBanner from '../components/TelegramSupportBanner/TelegramSupportBanner'
// import ImagesGallery from '../../Panel/components/ImagesGallery/ImagesGallery'

export default function SingleCourse() {
    const notificationDispatch = useContext(NotificationContext)
    const { axiosGetResult, axiosGetError, setAxiosGetUrl, setAxiosGetToken } = useAxiosGet();
    const [course, setCourse] = useState(null)
    const [crumb, setCrumb] = useState([
        { id: 1, name: 'خانه', path: '/' },
        { id: 2, name: 'دوره ها', path: '/courses' },
    ]);
    const [simpleloadierStatus, setSimpleLoadierStatus] = useState('load');
    const [isLoadedData, setIsLoadedData] = useState(false)
    const urlParams = useParams();
    const [levelBadge, setLevelBadge] = useState();
    const [supportBadge, setSupportBadge] = useState();
    // send request to load course data
    useEffect(() => {
        setAxiosGetUrl(`${apiLinks.courses}/${urlParams.courseId}`);
        setAxiosGetToken(globalAuthToken);
    }, [])
    // Result and error management
    useEffect(() => {
        if (axiosGetResult !== null) {
            console.log(axiosGetResult)
            setCourse(axiosGetResult)
        } else if (axiosGetError !== null) {
            if (axiosGetError.status === 404) {
                notificationDispatch({
                    type: 'ADD_NOTE',
                    payload: {
                        id: v4(),
                        message: `دوره ای با آیدی ${urlParams.productId} وجود ندارد `,
                        status: 'error'
                    }
                })
            }
            setSimpleLoadierStatus('error')
        }
    }, [axiosGetError, axiosGetResult])

    useEffect(() => {
        if (course !== null) {
            setSimpleLoadierStatus('hidde');
            setIsLoadedData(true);
            setCrumb(prevCrumbs => [...prevCrumbs, { id: prevCrumbs.length + 1, name: course.title, path: '#' }]);
            setLevelBadge(prev => {
                let result = ''
                if (course.level === 'Advanced') {
                    result = 'پیشرفته'
                } else if (course.level === "Intermediate") {
                    result = 'متوسط'
                } else if (course.level === "Preliminary") {
                    result = 'مبتدی'
                }

                return result
            })
            setSupportBadge(prev => {
                let result = ''
                if (course.support === "TicketPhoneWhatsapp") {
                    result = 'تیکت + تلفنی + واتساپ'
                } else if (course.support === "Ticket") {
                    result = 'تیکت'
                } else if (course.support === "TickerPhone") {
                    result = 'تلفنی + تیکت'
                }

                return result
            })

        }
    }, [course])

    return (
        <>
            <div id='single-product'>
                <div className="container mx-auto">
                    {!isLoadedData && <SimpleDataLoader status={simpleloadierStatus} />}
                    {isLoadedData && (
                        <>
                            <div className="wrapper flex flex-col w-full px-5 gap-5 lg:flex-row">
                                {/* content  */}
                                <div className="content w-full lg:w-8/12 flex flex-col gap-3">
                                    <div className="mobile-image mb-4 lg:hidden">
                                        <SingleImage image={course.image} alt={course.title} />
                                    </div>
                                    {/* First section --- Quick info */}
                                    <section className="bg-white p-8 rounded-3xl mb-4">
                                        <div className='flex flex-col gap-3 items-center lg:items-start'>
                                            <Title title={course.title} />
                                            <Breadcrumb crumb={crumb} />
                                        </div>
                                        <div className="mini-description">
                                            <Paragraph content={course.shortDes} />
                                        </div>
                                        <div className="badges flex gap-2 flex-wrap items-center">
                                            <LikeCounterButton type='Course' {...course} />
                                            <Badge title={course.duration} icon={<TbClockHour7 />} value={' ساعت'} />
                                            <Badge title={"تعداد هنرجویان:"} icon={<TbUserCheck />} value={course.studentCount + Math.floor(Math.random() * 100)} />
                                            <Badge title={"سطح:"} icon={<TbArrowMoveUp />} value={levelBadge} />
                                            <Badge title={"پیش نیاز:"} icon={<TbAlbum />} value={course.prerequisite} />
                                            <Badge title={"روش دریافت:"} icon={<TbBookDownload />} value={course.wayRecive} />
                                            <Badge title={"پشتیبانی:"} icon={<TbHeadset />} value={supportBadge} />
                                            <DateBadge date={course.createdAt} />
                                        </div>
                                    </section>
                                    {/* End of First section --- Quick info */}
                                    {/* Seconde section --- Description */}
                                    <section className="bg-white p-8 rounded-3xl mb-4">
                                        <SecondeTitle title='توضیحات' />
                                        <Paragraph content={course.longDes} />
                                    </section>
                                    {/* End of Seconde section --- Description */}
                                    {/* Third section --- Description */}
                                    <section className="bg-white p-8 rounded-3xl mb-4">
                                        <SecondeTitle title='سرفصل های دوره' />
                                        <Accordion title={'سرفصل تست 1'} content={course.shortDes} />
                                        <Accordion title={'سرفصل تست 2'} content={course.longDes} />
                                    </section>
                                    {/* End of Third section --- Description */}
                                    {/* Fourth section --- Description */}
                                    <section className="bg-white p-3 rounded-3xl mb-4">
                                        <SecondeTitle title='تصاویر بیشتر' />
                                        <div className='w-full'>
                                            {/* <ImagesGallery images={course.gallery} imagePadding={'p-3 lg:p-4'} /> */}
                                        </div>
                                    </section>
                                    {/* End of Fourth section --- Description */}
                                    {/* Fifth section --- Other elements */}
                                    <section className="rounded-3xl mb-4 flex flex-col gap-5">
                                        <TrustBadgesBox />
                                        <TelegramSupportBanner />
                                    </section>
                                    {/* End of Fifth section --- Other elements */}
                                </div>
                                {/* End of content  */}
                                {/* Sidebar */}
                                <div className="sidebar w-full lg:w-4/12 lg:px-4 flex flex-col gap-5">
                                    <SingleImage image={course.image} alt={course.title} />
                                    <AuthorBox name={"مینا آقایی"} image={authorImage} />
                                    <AddToCartBox {...course} type='Course' />
                                    <ShareBox />
                                </div>
                                {/* End of sidebar */}
                            </div>
                            <div className='w-full lg:w-8/12 px-5'>
                                {/* Comments form */}
                                <section className="bg-white p-8 rounded-3xl my-5 lg:mt-2">
                                    <CommentsForm  {...course} type={'Course'} />
                                </section>
                                {/* End of Comments form */}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
