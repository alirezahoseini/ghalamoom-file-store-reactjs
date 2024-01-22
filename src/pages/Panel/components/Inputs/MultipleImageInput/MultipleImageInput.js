import React, { useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { v4 } from 'uuid'
import { TbPhotoPlus } from 'react-icons/tb'

// contexts 
import { NotificationContext } from '../../../../../Contexts/Notifications/NotificationProvider'

// utils
import { getCooki } from '../../../../../utils/cookis';

// components
import ImageListItem from './ImageListItem';
import Uploader from '../ImageInput/Uploader';


export default function MultipleImageInput({ defaultImages, onChnageHandler, inputId }) {
  const notificationDispatch = useContext(NotificationContext)
  const [imagesArray, setImagesArray] = useState(defaultImages);
  const userToken = getCooki('token')
  const [uploadStart, setUploadStart] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  // Upload uandler
  const uploadHandler = (file) => {
    let fd = new FormData();
    fd.append("image", file);
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
        const currentImage = res.data[0].image;
        setUploadStart(false);
        setUploadPercent(0);
        setImagesArray(perv => [...perv, currentImage]);
        onChnageHandler([...defaultImages, currentImage]);
      })
      .catch(err => {
        if (err.res) {
          notificationDispatch({
            type: 'ADD_NOTE',
            payload: {
              id: v4(),
              message: 'بارگزاری ناموفق بود ، دوباره تلاش کنید',
              status: 'error'
            }
          })
          setUploadError(null)
          setUploadPercent(0)
          setUploadStart(false)
          console.log(err.res)
        }
        if (err.req) {
          notificationDispatch({
            type: 'ADD_NOTE',
            payload: {
              id: v4(),
              message: 'ارتباط با سرور برقرار نشد دوباره امتحان کنید',
              status: 'error'
            }
          })
          setUploadError(null)
          setUploadPercent(0)
          setUploadStart(false)
          console.log(err.req)
        }
        setUploadError(true)
      })

    setUploadStart(true);
  }

  // add image to gallery
  const addImageHandler = async (event) => {
    const file = event.target.files[0];

    if(file.size > 3000000){
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'حجم تصاویر باید کمتر از 3 مگابایت باشد',
          status: 'error'
        }
      })
      return 
    }else{
      uploadHandler(file)
    }
  }



  const deleteHandler = (imageId) => {
    console.log(imageId)
    const newImagesArray = imagesArray.filter(image => {
      const id = image.slice(47,).split('.')[0]
      return id !== imageId
    })

  setImagesArray(newImagesArray);

}

// update images array in form
useEffect(() => {
  onChnageHandler(imagesArray)
}, [imagesArray])


return (
  <div className='multiple-image-input my-4'>
    <div className="wrapper flex flex-col gap-4">
      <h2 className='font-bold text-slate-700 dark:text-slate-50 mr-3'>گالری تصاویر</h2>
      {/* Add image input  */}
      <div className='add-image-input'>
        <input disabled={uploadStart} id={inputId} type="file" accept='image/jpeg, image/png , image/jpg, image/webp' onChange={(event => addImageHandler(event))} className='hidden' />
        <label htmlFor={inputId} className='flex  cursor-pointer items-center justify-center p-4 gap-3 rounded-2xl border-2 border-dashed xl:w-11/12 mx-auto border-slate-200 text-slate-500 dark:border-slate-700 font-yekan-bakh font-bold'>
          <TbPhotoPlus className='text-3xl' />
          <h4 className='flex flex-col'>
            {uploadStart && (
              <p>درحال باارگذاری....</p>
            )}
            {!uploadStart && (
              <span>{imagesArray.length > 0 ? 'افزودن تصاویر بیشتر' : "افزودن تصویر به گالری"}</span>
            )}
          </h4>
        </label>
      </div>
      {/* End of Add image input  */}
      <div className='images-preview px-2 flex flex-wrap  justify-center items-start'>
        {imagesArray.length > 0 && imagesArray.map((item, index) => (
          <ImageListItem key={index} image={item} onDeleteFunc={deleteHandler} />
        ))}
        {/* Loading  */}
        {uploadStart &&
          <div className="w-1/2 min-h-24 inline-flex p-2">
            <div className='rounded-md min-h-20 w-full h-full bg-slate-400 dark:bg-slate-700 overflow-hidden relative' >
              <Uploader percent={uploadPercent} uploadStart={uploadStart} />
            </div>
          </div>
        }
        {/* Loading  */}
      </div>
    </div>
  </div>
)
}
