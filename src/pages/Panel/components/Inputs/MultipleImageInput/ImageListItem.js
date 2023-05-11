import React, { useEffect, useState } from 'react'
import { TbTrash } from 'react-icons/tb';

export default function ImageListItem({ name, base64, onDeleteFunc, id, type }) {
    const [imageName, setImageName] = useState([])
    const [imageType, setImageType] = useState()
    useEffect(() => {
        let newImageName = name.split('.');
        setImageName(newImageName[0]);
        let newImageType = type.split('/');
        setImageType(newImageType[1]);
    }, [])

    const deleteButtonHandler = ()=>{
        onDeleteFunc(id)
    }
    return (
        <div className='image-list-item'>
            <div className="wrapper flex ltr bg-slate-50 p-2 rounded-xl my-2 items-center gap-2 dark:bg-slate-900">
                <div className="image-list__image rounded-md overflow-hidden">
                    <img src={base64} alt={name} style={{ width: '58px' }} />
                </div>
                <div className='image-list__body font-bold text-slate-600 w-8/12 flex items-center gap-2 dark:text-slate-100' >
                    <span className='overflow-hidden whitespace-nowrap text-ellipsis'>
                        {imageName}
                    </span>
                    <span className='bg-white text-green-500 font-bold uppercase p-1 pt-2 rounded-md text-xs dark:bg-slate-800'>
                        {imageType}
                    </span>
                </div>
                <div onClick={deleteButtonHandler} className="image-list__delete-button ml-auto text-lg  text-slate-500 p-2 rounded-lg cursor-pointer hover:bg-red-100 hover:text-red-600 transition-all duration-100 dark:text-slate-300 dark:hover:text-red-400 dark:hover:bg-red-600 dark:hover:bg-opacity-20">
                    <TbTrash className='transition-all duration-100' />
                </div>

            </div>
        </div>
    )
}
