import { useEffect, useState } from 'react'

// datas 
import { apiLinks } from '../../../../data/links'

// hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet'

// components
import CategoriesHeader from "../components/CategoriesHeader/CategoriesHeader"
import DataList from '../components/DataList/DataList'
import SimpleDataLoader from '../../../../components/ui/SimpleDataLoader/SimpleDataLoader'


export default function PanelArtworks() {
    const { axiosGetResult, axiosGetError, setAxiosGetUrl } = useAxiosGet();
    const [simpleDataLoaderStatus, setSimpleDataLoaderStatus] = useState('load')
    const [artworksArray, setArtworksArray] = useState([]);
    const dataObj = {
        data: artworksArray,
        title: "نمونه کار",
        type: 'artwork',
        pageSize: 8
    }

    useEffect(() => {
        setAxiosGetUrl(`${apiLinks.artworks}?_sort=id&_order=desc`)
    }, []);

    useEffect(() => {
        if (axiosGetResult !== null) {
            setArtworksArray(axiosGetResult)
            setSimpleDataLoaderStatus('hidde')
        } else if (axiosGetError !== null) {
            setSimpleDataLoaderStatus('error')
        }
    }, [axiosGetResult, axiosGetError]);

    const [isList, setIsList] = useState(true)
    return (

        <div id='courses'>
            <div className="wrapper px-2 my-3">
                <CategoriesHeader isList={isList} setIsList={setIsList} title="نمونه کار" type='artwork' />
                {simpleDataLoaderStatus === 'hidde' && (
                    <DataList isList={isList} {...dataObj} />
                )}
                {simpleDataLoaderStatus !== 'hidde' && <SimpleDataLoader status={simpleDataLoaderStatus} />}
            </div>
        </div>
    )
}