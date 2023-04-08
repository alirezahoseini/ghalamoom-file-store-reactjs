import React, { useState } from 'react'
import { RiImageAddLine, RiImageEditLine } from 'react-icons/ri'

export default function ImageInput({ setValue }) {

    const [image, setImage] = useState('')

    // Create dataUrl
    const selectedFile = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();

        console.log(file.size)

        if(file.size > 1000000){
            alert('حداکثر فایل مجاز 1 مگابایت است')
        }else{
            try {
                reader.addEventListener('load', () => {
                    setValue(reader.result)
                    setImage(reader.result)
                })
        
                reader.readAsDataURL(file)
                
            } catch (error) {
                console.log(error)
            }
        }

    }



    return (
        <div id="global-image-input">
            <input type="file" id="productImage" onChange={event => selectedFile(event)} className='bg-text-1 hidden ' accept="image/*"/>
            {
                image === '' ? (
                    <label htmlFor="productImage" className='flex flex-col cursor-pointer text-text-1 text-lg items-center justify-center bg-gray-1 p-4 gap-3 rounded-2xl border-2 border-dashed border-gray-4'>
                        <RiImageAddLine className='text-2xl' />
                        <h4>افزودن تصویر</h4>
                    </label>
                ) : (
                    <div className='flex justify-evenly items-center'>
                        <label htmlFor="productImage" className='flex flex-col cursor-pointer text-text-1 text-sm items-center justify-center bg-gray-1 p-4 gap-3 rounded-2xl border-2 border-dashed border-gray-4 h-fit'>
                            <RiImageEditLine className='text-3xl' />
                            <h4>ویرایش تصویر</h4>
                        </label>
                        <div id="image-preview" className='w-6/12 bg-white shadow-both rounded-xl overflow-hidden flex items-center justify-center'>
                            <img src={image} alt='.' />
                        </div>
                    </div>
                )
            }

        </div>
    )
}
