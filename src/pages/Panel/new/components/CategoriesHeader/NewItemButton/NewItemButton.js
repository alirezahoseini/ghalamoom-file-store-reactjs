import { TbPlus } from 'react-icons/tb'
import { Link } from 'react-router-dom'

export default function NewItemButton({ title = 'محصول جدید', path }) {
    return (
        <Link to={path}>
            <button id='new-item-button' className='text-xs flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-fuchsia-600 text-white px-3 py-2 rounded-4xl shadow-both'>
                <span>{title}</span>
                <TbPlus className='text-sm mr-2' />
            </button>
        </Link>
    )
}
