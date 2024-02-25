import React from 'react'
import { TbPhotoX } from 'react-icons/tb'

export default function ImagesGallery({ images, imagePadding = 'p-3 lg:p-6' }) {
    return (
        <div className='images-gallery flex w-full flex-wrap'>
            {images.length === 0 ? (
                <h4 className=' my-5 mx-auto text-slate-400 flex flex-col items-center gap-3'>
                    <TbPhotoX className='text-3xl lg:text-4xl ' />
                    <strong className='lg:text-base'>
                        تصویری وجود ندارد
                    </strong>
                </h4>
            ) : (
                images.map(image => (
                    <div key={image.id} className={`w-6/12 lg:w-4/12 xl:w-3/12 cursor-pointer ${imagePadding}`}>
                        <img src={image.image} alt={'gallery imag'} className='rounded-xl hover:scale-105 hover:opacity-90' />
                    </div>
                ))
            )}
        </div>
    )
}
