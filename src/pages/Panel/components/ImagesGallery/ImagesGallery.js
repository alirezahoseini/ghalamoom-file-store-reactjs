import React from 'react'

export default function ImagesGallery({ images }) {
    return (
        <div className='images-gallery flex w-full flex-wrap'>
            {images.map(image => (
                <div key={image.id} className='w-6/12 lg:w-4/12 xl:w-3/12 p-3 lg:p-6 cursor-pointer'>
                    <img src={image.base64} alt={image.name} className='rounded-xl hover:scale-105 hover:opacity-90' />
                </div>
            ))
            }
        </div>
    )
}
