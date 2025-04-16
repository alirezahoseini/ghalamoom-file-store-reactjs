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
import useAxiosPatch from "../../../../../hooks/axios/useAxiosPatch";
import useAxiosGet from "../../../../../hooks/axios/useAxiosGet";
import useAxiosDelete from "../../../../../hooks/axios/useAxiosDelete";

// components
import NormalInput from "../../../components/Inputs/NormalInput";
import Textarea from "../../../components/Inputs/Textarea";
import SelectBox from "../../../components/Inputs/SelectBox";
import PriceInput from "../../../components/Inputs/PriceInput";
import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import SubmitFormButton from "../../components/Buttons/SubmitFormButton";
import CancelButton from "../../components/Buttons/CancelButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import SimpleDataLoader from '../../../../../components/ui/SimpleDataLoader/SimpleDataLoader'
import Modal from '../../../../../components/ui/Modal'
import MultipleImageUploader from '../../../components/MultipleImageUploader/MultipleImageUploader';

export default function EditCourse() {
  const notificationDispatch = useContext(NotificationContext)
  const { axiosGetResult, axiosGetError, setAxiosGetUrl, setAxiosGetToken, setAxiosGetId } = useAxiosGet();
  const { axiosPatchResult, axiosPatchIsPending, axiosPatchError, setAxiosPatchUrl, setAxiosPatchToken, setAxiosPatchData } = useAxiosPatch();
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
    price: {
      name: 'price',
      label: 'قیمت',
      placeholder: "قیمت دوره",
      pattern: "\\d*",
      required: true,
      maxLength: "5",
      type: 'text',
      errorMessage: 'قیمت را به عدد وارد کنید. اگر رایگان است 0 وارد کنید',
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
    duration: {
      name: 'duration',
      label: 'مدت زمان دوره',
      placeholder: "زمان دوره به ساعت",
      pattern: "^([1-9][0-9]{0,2})$",
      required: true,
      type: 'text',
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
    if (id === 'duration' || id === 'price') {
      if (!isNaN(value)) {
        setFormData({ ...formData, [id]: Number(value) });
      }
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
      setAxiosPatchData(formData);
      setAxiosPatchToken(authToken)
      setAxiosPatchUrl(`${apiLinks.courses}/${urlParams.courseId}`)
    }

  }
  const deleteHandler = () => {
    if (!isShowDeleteModal) {
      setIsShowDeleteModal(prev => !prev)
    } else {
      setAxiosDeleteUrl(`${apiLinks.courses}/${urlParams.courseId}`)
      setAxiosDeleteToken(authToken)
    }
  }
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
        axiosGetResult.data.forEach(item => {
          newCategoreisArray = [...newCategoreisArray, item.name]
        });
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
    if (axiosPatchResult !== null) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'تغییرات با موفقیت ذخیره شدند',
          status: 'success'
        }
      });
      navigateTo('/panel/courses')
    }
    if (axiosPatchError !== null) {
      console.log(axiosPatchError)
    }
  }, [axiosPatchError, axiosPatchResult]);
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
            {/* Buttons  */}
            <div className="buttons w-full xl:w-8/12 flex items-center gap-3">
              <div className={`w-4/12 xl:4/12 ${axiosDeleteIsPending && 'pointer-events-none'}`} >
                <SubmitFormButton isPending={axiosPatchIsPending} title={'ذخیره تغییرات'} />
              </div>
              <div className={`w-4/12 xl:4/12 ${axiosPatchIsPending || axiosDeleteIsPending ? 'pointer-events-none' : ''}`} >
                <CancelButton title='انصراف' />
              </div>
              <div className={`w-4/12 xl:4/12 ${axiosPatchIsPending && 'pointer-events-none'}`} >
                <DeleteButton onClickEvent={() => setIsShowDeleteModal(prev => !prev)} isPending={axiosDeleteIsPending} title='حذف دوره' />
              </div>
            </div>
            {/* End of Buttons  */}
          </form>
        </div>
        <Modal isShow={isShowDeleteModal} onClose={() => setIsShowDeleteModal(prev => !prev)}>
          <div className="w-full p-3 text-center font-bold">
            <h2 className="text-slate-800 mb-5 dark:text-slate-100">آیا دوره مورد نظر پاک شود؟</h2>
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
