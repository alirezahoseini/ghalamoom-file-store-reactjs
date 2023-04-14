import React from 'react'
import { RiImageAddLine, RiImageEditLine } from 'react-icons/ri'

export default function ImageInput({ imageValue, setNewImageValue , inputId = 'null' }) {

    /// selected image file
    const selectedFile = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader();
        // max size check
        if (file && file.size > 1000000) {
            alert('حداکثر فایل مجاز 500 کیلوبایت است')
        } else {
            try {
                reader.addEventListener('load', () => {
                    setNewImageValue(reader.result)
                })
                reader.readAsDataURL(file)
            } catch (error) {
                console.log(error)
            }
        }

    }
    return (
        <div id="image-input" >
            <input type="file" id={inputId} onChange={(event) => selectedFile(event)} className='bg-text-1 hidden ' accept="image/*" />
            {
                imageValue === '' ? (
                    // / If not selected image show this
                    <label htmlFor={inputId} className='flex flex-col cursor-pointer text-text-1 text-lg items-center justify-center bg-gray-1 p-4 gap-3 rounded-2xl border-2 border-dashed border-gray-4'>
                        <RiImageAddLine className='text-2xl' />
                        <h4>افزودن تصویر</h4>
                    </label>
                ) : (
                    /// If selected image show this
                    <div className='flex justify-around items-center'>
                        <label htmlFor={inputId} className='flex flex-col w-4/12  cursor-pointer text-text-1 text-xs p-2 text-center items-center justify-center bg-gray-1 lg:p-4 gap-3 rounded-2xl border-2 border-dashed border-gray-4 h-fit '>
                            <RiImageEditLine className='text-3xl' />
                            <h4>ویرایش تصویر</h4>
                        </label>
                        <div id="image-preview" className='w-6/12 bg-white shadow-both rounded-xl overflow-hidden flex items-center justify-center'>
                            <img src={imageValue} alt="" className='w-full ' />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

