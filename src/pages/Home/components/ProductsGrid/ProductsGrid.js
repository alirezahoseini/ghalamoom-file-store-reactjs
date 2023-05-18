import React, { useState, useEffect } from 'react'
// hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet';

// components
import FirstTitle from '../FirstTitle/FirstTitle';
import NormalParagraph from '../NormalParagraph/NormalParagraph';
import ProductGridItem from './ProductGridItem/ProductGridItem';
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

    const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl, setAxiosGetToken } = useAxiosGet();
    const [dataArray, setDataArray] = useState([]);
    const [loadDataIsFailed, setLoadDataIsFailed] = useState(false)

    useEffect(() => {
        // send request to api for get datas
        setAxiosGetUrl(apiUrl)
    }, []);

    // 
    useEffect(() => {
        if (axiosGetResult !== null) {
            setDataArray(axiosGetResult);
            console.log(axiosGetResult)
        } else if (axiosGetError !== null) {
            console.log(axiosGetError)
            setLoadDataIsFailed(true)
        }
    }, [axiosGetResult, axiosGetError]);

    const loadMoreData = ()=>{

    }
    return (
        <div className='products-grid my-10'>
            <FirstTitle title={title} />
            <NormalParagraph content={desc} />
            <div className="wrapper flex flex-wrap pt-10">
                {dataArray && dataArray.map(item => (
                    <ProductGridItem key={item.id} {...item} type={type} />
                ))}
            </div>
            <button type='button' onClick={()=> loadMoreData()}>
                load more
            </button>
        </div>
    )
}
