import React, { useState, useEffect } from 'react'

// hooks
import useAxiosGet from '../../../hooks/axios/useAxiosGet';
import withPaginate from '../../../components/HOCs/withPaginate/withPaginate';

// links
import { apiLinks } from '../../../data/links';

// components
import CategoryHeader from '../components/CategoryHeader/CategoryHeader';
import CarouselLoaderCard from '../../Home/components/Carousel/CarouselItems/components/CarouselLoaderCard/CarouselLoaderCard'
import LoadDataError from '../../Home/components/Carousel/CarouselItems/components/LoadDataError/LoadDataError';
import ListRender from '../components/ListRender/ListRender';


export default function Artworks() {
    const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl } = useAxiosGet();
    const [dataArray, setDataArray] = useState();
    const [loadDataIsFailed, setLoadDataIsFailed] = useState(false)

    useEffect(() => {
        // send request to api for get datas
        setAxiosGetUrl(`${apiLinks.artworks}?_sort=id&_order=desc`)
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
        <div className='category-products container mx-auto'>
            <div className="wrapper">
                {/* Page Header  */}
                <CategoryHeader type='artwork'
                    title='نمونه کارهای'
                    description="در این بخش نمونه کارهای من رو در زمنیه طراحی هویت بصری برند و صفحه آرایی مشاهده میکنین. خوشحال میشم نظرتونو در مورد هر کدوم در بخش کامنت ها با من در میون بذارین."
                />
                {/* End of Page Header  */}
                <div className='my-5'>
                    {/* Start loader card  */}
                    <div className='mt-20 px-5'>
                        {axiosGetIsPending && <CarouselLoaderCard />}
                        {loadDataIsFailed &&
                            <LoadDataError />}
                    </div>
                    {/* End of loader card  */}
                    <div className='flex items-center flex-wrap mb-10'>
                        {dataArray && axiosGetIsPending === false && (<ListRender data={dataArray} type="artwork" pageSize={6} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
