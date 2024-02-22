import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../../Contexts/Notifications/NotificationProvider'

// datas
import { apiLinks } from '../../../../../data/links';
// Utils
import { getCooki } from '../../../../../utils/cookis'
// hooks
import useAxiosPost from "../../../../../hooks/axios/useAxiosPost";
import useAxiosGet from "../../../../../hooks/axios/useAxiosGet";

// components
import NormalInput from "../../../components/Inputs/NormalInput";
import Textarea from "../../../components/Inputs/Textarea";
import SelectBox from "../../../components/Inputs/SelectBox";
import PriceInput from "../../../components/Inputs/PriceInput";
import ImageInput from "../../../components/Inputs/ImageInput/ImageInput";
import SubmitFormButton from "../../components/Buttons/SubmitFormButton";
import CancelButton from "../../components/Buttons/CancelButton";
import MultipleImageInput from "../../../components/Inputs/MultipleImageInput/MultipleImageInput";

export default function NewCourse() {
  const notificationDispatch = useContext(NotificationContext)
  const { axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostData, setAxiosPostToken } = useAxiosPost();
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl, setAxiosGetToken } = useAxiosGet();
  const [categoryArray, setCategoryArray] = useState([])
  const [loadCategoriesStatus, setLoadCategoriesStatus] = useState('loading');
  const authToken = getCooki('token');
  const [formData, setFormData] = useState({
    title: '',                                                        /// max length 70 
    image: '',                                                        /// dataurl image
    price: '',                                                        /// the price is in thousand tomans, like 20 
    shortDes: '',                                                      /// max length 180
    longDes: '',                                                     /// max length 400
    duration: '',                                                         /// course duration
    studentCount: 0,                                                  /// default 0 not change here
    wayRecive: [],                                           /// chooseing from select box
    support: [],                      /// chooseing from select box
    category: [],                                                     /// chooseing from select box
    prerequisite: [],         /// chooseing from select box
    level: [],                     /// chooseing from select box
    gallery: [],
  });
  const navigateTo = useNavigate()
  const inputsData = {
    title: {
      name: 'title',
      label: 'عنوان دوره',
      placeholder: 'عنوان دوره را وارد کنید',
      type: 'text',
      required: true,
      errorMessage: 'عنوان دوره باید بین 5 الی 15 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{5,15}',
      maxLength: 15,
    },
    shortDes: {
      name: 'shortDes',
      label: 'توضیح کوتاه',
      placeholder: 'دوره را در حد یک خط توصیف کنید',
      required: true,
      errorMessage: 'توضیح کوتاه باید بین 30 الی 150 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{30,150}',
      maxLength: 150,
      minLength: 30,
      rows: '2'
    },
    longDes: {
      name: 'longDes',
      label: 'توضیح بلند',
      placeholder: 'توضیحات دوره',
      required: true,
      errorMessage: 'توضیحات باید بین 40 الی 400 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{40,400}',
      maxLength: 400,
      minLength: 50,
      rows: '5'
    },
    prerequisite: {
      name: 'prerequisite',
      label: 'پیشنیاز',
      items: [
        'NoPrerequisite',
        'AiPreliminary',
        'AiIntermediate',
        'AiAdvanced',
        'PsPreliminary',
        'PsIntermediate',
        'PsAdvanced',
      ]
    },
    category: {
      name: 'category',
      label: 'دسته بندی',
    },
    wayRecive: {
      name: 'wayRecive',
      label: 'شیوه دریافت',
      items: [
        'Download',
        'SpotPlayer',
        'WatchOnline',
      ]
    },
    level: {
      name: 'level',
      label: 'سطح دوره',
      items: [
        'Preliminary',
        'Intermediate',
        'Advanced'
      ]
    },
    support: {
      name: 'support',
      label: 'پشتیبانی',
      items: [
        'Ticket',
        'TickerPhone',
        'TicketPhoneWhatsapp'
      ]
    },
    price: {
      name: 'price',
      label: 'قیمت',
      placeholder: "قیمت دوره",
      pattern: "\\d*",
      required: true,
      maxLength: "6",
      errorMessage: 'قیمت را به عدد وارد کنید. اگر رایگان است 0 وارد کنید',
    },
    duration: {
      name: 'duration',
      label: 'مدت زمان دوره',
      placeholder: "زمان دوره به ساعت",
      pattern: "^([1-9][0-9]{0,2})$",
      required: true,
      maxLength: "3",
      errorMessage: 'مدت زمان دوره باید بین 1 الی 999 ساعت باشد ',
    },
    image: {
      imageValue: '',
      name: 'image'
    },
    gallery: {
      imageValue: [],
      inputId: 'new-course-gallery'
    }
  }
  const changeHandler = ({ id, value }) => {

    if (id === "duration") {
      setFormData({ ...formData, [id]: Number(value) });
      return
    }
    if (id === 'category') {
      setFormData({ ...formData, [id]: value });
      return
    }
    if (id === 'level' || id === 'wayRecive' || id === 'prerequisite' || id === 'support') {
      const filteredItem = inputsData[id].items.find((item) => {
        if (item === value) {
          return item
        }
      })
      setFormData({ ...formData, [id]: filteredItem });
      return
    }
    setFormData({ ...formData, [id]: value })
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
      return
    } else if (!formData.image) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'لطفا تصویر شاخص را انتخاب نمایید',
          status: 'warning'
        }
      })
      return
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
    } else if (!formData.wayRecive.length) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'لطفا شیوه دریافت را انتخاب نمایید',
          status: 'warning'
        }
      })
      return
    } else if (!formData.support.length) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'لطفا نحوه پشتیبانی دوره را انتخاب نمایید',
          status: 'warning'
        }
      })
      return
    } else if (!formData.level.length) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'لطفا سطح دوره را انتخاب نمایید',
          status: 'warning'
        }
      })
      return
    } else if (!formData.prerequisite.length) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'لطفا پیشنیاز دوره را انتخاب نمایید',
          status: 'warning'
        }
      })
      return
    } else {
      setAxiosPostToken(authToken);
      setAxiosPostData(formData);
      setAxiosPostUrl(apiLinks.courses)
    }
  }
  // 
  useEffect(() => {
    if (axiosPostResult !== null) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'دوره با موفقیت منتشر شد',
          status: 'success'
        }
      })
      navigateTo('/panel/courses')
    }
    if (axiosPostError !== null) {
      console.log(axiosPostError)
    }
  }, [axiosPostError, axiosPostResult])

  // Get categoreis form server
  const getCategories = () => {
    setAxiosGetToken(authToken);
    setAxiosGetUrl(`${apiLinks.categories}?type=Course`)
    setLoadCategoriesStatus('loading')
  }
  // Get categoreis 
  useEffect(() => {
    getCategories()
  }, [])
  // Run get categoreis
  useEffect(() => {
    if (axiosGetResult !== null) {
      let newCategoreisArray = [];
       axiosGetResult.forEach(item => {
        newCategoreisArray = [...newCategoreisArray , item.name]
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
              <div className="w-full flex-col xl:flex-row xl:items-center flex justify-start relative mb-5 mt-3">
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
                  <SelectBox value={formData.level} onChangeEvent={changeHandler} {...inputsData.level} />
                </div>
              </div>
              <div className="w-full flex-col xl:flex-row xl:items-center flex justify-start relative mb-5 mt-3">
                <div className="w-full xl:w-6/12">
                  <SelectBox value={formData.wayRecive} onChangeEvent={changeHandler} {...inputsData.wayRecive} />
                </div>
                <div className="w-full xl:w-6/12">
                  <SelectBox value={formData.prerequisite} onChangeEvent={changeHandler} {...inputsData.prerequisite} />
                </div>
              </div>
              <div className="w-full flex-col xl:flex-row flex justify-start items-center relative mb-5 mt-3">
                <div className="w-full xl:w-6/12">
                  <SelectBox value={formData.support} onChangeEvent={changeHandler} {...inputsData.support} />
                </div>
                <div className="w-full xl:w-6/12">
                  <PriceInput value={formData.price} onChangeEvent={changeHandler} {...inputsData.price} />
                </div>
              </div>
              <NormalInput value={formData.duration} onChangeEvent={changeHandler} {...inputsData.duration} />
              <Textarea value={formData.longDes} onChangeEvent={changeHandler} {...inputsData.longDes} />
            </div>
            {/* End of Right Side - Text form  */}
            {/* Left side - select Image */}
            <div className="left-side xl:w-4/12">
              <ImageInput defaultImage={formData.image} onChnageHandler={changeHandler} {...inputsData.image} />
              <MultipleImageInput defaultImages={formData.gallery} onChnageHandler={galleryChangeHandler} {...inputsData.gallery} />
            </div>
            {/* End of Left side - select Image */}
          </section>
          <div className="buttons w-full flex items-center gap-3">
            <div className="w-8/12 xl:w-5/12" >
              <SubmitFormButton isPending={axiosPostIsPending} title={'انتشار دوره'} />
            </div>
            <div className={`w-4/12 xl:w-3/12 ${axiosPostIsPending && 'pointer-events-none'}`} >
              <CancelButton title={'لغو'} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
