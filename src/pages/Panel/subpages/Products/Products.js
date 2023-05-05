import { useEffect, useState } from 'react'

// datas 
import { apiLinks } from '../../../../data/links'

// hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet'

// components
import CategoriesHeader from "../components/CategoriesHeader/CategoriesHeader"
import DataList from '../components/DataList/DataList'
import SimpleDataLoader from '../../../../components/ui/SimpleDataLoader/SimpleDataLoader'

function Products() {
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  const [simpleDataLoaderStatus, setSimpleDataLoaderStatus] = useState('load')
  const [productsArray, setProductsArray] = useState([]);
  const [isList, setIsList] = useState(true)

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

  return (
    <div id='products'>
      <div className="wrapper px-2 my-3">
        <CategoriesHeader isList={isList} setIsList={setIsList} title="محصول" type='product' />
        {simpleDataLoaderStatus === 'hidde' && (
          <DataList isList={isList} data={productsArray} title="محصول" type='product' />
        )}
        { axiosGetIsPending && <SimpleDataLoader status={simpleDataLoaderStatus} /> }
      </div>
    </div>
  )
}


export default Products