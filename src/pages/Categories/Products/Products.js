import React, { useState, useEffect } from 'react'

// hooks
import useAxiosGet from '../../../hooks/axios/useAxiosGet';
import withPaginate from '../../../components/HOCs/withPaginate/withPaginate';

// links
import { apiLinks } from '../../../data/links';

// components
import CategoryHeader from '../components/CategoryHeader/CategoryHeader';
import ProductGridLoader from '../../Home/components/ProductsGrid/ProductGridLoader/ProductGridLoader';
import LoadDataError from '../../Home/components/Carousel/CarouselItems/components/LoadDataError/LoadDataError';
import ListRender from '../components/ListRender/ListRender';


export default function Products() {
    const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl } = useAxiosGet();
    const [dataArray, setDataArray] = useState();
    const [loadDataIsFailed, setLoadDataIsFailed] = useState(false)

    useEffect(() => {
        // send request to api for get datas
        setAxiosGetUrl(`${apiLinks.products}?_sort=id&_order=desc`)
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
                <CategoryHeader type='product'
                    title='فروشگاه فایل'
                    description="اینجا براتون فایل های طراحی گرافیک رو قرار میدم که کلی میتونن تو کارهاتون به کمکتون بیان. حتما ازشون استفاده کنین و همیشه به این بخش سر بزنین تا فایل های جدید رو از دست ندین"
                />
                {/* End of Page Header  */}
                <div className='my-5'>
                    {/* Start loader card  */}
                    <div className='mt-20 px-5'>
                        {axiosGetIsPending && <ProductGridLoader />}
                        {loadDataIsFailed &&
                            <LoadDataError />}
                    </div>
                    {/* End of loader card  */}
                    <div className='flex flex-wrap mb-10'>
                        {dataArray && axiosGetIsPending === false && (<ListRender data={dataArray} type='product' pageSize={6} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
