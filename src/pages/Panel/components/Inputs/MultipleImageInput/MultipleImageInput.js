import React, { useState, useEffect, useRef } from 'react'
import { TbPhotoPlus, TbPhotoEdit } from 'react-icons/tb'
import { v4 } from 'uuid'
// hooks
import useBase64Image from '../../../../../hooks/useBase64Image';

// components
import ImageListItem from './ImageListItem';


export default function MultipleImageInput({ defaultImages, onChnageHandler, inputId }) {
  const [imagesArray, setImagesArray] = useState(defaultImages)
  const { setOrginalImage, selectedImage, setSelectedImage } = useBase64Image();

  // create base64 image
  const addImageHandler = async (event) => {
    const file = event.target.files[0];
    setOrginalImage(file);
  }

  // update imagesArray
  useEffect(() => {
    if (selectedImage !== null) {
      const imageObj = {
        id: v4(),
        ...selectedImage
      }
      // add image to images array 
      const isExist = imagesArray.find(item => item.base64 === imageObj.base64);
      if (imagesArray.length >= 6) {
        alert("شما بیشتر از 6 عکس نمی توانید اضافه کنید.!")
      } else if (isExist !== undefined) {
        alert('این عکس قبلا به گالری اضافه شده است.!')
      } else {
        setImagesArray(prevImages => [...prevImages, imageObj]);
      }

      // clear useBase64Image states
      setOrginalImage(null)
      setSelectedImage(null)
    }
  }, [selectedImage]);

  useEffect(() => {
    // return images array 
    onChnageHandler(imagesArray)
  }, [imagesArray])

  const deleteHandler = (imageId) => {
    const newImagesArray = imagesArray.filter(image => image.id !== imageId)
    setImagesArray(newImagesArray);
  }
  return (
    <div className='multiple-image-input my-4'>
      <div className="wrapper flex flex-col gap-4">
        <h2 className='font-bold text-slate-700 dark:text-slate-50 mr-1'>گالری تصاویر</h2>
        {/* Add image input  */}
        <div className='add-image-input'>
          <input id={inputId} type="file" accept='image/jpeg, image/png , image/jpg' onChange={(event => addImageHandler(event))} className='hidden' />
          <label htmlFor={inputId} className='flex  cursor-pointer items-center justify-center p-4 gap-3 rounded-2xl border-2 border-dashed xl:w-11/12 mx-auto border-slate-200 text-slate-500 dark:border-slate-700 font-yekan-bakh font-bold'>
            <TbPhotoPlus className='text-3xl' />
            <h4 className='flex flex-col'>
              <span>{imagesArray.length > 0 ? 'افزودن تصاویر بیشتر' : "افزودن تصویر به گالری"}</span>
            </h4>
          </label>
        </div>
        {/* End of Add image input  */}
        <div className='images-preview px-3'>
          {imagesArray.length > 0 && imagesArray.map((item) => (
            <ImageListItem key={item.id} {...item} onDeleteFunc={deleteHandler} />
          ))}
        </div>
      </div>
    </div>
  )
}
