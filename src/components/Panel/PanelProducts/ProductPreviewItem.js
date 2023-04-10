import { HiOutlineTrash, HiPencil } from 'react-icons/hi'
import { TbCategory } from 'react-icons/tb'
import { BsHeart } from 'react-icons/bs'


export default function ProductPreviewItem({ id, image, title, category, like, onEdit, onRemove }) {
    return (
        <>
            <tr className='w-full flex justify-evenly text-right pt-3 my-4 gap-4 items-center border-t-2 border-gray-1'>
                {/* Id  */}
                <td className='w-1/12 lg:w-2/12 rounded-lg overflow-hidden flex justify-center' >
                    <span className='flex items-center justify-center w-fit pt-1 px-1 rounded-md lg:mr-2 bg-gray-1 text-xs lg:text-base font-bold text-gray-5 lg:px-2 lg:pt-2 lg:pb-1'>{id}</span>
                </td>
                {/* Image */}
                <td className='w-2/12 rounded-lg overflow-hidden ' >
                    <img src={image} alt="1" className='w-full' />
                </td>
                {/* Title */}

                <td className='w-6/12 text-text-1 font-bold overflow-x-hidden text-xs lg:text-base flex-col'>
                    <div>{title}</div>
                    <div className='flex items-center justify-start mt-3 gap-3' >
                        <div className='flex items-center justify-between py-1 px-2 bg-gray-1 bg-opacity-50 rounded-md text-xs gap-2 text-gray-4' >
                            <TbCategory className='text-sm' />
                            <span>{category}</span>
                        </div>
                        <div className='flex items-center justify-between py-1 px-2 bg-gray-1 bg-opacity-50 rounded-md text-xs gap-2 text-gray-4' >
                            <BsHeart />
                            <span>{like}</span>
                        </div>
                    </div>
                </td>
                {/* Actions */}
                <td className='w-3/12 flex items-center justify-evenly'>
                    <button className='md:text-xl p-2 rounded-lg bg-gray-1 hover:bg-red-1 text-secondary-2' onClick={() => onRemove(id)}>
                        <HiOutlineTrash />
                    </button>
                    <button className='md:text-xl p-2 rounded-lg bg-gray-1 hover:bg-blue-2 text-secondary-2' onClick={() => onEdit(id)}>
                        <HiPencil />
                    </button>
                </td>
                {/* End of Actions */}
            </tr>
        </>
    )
}
