import React from 'react'

// default image
import defaultImage from '../../../../assets/images/panel/imageDefault.json'

export default function SingleImage({image, alt}) {
  return (
    <div className='single-image rounded-3xl overflow-hidden'>
        <img src={image.length > 0 ? image : defaultImage[0]} alt={alt} className='w-full' />
    </div>
  )
}
