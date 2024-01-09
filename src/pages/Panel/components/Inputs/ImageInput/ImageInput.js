/************ This syntax requared to run image input **********

-- calling Copmonent ==>   <ImageInput defaultImage={formData.image} onChnageHandler={changeHandler} {...inputsData.image} />

-- sending this object ==> 

      image: {
      inputId: 'new-product-image'
    }

------ event output ====>  {image: 'dataurl image here}

  ********************************/


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCooki } from '../../../../../utils/cookis'
import { TbPhotoPlus, TbPhotoEdit } from 'react-icons/tb'
import Uploader from './Uploader'

export default function ImageInput({ name, defaultImage, onChnageHandler, inputId = 'null' }) {
    const [selectedImage, setSelectedImage] = useState('')
    const [uploadStart, setUploadStart] = useState(true);
    const [uploadPercent, setUploadPercent] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const userToken = getCooki('token')

    /// default selected image
    useEffect(() => { setSelectedImage(defaultImage) }, [])

    /// Upload to server handler
    const uploadHandler = (img) => {
        let fd = new FormData();
        fd.append("image", img);
        axios.post('https://ghalamoom.m0x61h0x64i.ir/uploads/image', fd, {
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            onUploadProgress: (progressEvent) => {
                setUploadStart(true);
                let { loaded, total } = progressEvent;
                setUploadPercent((loaded / total) * 100)
            }
        })
            .then(res => {
                onChnageHandler({id: name, value: res.data[0].image})
                setUploadStart(false)
                setUploadPercent(null)
            })
            .catch(err => {
                if(err.res){
                    console.log(err.res)
                }
                if(err.req){
                    console.log(err.req)
                }
                setUploadError(true)
            })

    }

    /// selected image file
    const selectedFile = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader();
        // max size check
        if (file && file.size > 4000000) {
            alert('حداکثر فایل مجاز 4 مگابایت است')
            return;
        } else {
            uploadHandler(event.target.files[0])
            try {
                reader.addEventListener('load', () => {
                    setSelectedImage(reader.result)
                })
                reader.readAsDataURL(file)
            } catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <div id="image-input" className='p-3 my-3 mt-5 xl:mt-3' >
            <input type="file" name={inputId} id={inputId} onChange={(event) => selectedFile(event)} className='bg-text-1 hidden' accept="image/png, image/gif, image/jpeg, image/webp" />
            {
                selectedImage === '' ? (
                    // / If not selected image show this
                    <label htmlFor={inputId} className='flex flex-col cursor-pointer items-center justify-center p-4 gap-3 rounded-2xl border-2 border-dashed xl:w-11/12 mx-auto border-slate-200 text-slate-500 dark:border-slate-700 font-yekan-bakh font-bold'>
                        <TbPhotoPlus className='text-3xl' />
                        <h4>افزودن تصویر</h4>
                        <span className='text-slate-400 dark:text-slate-600'>سایز مناسب 600*600</span>
                    </label>
                ) : (
                    /// If selected image show this
                    <div className='flex justify-around items-center relative'>
                        <label htmlFor={inputId} className='flex items-center justify-center cursor-pointer shadow-both-0 absolute -top-3 -left-3 bg-yellow-400 p-3 rounded-xl text-slate-700 hover:rotate-6'>
                            <TbPhotoEdit className='text-3xl' />
                        </label>
                        <div id="image-preview" className='w-full bg-white rounded-xl overflow-hidden flex items-center justify-center shadow-both-0 dark:bg-slate-800'>
                            <Uploader uploadStart={uploadStart} percent={uploadPercent} />
                            <img src={selectedImage} alt="" className='w-full ' />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

