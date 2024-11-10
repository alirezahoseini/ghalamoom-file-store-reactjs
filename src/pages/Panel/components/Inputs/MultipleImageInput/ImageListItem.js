import { TbTrash } from 'react-icons/tb';
export default function ImageListItem({ image, onDeleteFunc }) {
    const imageId = image.split('_')[1].split('.')[0];
    return (
        <div className="w-1/2  inline-flex p-2 ">
            <div onClick={() => onDeleteFunc(imageId)} className='rounded-md overflow-hidden bg-white dark:bg-slate-700 relative '>
                <TbTrash  className='w-9 h-9 bg-slate-100 text-slate-600 p-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white absolute top-0 right-0 dark:bg-slate-600 dark:text-slate-200' title='حذف تصویر از گالری'/>
                <img className='w-full h-full bg-slate-100' width={150} height={150} src={image} alt="" />
            </div>
        </div>
    )
}
