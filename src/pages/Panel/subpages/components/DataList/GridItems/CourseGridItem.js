import { TbCategory, TbPencil, TbEye } from 'react-icons/tb'
import { Link } from 'react-router-dom'

// assets 
import tomanLogo from '../../../../../../assets/icons/toman.svg'

// assets
import defaultImage from '../../../../../../assets/images/panel/imageDefault.json'



export default function CourseGridItem({ title, category, studentCount, level, price, image, id, type }) {
    return (
        <div className='course-grid-item md:w-6/12 lg:w-4/12 xl:w-3/12 p-3'>
            <div className="wrapper bg-white p-3 rounded-4xl lg:rounded-3xl dark:bg-slate-800 ">
                {/* Item image  */}
                <div className="rounded-3xl overflow-hidden h-fit flex items-center justify-center bg-slate-300">
                    <img src={(image === '' ? defaultImage[0].toString() : image)} alt={title} className='w-full' style={{ minHeight: '150px' }} />
                </div>
                {/* End of Item image  */}
                <div className='p-3 flex flex-col gap-4'>
                    {/* Item info */}
                    <div className="mt-2">
                        <div className='flex flex-col gap-2 '>
                            <h2 className='font-bold text-slate-800 dark:text-slate-200 max-w-full break-words'>{title}</h2>
                        </div>
                    </div>
                    {/* End of Item info */}
                    <div className='flex items-center justify-between' >
                        {/* Category */}
                        <span className='text-slate-500 flex gap-1 items-center dark:text-slate-400'>
                            <TbCategory className='text-sm' />
                            <span>{category.name}</span>
                        </span>
                        {/* End of Category */}
                        {/*  */}
                        <span className='text-xs font-bold text-slate-600 dark:text-slate-400'>{level.name}</span>
                        {/*  */}
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        {/* Item Price  */}
                        <div className='flex items-center' >
                            <span className='text-xl font-bold font-yekan-bakh ml-2 text-slate-700 dark:text-slate-300'>{price}</span>
                            <img src={tomanLogo} alt="toman" className='w-4' />
                        </div>
                        {/* End of Item Price  */}
                        {/* Sales Count  */}
                        <div className='flex justify-start items-center gap-2 font-yekan-bakh text-slate-600 dark:text-slate-300' >
                            <span>دانشجو:</span>
                            <span className='text-xl  font-bold '>{studentCount}</span>
                        </div>
                        {/* End ofSales Count  */}
                    </div>
                    {/* Buttos */}
                    <div className='flex items-center justify-evenly'>
                        <Link to={`/panel/edit${type}/${id}`} className='w-5/12 flex items-center justify-center gap-1 rounded-2xl py-2 px-2 text-slate-700 bg-slate-50 font-bold hover:bg-yellow-300 transition-all duration-300 hover:shadow-both dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-yellow-300 dark:hover:text-slate-800'>
                            <TbPencil className='text-sm' />
                            <span>ویرایش</span>
                        </Link>
                        <Link to={`/${type}s/${id}`} className='w-5/12 flex items-center justify-center gap-1 rounded-2xl py-2 px-2 text-slate-700 bg-slate-50 font-bold hover:bg-violet-300 transition-all duration-300 hover:shadow-both dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-violet-300 dark:hover:text-slate-800' >
                            <TbEye className='text-sm' />
                            <span>نمایش</span>
                        </Link>
                    </div>
                    {/* End of Buttos */}
                </div>

            </div>
        </div>
    )
}
