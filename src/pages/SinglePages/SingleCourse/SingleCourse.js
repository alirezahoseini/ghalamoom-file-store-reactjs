import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TbDatabase, TbClockHour7, TbUserCheck, TbArrowMoveUp, TbHeadset, TbAlbum, TbBookDownload } from 'react-icons/tb'
//assetes
import authorImage from '../../../assets/images/panel/avatars/author.jpg'
// datas
import { apiLinks } from '../../../data/links'

// hooks
import useAxiosGet from '../../../hooks/axios/useAxiosGet'

// components 
import SimpleDataLoader from '../../../components/ui/SimpleDataLoader/SimpleDataLoader'
import Title from '../components/Title/Title'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import SingleImage from '../components/SingleImage/SingleImage'
import AddToCartBox from '../components/AddToCartBox/AddToCartBox'
import Badge from '../components/Badge/Badge'
import DateBadge from '../components/DateBadge/DateBadge'
import LikeCounterButton from '../components/LikeCounterButton/LikeCounterButton'
import SecondeTitle from '../components/SecondeTitle/SecondeTitle'
import CommentsForm from '../components/CommentsForm/CommentsForm'
import Accordion from '../../../components/ui/Accordion/Accordion'
import AuthorBox from '../components/AuthorBox/AuthorBox'
import ShareBox from '../components/ShareBox/ShareBox';
import TrustBadgesBox from '../components/TrustBadgesBox/TrustBadgesBox'
import TelegramSupportBanner from '../components/TelegramSupportBanner/TelegramSupportBanner'

export default function SingleCourse() {
    const { axiosGetResult, axiosGetError, setAxiosGetUrl } = useAxiosGet();
    const [course, setCourse] = useState(null)
    const [crumb, setCrumb] = useState([
        { id: 1, name: 'خانه', path: '/' },
        { id: 2, name: 'دوره ها', path: '/courses' },
    ]);
    const [simpleloadierStatus, setSimpleLoadierStatus] = useState('load');
    const [isLoadedData, setIsLoadedData] = useState(false)
    const urlParams = useParams()
    // send request
    useEffect(() => {
        setAxiosGetUrl(`${apiLinks.courses}/${urlParams.courseId}`)
    }, [])
    // Result and error management
    useEffect(() => {
        if (axiosGetResult !== null) {
            setCourse(axiosGetResult)
            console.log(axiosGetResult)
        } else if (axiosGetError !== null) {
            if (axiosGetError.status === 404) {
                alert(`دوره ای با آیدی ${urlParams.productId} وجود ندارد `)
            }
            setSimpleLoadierStatus('error')
        }
    }, [axiosGetError, axiosGetResult])

    useEffect(() => {
        if (course !== null) {
            setSimpleLoadierStatus('hidde')
            setIsLoadedData(true)
            setCrumb(prevCrumbs => [...prevCrumbs, { id: prevCrumbs.length + 1, name: course.title, path: '#' }])
        }
    }, [course])

    console.log(course)

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
                                            <p className='text-xs lg:text-sm font-semibold text-slate-500 my-4 ' style={{ lineHeight: '36px' }} >
                                                {course.miniDes}
                                            </p>
                                        </div>
                                        <div className="badges flex gap-2 flex-wrap items-center">
                                            <LikeCounterButton type='course' {...course} />
                                            <Badge title={course.time} icon={<TbClockHour7 />} value={' ساعت'} />
                                            <Badge title={"تعداد هنرجویان:"} icon={<TbUserCheck />} value={course.studentCount} />
                                            <Badge title={"سطح:"} icon={<TbArrowMoveUp />} value={course.level.name} />
                                            <Badge title={"پیش نیاز:"} icon={<TbAlbum />} value={course.prerequisite.name} />
                                            <Badge title={"روش دریافت:"} icon={<TbBookDownload />} value={course.wayReceive.name} />
                                            <Badge title={"پشتیبانی:"} icon={<TbHeadset />} value={course.support.name} />
                                            <Badge title='حجم فایل:' icon={<TbDatabase />} value={course.fileSize + ' مگابایت'} />
                                            <DateBadge date={course.created_at} />
                                        </div>
                                    </section>
                                    {/* End of First section --- Quick info */}
                                    {/* Seconde section --- Description */}
                                    <section className="bg-white p-8 rounded-3xl mb-4">
                                        <SecondeTitle title='توضیحات' />
                                        <p className='text-xs lg:text-sm font-semibold text-slate-500 my-4 ' style={{ lineHeight: '36px' }} >
                                            {course.largeDes}
                                        </p>
                                    </section>
                                    {/* End of Seconde section --- Description */}
                                    {/* Third section --- Description */}
                                    <section className="bg-white p-8 rounded-3xl mb-4">
                                        <SecondeTitle title='سرفصل های دوره' />
                                        <Accordion title={'سرفصل تست 1'} content={course.miniDes} />
                                        <Accordion title={'سرفصل تست 2'} content={course.largeDes} />
                                    </section>
                                    {/* End of Third section --- Description */}
                                    {/* Fourth section --- Description */}
                                    <section className="bg-white p-8 rounded-3xl mb-4">
                                        <SecondeTitle title='تصاویر بیشتر' />
                                        <div className='w-6/12 lg:w-4/12 mt-6'>
                                            <SingleImage image={course.image} alt={course.title} />
                                        </div>
                                    </section>
                                    {/* End of Fourth section --- Description */}
                                    {/* Fifth section --- Other elements */}
                                    <section className="rounded-3xl mb-4 flex flex-col gap-5">
                                        <TrustBadgesBox />
                                        <TelegramSupportBanner/>
                                    </section>
                                    {/* End of Fifth section --- Other elements */}
                                </div>
                                {/* End of content  */}
                                {/* Sidebar */}
                                <div className="sidebar w-full lg:w-4/12 lg:px-4 flex flex-col gap-5">
                                    <SingleImage image={course.image} alt={course.title} />
                                    <AuthorBox name={"مینا آقایی"} image={authorImage}/>
                                    <AddToCartBox {...course} />
                                    <ShareBox />
                                </div>
                                {/* End of sidebar */}
                            </div>
                            <div className='w-full lg:w-8/12 px-5'>
                                {/* Comments form */}
                                <section className="bg-white p-8 rounded-3xl my-5 lg:mt-2">
                                    <CommentsForm  {...course} type={'course'} />
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
