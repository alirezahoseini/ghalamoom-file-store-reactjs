import { memo, useEffect, useState } from 'react'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import { Link } from 'react-router-dom'
// hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet'
// datas
import { apiLinks } from '../../../../data/links'

const NextAndPrevPostsButtons = memo(({ title, type, itemId }) => {
    const { axiosGetResult, axiosGetError, setAxiosGetUrl } = useAxiosGet();
    const [currentItemId, setCurrentItemId] = useState(itemId)
    const [itemsArray, setItemsArray] = useState()
    const [nextItem, setNextItem] = useState()
    const [prevItem, setPrevItem] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const findPrevAndNextItems = () => {
        const currentIndex = itemsArray.findIndex(item => item.id === currentItemId);
        setNextItem(itemsArray[currentIndex + 1])
        setPrevItem(itemsArray[currentIndex - 1])
    }

    // send request to api
    useEffect(() => {
        const url = `${apiLinks[type + 's']}`;
        setAxiosGetUrl(url)
    }, []);

    // access to all items
    useEffect(() => {
        if (axiosGetResult !== null) {
            setItemsArray(axiosGetResult)
            setIsLoading(false)
        } else if (axiosGetError !== null) {
            console.log(axiosGetError)
            setIsLoading(false)
        }
    }, [axiosGetResult, axiosGetError])

    /// update item
    useEffect(() => {
        setCurrentItemId(itemId)
    })
    useEffect(() => {
        if (itemsArray) {
            findPrevAndNextItems();
        }
    }, [currentItemId, itemsArray])
    return (
        <div id='next-prev-buttons' className='flex items-center justify-between py-2 my-8 w-full gap-2 '>
            <div className={`prev-button ${isLoading ? 'w-6/12 h-20 loading' : ''}`}>
                {prevItem && (
                    <Link to={`/${type}s/${prevItem.id}`}>
                        <div className='flex items-center gap-2 hover:translate-x-1'>
                            <TbChevronRight className='text-3xl text-slate-400' />
                            <div className='flex flex-col items-start'>
                                <span className='text-xs text-slate-400'>
                                    {title + " قبلی"}
                                </span>
                                <span className='font-bold text-slate-800 text-xs md:text-base mt-1 lg:mt-0'>
                                    {prevItem.title}
                                </span>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
            <div className='h-10  bg-custom-gold-100 inline-block' style={{ width: '2px' }}> </div>
            <div className={`prev-button ${isLoading ? 'w-6/12 h-20 loading' : ''}`}>
                {nextItem && (
                    <Link to={`/${type}s/${nextItem.id}`}>
                        <div className='flex items-center gap-2 hover:-translate-x-1'>
                            <div className='flex flex-col items-end'>
                                <span className='text-xs text-slate-400'>
                                    {title + " بعدی"}
                                </span>
                                <span className='font-bold text-slate-800 text-xs md:text-base mt-1 lg:mt-0'>
                                    {nextItem.title}
                                </span>
                            </div>
                            <TbChevronLeft className='text-3xl text-slate-400' />
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
})

export default NextAndPrevPostsButtons
