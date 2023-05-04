import { useEffect, useState } from 'react'

// datas 
import { apiLinks } from '../../../../data/links'

// hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet'

// components
import CategoriesHeader from "../components/CategoriesHeader/CategoriesHeader"
import DataList from '../components/DataList/DataList'
import SimpleDataLoader from '../../../../components/ui/SimpleDataLoader/SimpleDataLoader'




export default function Products() {
  const { axiosGetResult, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  const [simpleDataLoaderStatus, setSimpleDataLoaderStatus] = useState('load')
  const [productsArray, setProductsArray] = useState([]);
  useEffect(() => {
    setAxiosGetUrl(apiLinks.products)
  }, []);


  useEffect(() => {
    if (axiosGetResult !== null) {
      setProductsArray(axiosGetResult)
      setSimpleDataLoaderStatus('hidde')
    } else if (axiosGetError !== null) {
      setSimpleDataLoaderStatus('error')
    }
  }, [axiosGetResult, axiosGetError]);

  const [isList, setIsList] = useState(true)
  return (

    <div id='products'>
      <div className="wrapper px-2 my-3">
        <CategoriesHeader isList={isList} setIsList={setIsList} title="محصول" type='product' />
        {simpleDataLoaderStatus === 'hidde' && (
          <DataList isList={isList} data={productsArray} title="محصول" type='product' />
        )}
        <SimpleDataLoader status={simpleDataLoaderStatus} />
      </div>
    </div>
  )
}
