import { useEffect, useState } from 'react'

// datas 
import { apiLinks } from '../../../../data/links'

// hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet'

// components
import CategoriesHeader from "../components/CategoriesHeader/CategoriesHeader"
import DataList from '../components/DataList/DataList'
import SimpleDataLoader from '../../../../components/ui/SimpleDataLoader/SimpleDataLoader'

export default function PanelCourses() {
    const { axiosGetResult, axiosGetError, setAxiosGetUrl } = useAxiosGet();
    const [simpleDataLoaderStatus, setSimpleDataLoaderStatus] = useState('load')
    const [coursesArray, setCoursesArray] = useState([]);
    const dataObj = {
        data: coursesArray,
        title: "دوره",
        type: 'course',
        pageSize: 8
    }

    useEffect(() => {
        setAxiosGetUrl(`${apiLinks.courses}?_sort=id&_order=desc`)
    }, []);

    useEffect(() => {
        if (axiosGetResult !== null) {
            setCoursesArray(axiosGetResult)
            setSimpleDataLoaderStatus('hidde')
        } else if (axiosGetError !== null) {
            setSimpleDataLoaderStatus('error')
        }
    }, [axiosGetResult, axiosGetError]);

    const [isList, setIsList] = useState(true)
    return (

        <div id='courses'>
            <div className="wrapper px-2 my-3">
                <CategoriesHeader isList={isList} setIsList={setIsList} title="دوره" type='course' />
                {simpleDataLoaderStatus === 'hidde' && (
                    <DataList isList={isList} {...dataObj} />
                )}
                {simpleDataLoaderStatus !== 'hidde' && <SimpleDataLoader status={simpleDataLoaderStatus} />}
            </div>
        </div>
    )
}