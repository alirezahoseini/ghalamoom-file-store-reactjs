import { HiOutlineTrash, HiPencil } from 'react-icons/hi'


export default function ProductPreviewItem({ id, image,  title, onEdit, onRemove  }) {
    return (
        <>
            <tr className='w-full flex justify-evenly text-right pt-3 my-4 gap-4 items-center border-t-2 border-gray-1'>
                <td className='w-1/12 lg:w-2/12 rounded-lg overflow-hidden flex justify-center' >
                    <span className='flex items-center justify-center w-fit pt-1 px-1 rounded-md lg:mr-2 bg-gray-1 text-xs lg:text-base font-bold text-gray-5 lg:px-2 lg:pt-2 lg:pb-1'>{id}</span>
                </td>
                <td className='w-2/12 rounded-lg overflow-hidden ' >
                    <img src={image} alt="1" className='w-full' />
                </td>
                <td className='w-6/12 text-text-1 font-bold overflow-x-hidden text-xs lg:text-base '>{title}</td>
                <td className='w-3/12 flex items-center justify-evenly'>
                    <button className='md:text-xl p-2 rounded-lg bg-gray-1 hover:bg-red-1 text-secondary-2' onClick={() => onRemove(id)}>
                        <HiOutlineTrash />
                    </button>
                    <button className='md:text-xl p-2 rounded-lg bg-gray-1 hover:bg-blue-2 text-secondary-2'  onClick={() => onEdit(id)}>
                        <HiPencil />
                    </button>
                </td>
            </tr>
        </>
    )
}
