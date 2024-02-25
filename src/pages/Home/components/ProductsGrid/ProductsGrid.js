import React, { useState, useEffect } from 'react'
import { TbSquareRoundedChevronLeft } from 'react-icons/tb';
import { Link } from 'react-router-dom';
// hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet';

// components
import FirstTitle from '../FirstTitle/FirstTitle';
import NormalParagraph from '../NormalParagraph/NormalParagraph';
import ProductGridItem from './ProductGridItem/ProductGridItem';
import ProductGridLoader from './ProductGridLoader/ProductGridLoader';
import LoadDataError from '../Carousel/CarouselItems/components/LoadDataError/LoadDataError';

export default function ProductsGrid(props) {
    const {
        id,
        title,
        desc,
        customClass = '',
        moreOptionsTitle = '',
        apiUrl,
        limit = 6,
        type
    } = props;

    const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl } = useAxiosGet();
    const [dataArray, setDataArray] = useState([]);
    const [loadDataIsFailed, setLoadDataIsFailed] = useState(false);

    useEffect(() => {
        // send request to api for get datas
        setAxiosGetUrl(`${apiUrl}?_sort=id&_order=desc`)
    }, []);

    // 
    useEffect(() => {
        if (axiosGetResult !== null) {
            setDataArray(axiosGetResult)
        } else if (axiosGetError !== null) {
            console.log(axiosGetError)
            setLoadDataIsFailed(true)
        }
    }, [axiosGetResult, axiosGetError]);


    return (
        <div className='products-grid my-10'>
            <div className='flex flex-col items-center lg:items-start p-5 lg:px-0 text-center lg:text-right'>
                <FirstTitle title={title} />
                <NormalParagraph content={desc} />
            </div>
            <div className="wrapper flex flex-wrap pt-10">
                {dataArray && dataArray.slice(0,limit).map(item => (
                    <ProductGridItem key={item.id} {...item} type={type} />
                ))}
            </div>

            {/* Start loader card  */}
            {axiosGetIsPending && (
                <div className=' w-full p-5'>
                    <ProductGridLoader />
                </div>
            )}
            {loadDataIsFailed &&
                <LoadDataError />}
            {/* End of loader card  */}
            <button type='button'
                className='bg-custom-gold-100 px-4 py-3 rounded-2xl font-bold text-slate-700 hover:bg-slate-300 text-sm lg:text-base flex mx-auto my-3'>
                <Link to={`${type}s`} className='flex items-center gap-2'>
                    {moreOptionsTitle}
                    <TbSquareRoundedChevronLeft className='text-xl' />
                </Link>
            </button>
        </div>
    )
}
