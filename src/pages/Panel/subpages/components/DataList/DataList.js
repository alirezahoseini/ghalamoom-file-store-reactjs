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

// HOCs
import whithPaginate from '../../../components/HOCs/withPaginate/withPaginate'

// components
import ProductListItem from './ListItems/ProductListItem'
import ProductGridItem from './GridItems/ProductGridItem'
import CourseListItem from './ListItems/CourseListItem'
import CourseGridItem from './GridItems/CourseGridItem'
import ArtworkListItem from './ListItems/ArtworkListItem'
import ArtworkGridItem from './GridItems/ArtworkGridItem'
import Pagination from '../../../components/Pagination/Pagination'
import DataListHeader from './DataListHeader'


function DataList({ isList, title, type = 'product', paginatedItems, paginationCurrentPage, paginationSize, changePaginationHandler, totalPaginateItems }) {

  return (
    <div id='data-list'>
      <div className="wrraper w-full p-2 flex flex-col items-center text-xs">
        {paginatedItems.length === 0 ? (
          <h2 className='text-lg font-bold mt-10 text-slate-400 dark:text-slate-500 '>
            {title}
            <span> برای نمایش وجود ندارد</span>
          </h2>
        ) : (
          <>
            {isList && (
              /* Start Data list header  */
              <DataListHeader title={title} type={type} />
              /* End of Data list header  */
            )}
            {isList ? (
              // List Rendering 
              paginatedItems.map((item =>
              (
                type === 'product' ? (<ProductListItem key={item.id} {...item} type={type} />) :  
                (type === 'course' ? (<CourseListItem key={item.id} {...item} type={type} />) :
                  (<ArtworkListItem key={item.id} {...item} type={type} />)
                )  
                
              )))
            ) : (
              // Grid Rendering 
              <div className='flex flex-wrap w-full'>
                {paginatedItems.map((item =>
                (
                  type === 'product' ? (<ProductGridItem key={item.id} {...item} type={type} />)
                  : (type === 'course' ? (<CourseGridItem key={item.id} {...item} type={type} />)
                    : (<ArtworkGridItem key={item.id} {...item} type={type} />))
                )))}
              </div>
            )}
          </>
        )}
      </div>
      {
        // Pagination 
        paginationSize <= totalPaginateItems && (
          <Pagination totalItems={totalPaginateItems}
            currentPage={paginationCurrentPage}
            pageSize={paginationSize}
            setCurrentPage={changePaginationHandler} />
        )
      }
    </div >
  )
}

export default whithPaginate(DataList)