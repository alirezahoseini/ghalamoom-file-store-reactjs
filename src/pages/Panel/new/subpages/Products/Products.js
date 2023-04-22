import { useEffect, useState } from 'react'

// back up data for offline test
import {productsBackup} from '../../../../../data/productsBackupArray'

// datas 
import {apiLinks} from '../../../../../data/links'

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
  console.log(productsArray)
  useEffect(()=>{
    setAxiosGetUrl(apiLinks.products)
  },[]);

  useEffect(()=>{
    if(axiosGetResult !== null){
      setProductsArray(axiosGetResult)
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
