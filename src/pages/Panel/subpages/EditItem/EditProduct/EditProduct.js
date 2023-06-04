import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../../components/ui/Notifications/NotificationProvider'

// datas
import { apiLinks } from '../../../../../data/links'
// hooks
import useAxiosPut from "../../../../../hooks/axios/useAxiosPut";
import useAxiosGet from "../../../../../hooks/axios/useAxiosGet";
import useAxiosDelete from "../../../../../hooks/axios/useAxiosDelete";

// components
import NormalInput from "../../../components/Inputs/NormalInput";
import Textarea from "../../../components/Inputs/Textarea";
import InStockRadio from "../../../components/Inputs/InStockRadio";
import SelectBox from "../../../components/Inputs/SelectBox";
import PriceInput from "../../../components/Inputs/PriceInput";
import ImageInput from "../../../components/Inputs/ImageInput";
import SubmitFormButton from "../../components/Buttons/SubmitFormButton";
import CancelButton from "../../components/Buttons/CancelButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import SimpleDataLoader from '../../../../../components/ui/SimpleDataLoader/SimpleDataLoader'
import Modal from '../../../../../components/ui/Modal'
import MultipleImageInput from "../../../components/Inputs/MultipleImageInput/MultipleImageInput";

export default function EditProduct() {
  const notificationDispatch = useContext(NotificationContext)
  const { axiosGetResult, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  const { axiosPutResult, axiosPutIsPending, axiosPutError, setAxiosPutUrl, setAxiosPutData } = useAxiosPut();
  const { axiosDeleteResult, axiosDeleteIsPending, axiosDeleteError, setAxiosDeleteUrl } = useAxiosDelete();
  const [isLoadedDataFromApi, setIsLoadedDataFromApi] = useState(false)
  const [simpleLoaderStatus, setSimpleLoaderStatus] = useState('load')
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [formData, setFormData] = useState();
  const navigateTo = useNavigate()
  const urlParams = useParams()
  const inputsData = {
    title: {
      name: 'title',
      label: 'عنوان محصول',
      placeholder: 'عنوان محصول را وارد کنید',
      type: 'text',
      required: true,
      errorMessage: 'عنوان محصول باید بین 5 الی 15 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{5,50}',
      maxLength: 50,
    },
    miniDes: {
      name: 'miniDes',
      label: 'توضیح کوتاه',
      placeholder: 'محصول را در حد یک خط توصیف کنید',
      required: true,
      errorMessage: 'توضیح کوتاه باید بین 30 الی 150 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{30,150}',
      maxLength: 150,
      minLength: 30,
      rows: '2'
    },
    largeDes: {
      name: 'largeDes',
      label: 'توضیح بلند',
      placeholder: 'توضیحات محصول',
      required: true,
      errorMessage: 'توضیحات باید بین 40 الی 400 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{40,400}',
      maxLength: 400,
      minLength: 50,
      rows: '5'
    },
    category: {
      selectBoxName: 'category',
      label: 'دسته بندی',
      items: [
        { name: 'بدون دسته', id: 'null' },
        { name: 'فونت', id: 'font' },
        { name: 'پک آیکن', id: 'icon-pack' },
        { name: 'فایل ایلوستریتور', id: 'illustrator-file' },
        { name: 'لایه باز فوتوشاپ', id: 'open-layer-psd' },
        { name: 'پوستر', id: 'Puter' },
        { name: 'موکاپ', id: 'mockup' },
        { name: 'پک استیکر', id: 'sticker-pack' },
        { name: 'کاور پست', id: 'Put-cover' },
      ]
    },
    inStock: {
      name: 'inStock',
      label: 'وضعیت موجودی انبار',
    },
    format: {
      selectBoxName: 'format',
      label: 'فرمت فایل',
      items: [
        { name: 'ZIP', id: 'zip' },
        { name: 'PNG', id: 'png' },
        { name: 'JPG', id: 'jpg' },
        { name: 'AI', id: 'ai' },
        { name: 'PSD', id: 'psd' },
        { name: 'TTF', id: 'TTF' },
        { name: 'MP4', id: 'mp4' },
      ]
    },
    price: {
      name: 'price',
      label: 'قیمت',
      placeholder: "قیمت محصول",
      pattern: "\\d*",
      required: true,
      maxLength: "6",
      errorMessage: 'قیمت را به عدد وارد کنید. اگر رایگان است 0 وارد کنید',
    },
    fileSize: {
      name: 'fileSize',
      label: 'حجم فایل به مگابایت',
      placeholder: 'حجم فایل را وارد کنید',
      pattern: "^([1-9][0-9\\.]{0,4}|10000)$",
      required: true,
      maxLength: "5",
      errorMessage: "حجم فایل را به عدد بین 1 الی 10000 مگابایت وارد کنید",
    },
    image: {
      imageValue: '',
      inputId: 'new-product-image'
    },
    gallery: {
      imageValue: [],
      inputId: 'edit-product-gallery'
    }
  }
  const changeHandler = (event) => {
    // Image 
    if (event.image) {
      setFormData({ ...formData, image: event.image })
    } else if (event.target.className.includes('custom-select-box-input')) {
      // Select boxes
      const inputName = event.target.name;
      const inputItems = inputsData[inputName].items;
      const [selectedItem] = inputItems.filter(item => item.id === event.target.value)
      setFormData({ ...formData, [event.target.name]: selectedItem })
    } else {
      // Normal inputs
      setFormData({ ...formData, [event.target.name]: event.target.value })
    }
  }
  const galleryChangeHandler = (images) => {
    setFormData({ ...formData, gallery: images })
  }
  const submitHandler = (event) => {
    event.preventDefault()
    setAxiosPutData(formData)
    setAxiosPutUrl(`${apiLinks.products}/${urlParams.productId}`)
  }
  const deleteHandler = () => {
    setIsShowDeleteModal(prev => !prev)
    setAxiosDeleteUrl(`${apiLinks.products}/${urlParams.productId}`)
  }
  /////// loading prev product data from server
  useEffect(() => {
    setAxiosGetUrl(`${apiLinks.products}/${urlParams.productId}`)
  }, [])
  /////// set prev data to inputs and showing
  useEffect(() => {
    if (axiosGetResult !== null) {
      setFormData(axiosGetResult)
      setSimpleLoaderStatus('hidde')
      setIsLoadedDataFromApi(true)
    }
    if (axiosGetError !== null) {
      if (axiosGetError.status == 404) {
        notificationDispatch({
          type: 'ADD_NOTE',
          payload: {
              id: v4(),
              message: `محصولی با آیدی ${urlParams.productId} پیدا نشد.!`,
              status: 'error'
          }
      })
        navigateTo('/panel/products')
      }
      setSimpleLoaderStatus('error')
    }
  }, [axiosGetError, axiosGetResult]);
  //////// save changes results
  useEffect(() => {
    // show update results
    if (axiosPutResult !== null) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
            id: v4(),
            message: 'تغییرات با موفقیت ذخیره شدند',
            status: 'success'
        }
    })
    }
    if (axiosPutError !== null) {
      console.log(axiosPutError)
    }
  }, [axiosPutError, axiosPutResult]);
  ///////  Delete results
  useEffect(() => {
    if (axiosDeleteResult !== null) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
            id: v4(),
            message: 'محصول با موفقیت پاک شد',
            status: 'success'
        }
    })
      navigateTo(-1)
    }
    if (axiosDeleteError !== null) {
      console.log(console.log(axiosDeleteError))
    }
  }, [axiosDeleteError, axiosDeleteResult]);
  if (isLoadedDataFromApi) {

  }
  return (
    isLoadedDataFromApi ? (
      <div id="edit-product-form">
        <div className="wrapper w-full flex flex-col xl:flex-row p-4 rounded-2xl bg-white my-3 dark:bg-slate-800 ">
          <form onSubmit={submitHandler} className="w-full">
            <section className="flex flex-col xl:flex-row">
              {/* Right Side - Text form  */}
              <div className="right-side xl:w-8/12">
                <NormalInput value={formData.title} onChangeEvent={changeHandler} {...inputsData.title} />
                <Textarea value={formData.miniDes} onChangeEvent={changeHandler} {...inputsData.miniDes} />
                <div className="w-full flex-col xl:flex-row flex justify-start relative mb-5 mt-3">
                  <div className="w-full xl:w-6/12">
                    <SelectBox value={formData.category} onChangeEvent={changeHandler} {...inputsData.category} />
                  </div>
                  <div className="w-full xl:w-6/12">
                    <InStockRadio value={formData.inStock} onChangeEvent={changeHandler} {...inputsData.inStock} />
                  </div>
                </div>
                <div className="w-full flex-col xl:flex-row flex justify-start items-center relative mb-5 mt-3">
                  <div className="w-full xl:w-6/12">
                    <SelectBox value={formData.format} onChangeEvent={changeHandler} {...inputsData.format} />
                  </div>
                  <div className="w-full xl:w-6/12">
                    <PriceInput value={formData.price} onChangeEvent={changeHandler} {...inputsData.price} />
                  </div>
                </div>
                <NormalInput value={formData.fileSize} onChangeEvent={changeHandler} {...inputsData.fileSize} />
                <Textarea value={formData.largeDes} onChangeEvent={changeHandler} {...inputsData.largeDes} />
              </div>
              {/* End of Right Side - Text form  */}
              {/* Left side - select Image */}
              <div className="left-side xl:w-4/12">
                <ImageInput defaultImage={formData.image} onChnageHandler={changeHandler} {...inputsData.image} />
                <MultipleImageInput defaultImages={formData.gallery} onChnageHandler={galleryChangeHandler} {...inputsData.gallery} />
              </div>
              {/* End of Left side - select Image */}
            </section>
            {/* Buttons  */}
            <div className="buttons w-full xl:w-8/12 flex items-center gap-3">
              <div className={`w-4/12 xl:4/12 ${axiosDeleteIsPending && 'pointer-events-none'}`} >
                <SubmitFormButton isPending={axiosPutIsPending} title={'ذخیره تغییرات'} />
              </div>
              <div className={`w-4/12 xl:4/12 ${axiosPutIsPending || axiosDeleteIsPending ? 'pointer-events-none' : ''}`} >
                <CancelButton title='انصراف' />
              </div>
              <div className={`w-4/12 xl:4/12 ${axiosPutIsPending && 'pointer-events-none'}`} >
                <DeleteButton onClickEvent={() => setIsShowDeleteModal(prev => !prev)} isPending={axiosDeleteIsPending} title='حذف محصول' />
              </div>
            </div>
            {/* End of Buttons  */}
          </form>
        </div>
        <Modal isShow={isShowDeleteModal} onClose={() => setIsShowDeleteModal(prev => !prev)}>
          <div className="w-full p-3 text-center font-bold">
            <h2 className="text-slate-800 mb-5 dark:text-slate-100">آیا محصول مورد نظر پاک شود؟</h2>
            <div className="flex items-center justify-around gap-3 w-full">
              <button onClick={() => deleteHandler()} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md w-6/12 dark:bg-slate-600 dark:text-slate-200">بله</button>
              <button onClick={() => setIsShowDeleteModal(prev => !prev)} className="bg-blue-600 text-white px-4 py-2 rounded-md w-6/12">لغو</button>
            </div>
          </div>
        </Modal>
      </div>
    ) : (
      <SimpleDataLoader status={simpleLoaderStatus} />
    )

  )
}
