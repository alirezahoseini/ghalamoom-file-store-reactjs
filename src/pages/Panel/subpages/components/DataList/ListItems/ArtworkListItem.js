import { TbPencil, TbEye } from 'react-icons/tb'
import { Link } from 'react-router-dom'

// assets 
import defaultImage from '../../../../../../assets/images/panel/imageDefault.json'

export default function ArtworkListItem({ title, image, type, id, runTime, likes }) {
    return (
        <div className="product-list-item bg-white my-2 p-2 rounded-xl w-full flex items-center dark:bg-slate-800">
            {/* Item info  */}
            <div className='w-8/12 xl:w-5/12 flex items-center' >
                {/* Item Image  */}
                <div className='w-fit rounded-lg overflow-hidden'>
                    <img src={(image === '' ? defaultImage[0].toString() : image)} alt="a and b" style={{ width: '56px', minWidth: '56px' }} />
                </div>
                {/* End of Item Image  */}
                {/* Start Item info  */}
                <div className='mr-2 flex flex-col gap-2'>
                    <h2 className='font-bold text-slate-800 dark:text-slate-200 overflow-hidden whitespace-nowrap text-ellipsis w-40 sm:w-fit'>{title}</h2>
                </div>
                {/* End of Item info  */}
            </div>
            {/* run time */}
            <div className='hidden xl:w-4/12 xl:flex flex-col gap-2'>
                <h2 className='font-bold text-slate-800 dark:text-slate-200 overflow-hidden whitespace-nowrap text-ellipsis w-40 sm:w-fit'>{runTime}</h2>
            </div>
            {/* End of run time */}
            {/* likes */}
            <div className='hidden w-3/12 md:flex flex-col gap-2 xl:w-1/12'>
                <h2 className='font-bold text-slate-800 dark:text-slate-200 overflow-hidden whitespace-nowrap text-ellipsis w-40 sm:w-fit'>{likes}</h2>
            </div>
            {/* End of likes */}
            {/* Item info  */}
            {/* More */}
            <div className='w-4/12 md:w-4/12 xl:w-2/12 text-xl text-slate-700 flex items-center justify-evenly' >
                <Link to={`/panel/edit${type}/${id}`} className='p-2 rounded-full hover:bg-slate-100 transition-all duration-200 dark:text-slate-300 dark:hover:bg-slate-700'>
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

