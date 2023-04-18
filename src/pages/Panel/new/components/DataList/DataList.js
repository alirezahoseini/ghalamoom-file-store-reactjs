import './DataListItem.css'

import productImage0 from '../../../../../assets/images/products/1.jpg'
import productImage1 from '../../../../../assets/images/products/Clash.jpg'
import productImage2 from '../../../../../assets/images/products/DAKAR.jpg'
import productImage3 from '../../../../../assets/images/products/Enrique.jpg'
import productImage4 from '../../../../../assets/images/products/Kelium.jpg'
import productImage5 from '../../../../../assets/images/products/Magistic.jpg'

// components
import DataListItem from './DataListItem'
import DataGridItem from './DataGridItem'

export default function DataList({ isList, data = [], title , type = 'product'}) {


  return (
    <div id='data-list'>
      <div className="wrraper w-full p-2 flex flex-col items-center text-xs">
        {isList && (
          /* Start Data list header  */
          <div className='data-list-header flex items-center bg-white w-full rounded-xl px-4 py-4 text-slate-600 dark:bg-slate-700 dark:text-slate-400'>
            <div className='w-8/12 sm:w-5/12 flex items-center' >{title}</div>
            <div className='hidden sm:w-2/12 sm:flex' >وضعیت</div>
            <div className='hidden sm:w-2/12 sm:flex items-center' >قیمت</div>
            <div className='hidden md:w-2/12 md:flex' >تعداد فروش</div>
            <div className='w-4/12 sm:w-2/12 flex items-center justify-evenly' >سایر</div>
          </div>
          /* End of Data list header  */
        )}
        {isList ? (
          // List Rendering 
          data.map((item => (
            <DataListItem key={item.id} {...item} type={type} />
          )))
        ) : (
          // Grid Rendering 
          <div className='flex flex-wrap'>
            {data.map((item => (
              <DataGridItem key={item.id} {...item} type={type} />
            )))}
          </div>
        )}
      </div>
    </div >
  )
}
