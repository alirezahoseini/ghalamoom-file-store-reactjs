import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from 'uuid'
import { Link } from "react-router-dom";
// contexts 
import { NotificationContext } from '../../../../../Contexts/Notifications/NotificationProvider';
// Utils
import { getCooki } from '../../../../../utils/cookis'
// datas
import { apiLinks } from '../../../../../data/links'
// hooks
import useAxiosPut from "../../../../../hooks/axios/useAxiosPut";
import useAxiosGet from "../../../../../hooks/axios/useAxiosGet";
import useAxiosDelete from "../../../../../hooks/axios/useAxiosDelete";

// components
import NormalInput from "../../../components/Inputs/NormalInput";
import Textarea from "../../../components/Inputs/Textarea";
import SelectBox from "../../../components/Inputs/SelectBox";
import PriceInput from "../../../components/Inputs/PriceInput";
import ImageInput from "../../../components/Inputs/ImageInput/ImageInput";
import SubmitFormButton from "../../components/Buttons/SubmitFormButton";
import CancelButton from "../../components/Buttons/CancelButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import SimpleDataLoader from '../../../../../components/ui/SimpleDataLoader/SimpleDataLoader'
import Modal from '../../../../../components/ui/Modal'
import MultipleImageInput from "../../../components/Inputs/MultipleImageInput/MultipleImageInput";

