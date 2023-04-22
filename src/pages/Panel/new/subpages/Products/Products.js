import { useEffect, useState } from 'react'

// back up data for offline test
import {productsBackup} from '../../../../../data/productsBackupArray'

// hooks
import useAxiosGet from '../../../../../hooks/axios/useAxiosGet'

// components
import CategoriesHeader from "../../components/CategoriesHeader/CategoriesHeader"
import DataList from '../../components/DataList/DataList'
import SimpleDataLoader from '../../../../../components/ui/SimpleDataLoader/SimpleDataLoader'




export default function Products() {
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl, setAxiosGetToken } = useAxiosGet();
  const [simpleDataLoaderStatus, setSimpleDataLoaderStatus] = useState('load')
  const [productsArray, setProductsArray] = useState([]);

  useEffect(()=>{
    setAxiosGetUrl('https://x8ki-letl-twmt.n7.xano.io/api:hq-tx9uX/products')
  },[]);

  useEffect(()=>{
    if(axiosGetResult !== null){
      setProductsArray(axiosGetResult)
      console.log(axiosGetResult)
      setSimpleDataLoaderStatus('hidde')
    }else if(axiosGetError !== null){
      setSimpleDataLoaderStatus('error')
    }
  },[axiosGetResult, axiosGetError]);

  const [isList, setIsList] = useState(true)
  return (

    <div id='products'>
      <div className="wrapper px-2 my-3">
                <CategoriesHeader isList={isList} setIsList={setIsList} title="محصول" type='product'  />
                {productsArray.length > 0 && (
                  <DataList isList={isList} data={productsArray} title="محصول" type='product' />
                )}
              <SimpleDataLoader status={simpleDataLoaderStatus}/>
            </div>
    </div>
  )
}
