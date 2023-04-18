import { TbCategory, TbPencil, TbEye } from 'react-icons/tb'
import { Link } from 'react-router-dom'

import tomanLogo from '../../../../../assets/icons/toman.svg'




export default function DataListItem({ title, category, inStock, salesCount, price, image, type, id }) {

    return (
        <div className="item-list-item bg-white my-2 p-2 rounded-xl w-full flex items-center dark:bg-slate-800">
            {/* Item info  */}
            <div className='w-8/12 sm:w-5/12 flex items-center' >
                {/* Item Image  */}
                <div className='w-fit rounded-lg overflow-hidden'>
                    <img src={image} alt="a and b" style={{ width: '56px', minWidth: '56px' }} />
                </div>
                {/* End of Item Image  */}
                {/* Start Item info  */}
                <div className='mr-2 flex flex-col gap-2'>
                    <h2 className='font-bold text-slate-800 dark:text-slate-200 overflow-hidden whitespace-nowrap text-ellipsis w-40 sm:w-fit'>{title}</h2>
                    <span className='text-slate-500 flex gap-1 items-center dark:text-slate-400'>
                        <TbCategory className='text-sm' />
                        <span>{category}</span>
                    </span>
                </div>
                {/* End of Item info  */}
            </div>
            {/* Item info  */}
            {/* Start Item Status */}
            <div className='hidden sm:w-2/12 sm:flex' >
                <span className={`item-stock-status px-2 py-1 rounded-md ${!inStock && 'not'}`}>{inStock ? 'موجود' : "ناموجود"}</span>
            </div>
            {/* End of Item Status */}
            {/* Item Price  */}
            <div className='hidden sm:w-2/12 sm:flex items-center' >
                <span className='text-xl font-bold font-yekan-bakh ml-2 text-slate-700 dark:text-slate-300'>{price}</span>
                <img src={tomanLogo} alt="toman" className='w-4' />
            </div>
            {/* End of Item Price  */}
            {/* Sales Count  */}
            <div className='hidden md:w-2/12 md:flex text-xl font-yekan-bakh font-bold justify-start text-slate-600 dark:text-slate-300' >{salesCount}</div>
            {/* End ofSales Count  */}
            {/* More */}
            <div className='w-4/12 sm:w-2/12 text-xl text-slate-700 flex items-center justify-evenly' >
                <Link to={`edite${type}/${id}`} className='p-2 rounded-full hover:bg-slate-100 transition-all duration-200 dark:text-slate-300 dark:hover:bg-slate-700'>
                    <TbPencil />
                </Link>
                <Link to={`/${type}s/${id}`} className='p-2 rounded-full hover:bg-slate-100 transition-all duration-200 dark:text-slate-300 dark:hover:bg-slate-700'>
                    <TbEye />
                </Link>
            </div>
            {/* End of More */}
        </div>
    )
}