export default function EditCourse() {
  const notificationDispatch = useContext(NotificationContext)
  const { axiosGetResult, axiosGetError, setAxiosGetUrl, setAxiosGetToken, setAxiosGetId } = useAxiosGet();
  const { axiosPutResult, axiosPutIsPending, axiosPutError, setAxiosPutUrl, setAxiosPutData } = useAxiosPut();
  const { axiosDeleteResult, axiosDeleteIsPending, axiosDeleteError, setAxiosDeleteUrl, setAxiosDeleteToken } = useAxiosDelete();
  const [isLoadedDataFromApi, setIsLoadedDataFromApi] = useState(false)
  const [simpleLoaderStatus, setSimpleLoaderStatus] = useState('load')
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const urlParams = useParams()
  const authToken = getCooki('token');
  const [formData, setFormData] = useState([]);
  const [allLoadingCompleted, setAllLoadingCompleted] = useState(false)
  const [loadCategoriesStatus, setLoadCategoriesStatus] = useState('loading');
  const [categoryArray, setCategoryArray] = useState([]);

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
        { name: "بدون پیش نیاز", id: 'NoPrerequisite' },
        { name: 'دوره ایلوستریتور مقدماتی', id: 'AiPreliminary' },
        { name: 'دوره ایلوستریتور متوسط', id: 'AiIntermediate' },
        { name: 'دوره ایلوستریتور پیشرفته', id: 'AiAdvanced' },
        { name: 'دوره فوتوشاپ مقدماتی', id: 'PsPreliminary' },
        { name: 'دوره فوتوشاپ متوسط', id: 'PsIntermediate' },
        { name: 'دوره فوتوشاپ پیشرفته', id: 'PsAdvanced' },
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
        { name: 'دانلودی', id: 'Download' },
        { name: 'اسپات پلیر', id: 'SpotPlayer' },
        { name: 'تماشای آنلاین', id: 'WatchOnline' },
      ]
    },
    level: {
      name: 'level',
      label: 'سطح دوره',
      items: [
        { name: 'مبتدی', id: 'Preliminary' },
        { name: 'متوسط', id: 'Intermediate' },
        { name: 'پیشرفته', id: 'Advanced' },
      ]
    },
    support: {
      name: 'support',
      label: 'پشتیبانی',
      items: [
        { name: 'تیکت', id: 'Ticket' },
        { name: 'تلفنی + تیکت', id: 'TickerPhone' },
        { name: 'تلفنی + تیکت + واتساپ', id: 'TicketPhoneWhatsapp' },
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

    if (id === 'fileSize' || id === "duration") {
      setFormData({ ...formData, [id]: Number(value) });
      return
    }
    if (id === 'category') {
      setFormData({ ...formData, [id]: value });
      return
    }
    if (id === 'level' || id === 'wayRecive' || id === 'prerequisite' || id === 'support') {
      const filteredItem = inputsData[id].items.find((item) => {
        if (item.name === value) {
          return item.id
        }
      })
      setFormData({ ...formData, [id]: filteredItem.id });
      return
    }
    setFormData({ ...formData, [id]: value })
  }
  const submitHandler = (event) => {
    event.preventDefault()
    setAxiosPutData(formData)
    setAxiosPutUrl(`${apiLinks.courses}/${urlParams.courseId}`)
  }
  // const deleteHandler = () => {

  //   if (!isShowDeleteModal) {
  //     setIsShowDeleteModal(prev => !prev)
  //   } else {
  //     setAxiosDeleteUrl(`${apiLinks.courses}/${urlParams.courseId}`)
  //     setAxiosDeleteToken(authToken)
  //   }
  // }
  // Get categoreis form server
  const getCategories = () => {
    setAxiosGetToken(authToken);
    setAxiosGetUrl(`${apiLinks.categories}?type=Course`);
    setAxiosGetId('LOADING-CATEGOREIS')
    setLoadCategoriesStatus('loading');
  }


  /////// loading prev course data from server
  useEffect(() => {
    setAxiosGetUrl(`${apiLinks.courses}/${urlParams.courseId}`);
    setAxiosGetToken(authToken);
    setAxiosGetId('LOADING-DATA');
  }, [])

  /////// set prev data to inputs and showing
  useEffect(() => {
    if (axiosGetResult !== null) {
      ///// LOADING AND SET PERV DATA  
      if (axiosGetResult.id === 'LOADING-DATA') {
        const { title,
          shortDes, longDes, prerequisite, category, wayRecive, level, support, price, duration, image, gallery } = axiosGetResult.data;
        const newGallery = gallery.map(item => {
          return item.image
        });
        const requiredValues = {
          category: category.name,
          gallery: newGallery,
          title,
          shortDes, longDes, prerequisite, wayRecive, level, support, price, duration, image
        };
        setFormData(requiredValues);
        //////// down line FOr test
        setAllLoadingCompleted(true)
        //////// up line FOr test 
        setSimpleLoaderStatus('hidde');
        setIsLoadedDataFromApi(true);
        getCategories();
        return
      }
      ///// LOADING AND SET PERV CATEGOREIS
      if (axiosGetResult.id === 'LOADING-CATEGOREIS') {
        let newCategoreisArray = []
        axiosGetResult.data.map(item => newCategoreisArray = [...newCategoreisArray, { id: item.id, name: item.name }])
        setCategoryArray(newCategoreisArray)
        setLoadCategoriesStatus('loaded');
        return
      }
    }
    if (axiosGetError !== null) {
      ///// LOADING AND SET PERV DATA  
      if (axiosGetError.id === 'LOADING-DATA') {
        if (axiosGetError.err.status == 404) {
          notificationDispatch({
            type: 'ADD_NOTE',
            payload: {
              id: v4(),
              message: `دوره ای با آیدی ${urlParams.courseId} پیدا نشد.!`,
              status: 'error'
            }
          })
          navigateTo('/panel/products')
        }
      }
      ///// LOADING AND SET PERV CATEGOREIS
      if (axiosGetError.id === 'LOADING-CATEGOREIS') {
        if (axiosGetError.err.status === 400) {
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
          message: 'دوره با موفقیت پاک شد',
          status: 'success'
        }
      })
      navigateTo(-1)
    }
    if (axiosDeleteError !== null) {
      console.log(console.log(axiosDeleteError))
    }
  }, [axiosDeleteError, axiosDeleteResult]);

  return (
    isLoadedDataFromApi ? (
      <div id="edit-product-form">
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
                        <SelectBox value={{ name: formData.category, id: formData.category }} onChangeEvent={changeHandler} items={categoryArray} {...inputsData.category} />
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
                    <SelectBox value={''} onChangeEvent={changeHandler} {...inputsData.level} />
                  </div>
                </div>
                <div className="w-full flex-col xl:flex-row xl:items-center flex justify-start relative mb-5 mt-3">
                  <div className="w-full xl:w-6/12">
                    {/* <SelectBox value={formData.wayReceive} onChangeEvent={changeHandler} {...inputsData.wayReceive} /> */}
                  </div>
                  <div className="w-full xl:w-6/12">
                    {/* <SelectBox value={formData.prerequisite} onChangeEvent={changeHandler} {...inputsData.prerequisite} /> */}
                  </div>
                </div>
                <div className="w-full flex-col xl:flex-row flex justify-start items-center relative mb-5 mt-3">
                  <div className="w-full xl:w-6/12">
                    {/* <SelectBox value={formData.support} onChangeEvent={changeHandler} {...inputsData.support} /> */}
                  </div>
                  <div className="w-full xl:w-6/12">
                    {/* <PriceInput value={formData.price} onChangeEvent={changeHandler} {...inputsData.price} /> */}
                  </div>
                </div>
                {/* <NormalInput value={formData.time} onChangeEvent={changeHandler} {...inputsData.time} />
                <NormalInput value={formData.fileSize} onChangeEvent={changeHandler} {...inputsData.fileSize} />
                <Textarea value={formData.largeDes} onChangeEvent={changeHandler} {...inputsData.largeDes} /> */}
              </div>
              {/* End of Right Side - Text form  */}
              {/* Left side - select Image */}
              <div className="left-side xl:w-4/12">
                {/* <ImageInput defaultImage={formData.image} onChnageHandler={changeHandler} {...inputsData.image} /> */}
                {/* <MultipleImageInput defaultImages={formData.gallery} onChnageHandler={galleryChangeHandler} {...inputsData.gallery} /> */}
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
                {/* <DeleteButton onClickEvent={() => setIsShowDeleteModal(prev => !prev)} isPending={axiosDeleteIsPending} title='حذف دوره' /> */}
              </div>
            </div>
            {/* End of Buttons  */}
          </form>
        </div>
        <Modal isShow={isShowDeleteModal} onClose={() => setIsShowDeleteModal(prev => !prev)}>
          <div className="w-full p-3 text-center font-bold">
            <h2 className="text-slate-800 mb-5 dark:text-slate-100">آیا دوره مورد نظر پاک شود؟</h2>
            <div className="flex items-center justify-around gap-3 w-full">
              {/* <button onClick={() => deleteHandler()} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md w-6/12 dark:bg-slate-600 dark:text-slate-200">بله</button> */}
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
