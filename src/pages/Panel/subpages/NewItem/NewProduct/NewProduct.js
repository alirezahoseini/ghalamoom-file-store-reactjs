/* eslint-disable no-unused-expressions */
import { useEffect, useState, useContext } from "react"
import { Link, json, useNavigate } from "react-router-dom";
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../../Contexts/Notifications/NotificationProvider'
// datas
import { apiLinks } from '../../../../../data/links';
// Utils
import { getCooki } from '../../../../../utils/cookis'
// hooks
import useAxiosPost from "../../../../../hooks/axios/useAxiosPost";
import useAxiosGet from '../../../../../hooks/axios/useAxiosGet';
// components
import NormalInput from "../../../components/Inputs/NormalInput";
import Textarea from "../../../components/Inputs/Textarea";
import InStockRadio from "../../../components/Inputs/InStockRadio";
import SelectBox from "../../../components/Inputs/SelectBox";
import PriceInput from "../../../components/Inputs/PriceInput";
import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import SubmitFormButton from "../../components/Buttons/SubmitFormButton";
import CancelButton from "../../components/Buttons/CancelButton";
import MultipleImageUploader from '../../../components/MultipleImageUploader/MultipleImageUploader';

export default function NewProduct() {
  const notificationDispatch = useContext(NotificationContext)
  const { axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostData, setAxiosPostToken, setAxiosPostError } = useAxiosPost();
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl, setAxiosGetToken } = useAxiosGet();
  const [categoryArray, setCategoryArray] = useState([])
  const authToken = getCooki('token');
  const [loadCategoriesStatus, setLoadCategoriesStatus] = useState('loading');
  const [formData, setFormData] = useState({
    title: '',                                                  /// max length 70 
    inStock: false,                                              /// default false 
    image: '',                                                  /// dataurl image
    price: '',                                                  /// the price is in thousand tomans, like 20 
    fileSize: '',                                                /// file size in megabytes
    shortDes: '',                                                /// max length 180
    longDes: '',                                                 /// max length 400
    category: [],                                                /// chooseing from select box
    format: "ZIP",                                               /// chooseing from select box
    gallery: [],
    saleCount: 5,
  });
  const navigateTo = useNavigate()
  const inputsData = {
    title: {
      name: 'title',
      label: 'عنوان محصول',
      placeholder: 'عنوان محصول را وارد کنید',
      type: 'text',
      required: true,
      errorMessage: 'عنوان محصول باید بین 5 الی 15 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{5,15}',
      maxLength: 15,
    },
    shortDes: {
      name: 'shortDes',
      label: 'توضیح کوتاه',
      placeholder: 'محصول را در حد یک خط توصیف کنید',
      errorMessage: 'توضیح کوتاه باید بین 30 الی 150 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{30,150}',
      maxLength: 150,
      minLength: 20,
      rows: '2',
      required: true
    },
    longDes: {
      name: 'longDes',
      label: 'توضیح بلند',
      placeholder: 'توضیحات محصول',
      errorMessage: 'توضیحات باید بین 40 الی 400 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{40,400}',
      maxLength: 400,
      minLength: 50,
      rows: '5',
      required: true
    },
    category: {
      name: 'category',
      label: 'دسته بندی',
    },
    inStock: {
      name: 'inStock',
      label: 'وضعیت موجودی انبار',
    },
    format: {
      name: 'format',
      label: 'فرمت فایل',
      items: [
        'ZIP',
        'PNG',
        'JPG',
        'AI',
        'PSD',
        'TTF',
        'MP4',
      ]
    },
    price: {
      name: 'price',
      label: 'قیمت',
      placeholder: "قیمت محصول",
      pattern: "\\d*",
      type: 'text',
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
      type: 'text',
      errorMessage: "حجم فایل را به عدد بین 1 الی 10000 مگابایت وارد کنید",
    },
    image: {
      imageValue: '',
      name: 'image'
    },
    gallery: {
      imageValue: [],
      inputId: 'new-product-gallery'
    }
  }
  const changeHandler = ({ id, value }) => {
    if (id === 'fileSize' || id === 'price') {
      if (!isNaN(value)) {
        setFormData({ ...formData, [id]: Number(value) });
      }
      return
    }
    if (id === 'category') {
      setFormData({ ...formData, [id]: value });
      return
    }
    setFormData({ ...formData, [id]: value })
  }

  const handleImageUpload = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl })
  }

  const galleryChangeHandler = (images) => {
    setFormData({ ...formData, gallery: images })
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (formData.gallery < 1) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'حداقل یک تصویر برای گالری انتخاب کنید',
          status: 'warning'
        }
      })
    } else if (!formData.image) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'لطفا تصویر شاخص را انتخاب نمایید',
          status: 'warning'
        }
      })
    } else if (!formData.category.length) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'لطفا دسته بندی را انتخاب نمایید',
          status: 'warning'
        }
      })
      return
    }
    else {

      setAxiosPostToken(authToken);
      setAxiosPostData(formData);
      setAxiosPostUrl(apiLinks.products);
    }
  }
  // Get categoreis form server
  const getCategories = () => {
    setAxiosGetToken(authToken);
    setAxiosGetUrl(`${apiLinks.categories}?type=Product`)
    setLoadCategoriesStatus('loading')
  }
  useEffect(() => {
    if (axiosPostResult !== null) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'محصول با موفقیت ایجاد شد',
          status: 'success'
        }
      })
      navigateTo('/panel/products')
    }
    if (axiosPostError !== null) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: "محصول ایجاد نشد لطفا دوباره امتحان کنید",
          status: 'error'
        }
      })
      console.log(axiosPostError)
    }
  }, [axiosPostError, axiosPostResult]);

  // Get categoreis 
  useEffect(() => {
    getCategories()
  }, [])

  // Run get categoreis
  useEffect(() => {
    if (axiosGetResult !== null) {
      let newCategoreisArray = [];
      axiosGetResult.forEach(item => {
        newCategoreisArray = [...newCategoreisArray, item.name]
      });
      setCategoryArray(newCategoreisArray)
      setLoadCategoriesStatus('loaded')
    }
    if (axiosGetError !== null) {
      if (axiosGetError.status === 400) {
        setLoadCategoriesStatus('create_category')
      } else {

        notificationDispatch({
          type: 'ADD_NOTE',
          payload: {
            id: v4(),
            message: 'دسته بندی ها بارگذاری نشدند',
            status: 'error'
          }
        })
      }
    }
  }, [axiosGetResult, axiosGetError])



  return (
    <div id="new-product-form">
      <div className="wrapper w-full flex flex-col xl:flex-row p-4 rounded-2xl bg-white my-3 dark:bg-slate-800 ">
        <form onSubmit={submitHandler} className="w-full">
          <section className="flex flex-col xl:flex-row">
            {/* Right Side - Text form  */}
            <div className="right-side xl:w-8/12">
              <NormalInput value={formData.title} onChangeEvent={changeHandler} {...inputsData.title} />
              <Textarea value={formData.shortDes} onChangeEvent={changeHandler} {...inputsData.shortDes} />
              <div className="w-full flex-col xl:flex-row flex justify-start relative mb-5 mt-3">
                <div className="w-full xl:w-6/12">
                  {
                    loadCategoriesStatus === 'loaded' && (
                      <SelectBox value={formData.category} onChangeEvent={changeHandler} items={categoryArray} {...inputsData.category} />
                    )
                  }
                  {loadCategoriesStatus === 'loading' && (
                    <span className="w-full lg:w-32 h-10 inline-flex justify-center items-center text-slate-700 dark:text-slate-300 dark:bg-slate-900 bg-slate-200 mt-5 mb-3 rounded-md animate-pulse">درحال بارگذاری ...</span>
                  )}
                  {loadCategoriesStatus === 'create_category' && (
                    <Link to={'/panel/categories'} className="w-full lg:w-32 h-10 inline-flex justify-center items-center text-white font-bold dark:text-slate-300 dark:bg-green-600 bg-green-500 mt-5 mb-3 rounded-md ">ایجاد دسته جدید</Link>
                  )}
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
              <Textarea value={formData.longDes} onChangeEvent={changeHandler} {...inputsData.longDes} />
            </div>
            {/* End of Right Side - Text form  */}
            {/* Left side - select Image */}
            <div className="left-side xl:w-4/12">
              <ImageUploader 
                existingImage={formData.image}
                onImageUpload={handleImageUpload}
              />
              <MultipleImageUploader
                existingImages={formData.gallery}
                onImagesUpload={galleryChangeHandler}
              />
            </div>
            {/* End of Left side - select Image */}
          </section>
          <div className="buttons w-full flex items-center gap-3">
            <div className="w-8/12 xl:w-5/12" >
              <SubmitFormButton isPending={axiosPostIsPending} title={'ایجاد محصول'} />
            </div>
            <div className={`w-4/12 xl:w-3/12 ${axiosPostIsPending && 'pointer-events-none'}`} >
              <CancelButton title={'لغو'} />
            </div>
          </div>
        </form>
      </div>
    </div >
  )
}
