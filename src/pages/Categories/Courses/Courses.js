import React, {useState, useEffect} from 'react'

// hooks
import useAxiosGet from '../../../hooks/axios/useAxiosGet';
import withPaginate from '../../../components/HOCs/withPaginate/withPaginate';

// links
import { apiLinks } from '../../../data/links';

// components
import CategoryHeader from '../components/CategoryHeader/CategoryHeader';

export default function Courses() {
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  const [dataArray, setDataArray] = useState();
  const [loadDataIsFailed, setLoadDataIsFailed] = useState(false)

  useEffect(() => {
    // send request to api for get datas
    setAxiosGetUrl(`${apiLinks.courses}?_sort=id&_order=desc`)
  }, []);

  // 
  useEffect(() => {
    if (axiosGetResult !== null) {
      setDataArray(axiosGetResult)
    } else if (axiosGetError !== null) {
      console.log(axiosGetError)
      setLoadDataIsFailed(true)
    }
  }, [axiosGetResult, axiosGetError])
  return (
    <div className='category-courses container mx-auto'>
      <div className="wrapper">
        <CategoryHeader type='course' />
      </div>
    </div>
  )
}
