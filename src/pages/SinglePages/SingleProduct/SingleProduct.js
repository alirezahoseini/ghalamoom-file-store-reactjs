import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TbFile, TbDatabase } from 'react-icons/tb'

// datas
import { apiLinks } from '../../../data/links'

// hooks
import useAxiosGet from '../../../hooks/axios/useAxiosGet'

// components 
import SimpleDataLoader from '../../../components/ui/SimpleDataLoader/SimpleDataLoader'
import Title from '../components/Title/Title'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import SingleImage from '../components/SingleImage/SingleImage'
import AddToCartBox from '../components/AddToCartBox/AddToCartBox'
import Badge from '../components/Badge/Badge'
import DateBadge from '../components/DateBadge/DateBadge'
import LikeCounterButton from '../components/LikeCounterButton/LikeCounterButton'
import SecondeTitle from '../components/SecondeTitle/SecondeTitle'
import CommentsForm from '../components/CommentsForm/CommentsForm'
import ShareBox from '../components/ShareBox/ShareBox'

export default function SingleProduct() {
  const { axiosGetResult, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  const [product, setProduct] = useState(null)
  const [crumb, setCrumb] = useState([
    { id: 1, name: 'خانه', path: '/' },
    { id: 2, name: 'محصولات', path: '/products' },
  ]);
  const [simpleloadierStatus, setSimpleLoadierStatus] = useState('load');
  const [isLoadedData, setIsLoadedData] = useState(false)
  const urlParams = useParams()
  // send request
  useEffect(() => {
    setAxiosGetUrl(`${apiLinks.products}/${urlParams.productId}`)
  }, [])
  // Result and error management
  useEffect(() => {
    if (axiosGetResult !== null) {
      setProduct(axiosGetResult)
    } else if (axiosGetError !== null) {
      if (axiosGetError.status === 404) {
        alert(`محصولی با آیدی ${urlParams.productId} وجود ندارد `)
      }
      setSimpleLoadierStatus('error')
    }
  }, [axiosGetError, axiosGetResult])

  useEffect(() => {
    if (product !== null) {
      setSimpleLoadierStatus('hidde')
      setIsLoadedData(true)
      setCrumb(prevCrumbs => [...prevCrumbs, { id: prevCrumbs.length + 1, name: product.title, path: '#' }])
    }
  }, [product])

  return (
    <>
      <div id='single-product'>
        <div className="container mx-auto">
          {!isLoadedData && <SimpleDataLoader status={simpleloadierStatus} />}
          {isLoadedData && (
            <>
              <div className="wrapper flex flex-col w-full px-5 gap-5 lg:flex-row">
                {/* content  */}
                <div className="content w-full lg:w-8/12 flex flex-col gap-3">
                  <div className="mobile-image mb-4 lg:hidden">
                    <SingleImage image={product.image} alt={product.title} />
                  </div>
                  {/* First section --- Quick info */}
                  <section className="bg-white p-8 rounded-3xl mb-4">
                    <div className='flex flex-col gap-3 items-center lg:items-start'>
                      <Title title={product.title} />
                      <Breadcrumb crumb={crumb} />
                    </div>
                    <div className="mini-description">
                      <p className='text-xs lg:text-sm font-semibold text-slate-500 my-4 ' style={{ lineHeight: '36px' }} >
                        {product.miniDes}
                      </p>
                    </div>
                    <div className="badges flex gap-2 flex-wrap items-center">
                      <LikeCounterButton type='product' {...product} />
                      <Badge title='حجم فایل:' icon={<TbDatabase />} value={product.fileSize + ' مگابایت'} />
                      <Badge title='فرمت فایل (ها) :' icon={<TbFile />} value={product.format.name} />
                      <DateBadge date={product.created_at} />
                    </div>
                  </section>
                  {/* End of First section --- Quick info */}
                  {/* Seconde section --- Description */}
                  <section className="bg-white p-8 rounded-3xl mb-4">
                    <SecondeTitle title='توضیحات' />
                    <p className='text-xs lg:text-sm font-semibold text-slate-500 my-4 ' style={{ lineHeight: '36px' }} >
                      {product.largeDes}
                    </p>
                  </section>
                  {/* End of Seconde section --- Description */}
                  {/* Third section --- Description */}
                  <section className="bg-white p-8 rounded-3xl mb-4">
                    <SecondeTitle title='تصاویر بیشتر' />
                    <div className='w-6/12 lg:w-4/12 mt-6'>
                      <SingleImage image={product.image} alt={product.title} />
                    </div>
                  </section>
                  {/* End of Third section --- Description */}
                </div>
                {/* End of content  */}
                {/* Sidebar */}
                <div className="sidebar w-full lg:w-4/12 lg:px-4 flex flex-col gap-5">
                  <SingleImage image={product.image} alt={product.title} />
                  <AddToCartBox {...product} />
                  <ShareBox />
                </div>
                {/* End of sidebar */}
              </div>
              <div className='w-full lg:w-8/12 px-5'>
                {/* Comments form */}
                <section className="bg-white p-8 rounded-3xl my-5 lg:mt-2">
                  <CommentsForm  {...product} type={'product'} />
                </section>
                {/* End of Comments form */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
