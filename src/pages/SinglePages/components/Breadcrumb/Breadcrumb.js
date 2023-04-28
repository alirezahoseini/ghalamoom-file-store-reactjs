import { Link } from 'react-router-dom'
import { TbChevronLeft } from 'react-icons/tb'
import { memo } from 'react'

const Breadcrumb = memo(({ crumb }) => {
    return (
        <div className="breadcrumb">
            <ul className='flex font-bold text-xs text-slate-500 gap-2 my-2'>
                {crumb.map(item => (
                    item.path !== '#' ? (
                        <li key={item.id} className='hover:text-blue-500 flex items-center gap-1'>
                            <Link to={item.path}>
                                {item.name}
                            </Link>
                            <TbChevronLeft />
                        </li>

                    ) : (
                        <li key={item.id} className='text-slate-400'>
                            {item.name}
                        </li>
                    )
                ))}
            </ul>
        </div>
    )
})


export default Breadcrumb