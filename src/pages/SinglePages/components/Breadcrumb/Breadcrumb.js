import { Link } from 'react-router-dom'
import { TbChevronLeft } from 'react-icons/tb'
import { memo } from 'react'
import './Breadcrumb.css'

const Breadcrumb = memo(({ crumb }) => {
    return (
        <div className="breadcrumb w-11/12 overflow-hidden whitespace-nowrap ">
            <ul className='flex font-bold text-xs text-slate-500 gap-2 my-2 max-w-full justify-center lg:justify-start'>
                {crumb.map(item => (
                    item.path !== '#' ? (
                        <li key={item.id} className='hover:text-blue-500 flex items-center gap-1'>
                            <Link to={item.path}>
                                {item.name}
                            </Link>
                            <TbChevronLeft />
                        </li>

                    ) : (
                        <li key={item.id} className='text-slate-400 truncate'>
                            {item.name}
                        </li>
                    )
                ))}
            </ul>
        </div>
    )
})


export default Breadcrumb