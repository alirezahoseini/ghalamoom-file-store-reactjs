import { useEffect, useState } from 'react'

// datas 
import { apiLinks } from '../../../../data/links'

// hooks
import useAxiosGet from '../../../../hooks/axios/useAxiosGet'

// components
import CategoriesHeader from "../components/CategoriesHeader/CategoriesHeader"
import DataList from '../components/DataList/DataList'
import SimpleDataLoader from '../../../../components/ui/SimpleDataLoader/SimpleDataLoader'

function PanelProducts() {
  const { axiosGetResult, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  const [simpleDataLoaderStatus, setSimpleDataLoaderStatus] = useState('load')
  const [productsArray, setProductsArray] = useState([]);
  const [isList, setIsList] = useState(true);
  const [mm, setMm] = useState(null)
  const dataObj = {
    data: productsArray,
    title: "محصول",
    type: 'product',
    pageSize: 8
  }
  useEffect(() => {
    setAxiosGetUrl(`${apiLinks.products}?_sort=id&_order=desc`)
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
          <DataList isList={isList} {...dataObj} />
        )}
        {simpleDataLoaderStatus !== 'hidde' && <SimpleDataLoader status={simpleDataLoaderStatus} />}


      </div>
    </div>
  )
}


export default PanelProducts