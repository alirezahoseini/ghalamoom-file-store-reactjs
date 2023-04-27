/************ This syntax requared to run Data list **********

-- calling Copmonent ==>  
<DataList 
    isList={isList}        ===> Boolean
    data={productsArray}   ===> Data array
    title="محصول"          ===> List title 
    type='product'         ===> To determine the links 
   />
    

-- sending this object for PRODUCTS in data array child ==> 

     {
        "id": 104,
        "created_at": 1682001809021,
        "title": "",
        "largeDes": "",
        "likes": 0,
        "fileSize": "10",
        "format": { "name":"بدون دسته", "id": "null" },
        "category": { "name":" فایل zip", "id": "zip" },
        "miniDes": "",
        "image": "data:image...",
        "downloadCount": 0,
        "saleCount": 0,
        "inStock": "true",
        "price": "10"
    } , ...

  ********************************/

import './DataList.css'

// components
import ProductListItem from './ListItems/ProductListItem'
import ProductGridItem from './GridItems/ProductGridItem'
import CourseListItem from './ListItems/CourseListItem'
import CourseGridItem from './GridItems/CourseGridItem'

export default function DataList({ isList, data = [], title, type = 'product' }) {

  return (
    <div id='data-list'>
      <div className="wrraper w-full p-2 flex flex-col items-center text-xs">
        {isList && (
          /* Start Data list header  */
          <div className='data-list-header flex items-center bg-white w-full rounded-xl px-4 py-4 text-slate-600 dark:bg-slate-700 dark:text-slate-400'>
            <div className='w-8/12 sm:w-5/12 flex items-center' >{title}</div>
            <div className='hidden sm:w-2/12 sm:flex' >{type === 'product' ? 'وضعیت' : 'سطح'}</div>
            <div className='hidden sm:w-2/12 sm:flex items-center' >قیمت</div>
            <div className='hidden md:w-2/12 md:flex' >{type === 'product' ? 'تعداد فروش' : 'تعداد دانشجو'}</div>
            <div className='w-4/12 sm:w-2/12 flex items-center justify-evenly' >سایر</div>
          </div>
          /* End of Data list header  */
        )}
        {isList ? (
          // List Rendering 
          data.map((item => (
            type === 'product' ? (<ProductListItem key={item.id} {...item} type={type} />) : (<CourseListItem key={item.id} {...item} type={type} />)
          )))
        ) : (
          // Grid Rendering 
          <div className='flex flex-wrap'>
            {data.map((item => (
              type === 'product' ? (<ProductGridItem key={item.id} {...item} type={type} />) : (<CourseGridItem key={item.id} {...item} type={type} />)
              
            )))}
          </div>
        )}
      </div>
    </div >
  )
}
