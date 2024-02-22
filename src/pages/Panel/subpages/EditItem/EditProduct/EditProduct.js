import { useEffect, useState, useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../../Contexts/Notifications/NotificationProvider'
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
import InStockRadio from "../../../components/Inputs/InStockRadio";
import SelectBox from "../../../components/Inputs/SelectBox";
import PriceInput from "../../../components/Inputs/PriceInput";
import ImageInput from "../../../components/Inputs/ImageInput/ImageInput";
import SubmitFormButton from "../../components/Buttons/SubmitFormButton";
import CancelButton from "../../components/Buttons/CancelButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import SimpleDataLoader from '../../../../../components/ui/SimpleDataLoader/SimpleDataLoader'
import Modal from '../../../../../components/ui/Modal'
import MultipleImageInput from "../../../components/Inputs/MultipleImageInput/MultipleImageInput";

export default function EditProduct() {
  const notificationDispatch = useContext(NotificationContext)
  const { axiosGetResult, axiosGetError, setAxiosGetUrl, setAxiosGetToken, setAxiosGetId } = useAxiosGet();
  const { axiosPatchResult, axiosPatchIsPending, axiosPatchError, setAxiosPatchUrl, setAxiosPatchData, setAxiosPatchToken } = useAxiosPatch()
  const { axiosDeleteResult, axiosDeleteIsPending, axiosDeleteError, setAxiosDeleteUrl, setAxiosDeleteToken } = useAxiosDelete();
  const [isLoadedDataFromApi, setIsLoadedDataFromApi] = useState(false)
  const [simpleLoaderStatus, setSimpleLoaderStatus] = useState('load')
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [loadCategoriesStatus, setLoadCategoriesStatus] = useState('loading');
  const [categoryArray, setCategoryArray] = useState([])
  const [formData, setFormData] = useState();
  const navigateTo = useNavigate();
  const authToken = getCooki('token');
  const urlParams = useParams()
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
      minLength: 30,
      rows: '2',
      require: 'true'
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
      require: 'true'
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
        { name: 'ZIP', id: 'ZIP' },
        { name: 'PNG', id: 'PNG' },
        { name: 'JPG', id: 'JPG' },
        { name: 'AI', id: 'AI' },
        { name: 'PSD', id: 'PSD' },
        { name: 'TTF', id: 'TTF' },
        { name: 'MP4', id: 'MP4' },
      ]
    },
    price: {
      name: 'price',
      label: 'قیمت',
      placeholder: "قیمت محصول",
      pattern: "\\d*",
      type: 'number',
      required: true,
      maxLength: "5",
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
      name: 'image'
    },
    gallery: {
      imageValue: [],
      inputId: 'new-product-gallery'
    }
  }
  const changeHandler = ({ id, value }) => {

    if (id === 'fileSize') {
      setFormData({ ...formData, [id]: Number(value) });
      return
    }
    if (id === 'category') {
      setFormData({ ...formData, [id]: value });
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
    } else if (!formData.image) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'لطفا تصویر شاخص را انتخاب نمایید',
          status: 'warning'
        }
      })
    } else if (!formData.category) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'لطفا دسته بندی را انتخاب نمایید',
          status: 'warning'
        }
      })
    } else {
      setAxiosPatchToken(authToken);
      setAxiosPatchData(formData)
      setAxiosPatchUrl(`${apiLinks.products}/${urlParams.productId}`)
    }
  }
  const deleteHandler = () => {
    if (!isShowDeleteModal) {
      setIsShowDeleteModal(prev => !prev)
    } else {
      setAxiosDeleteUrl(`${apiLinks.products}/${urlParams.productId}`);
      setAxiosDeleteToken(authToken)
    }
  }
  // Get categoreis form server
  const getCategories = () => {
    setAxiosGetToken(authToken);
    setAxiosGetUrl(`${apiLinks.categories}?type=Product`);
    setAxiosGetId('LOADING-CATEGOREIS')
    setLoadCategoriesStatus('loading');
  }
  /////// loading prev product data from server
  useEffect(() => {
    setAxiosGetUrl(`${apiLinks.products}/${urlParams.productId}`)
    setAxiosGetToken(authToken);
    setAxiosGetId('LOADING-DATA');
  }, [])
  /////// set prev data to inputs and showing
  useEffect(() => {
    if (axiosGetResult !== null) {
      ///// LOADING AND SET PERV DATA  
      if (axiosGetResult.id === 'LOADING-DATA') {
        const { saleCount, category, fileSize, format, gallery, image, inStock, longDes, shortDes, price, title } = axiosGetResult.data;
        const newGallery = gallery.map(item => {
          return item.image
        });
        const requiredValues = {
          saleCount,
          category: category.name,
          gallery: newGallery,
          fileSize, format
          , image, inStock, longDes, shortDes, price, title
        };
        setFormData(requiredValues);
        setSimpleLoaderStatus('hidde');
        setIsLoadedDataFromApi(true);
        getCategories();

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
              message: `محصولی با آیدی ${urlParams.productId} پیدا نشد.!`,
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
      console.log(axiosPatchResult)
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'تغییرات با موفقیت ذخیره شدند',
          status: 'success'
        }
      });

      setTimeout(() => {
        navigateTo('/panel/products')
      }, 2000);
    }
    if (axiosPatchError !== null) {
      notificationDispatch({
        type: 'ADD_NOTE',
        payload: {
          id: v4(),
          message: 'تغییرات اعمال نشدند',
          status: 'error'
        }
      })
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
                <div className="w-full flex-col xl:flex-row flex justify-start relative mb-5 mt-3">
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
                    <InStockRadio value={formData.inStock} onChangeEvent={changeHandler} {...inputsData.inStock} />
                  </div>
                </div>
                <div className="w-full flex-col xl:flex-row flex justify-start items-center relative mb-5 mt-3">
                  <div className="w-full xl:w-6/12">
                    <SelectBox value={{ name: formData.format, id: formData.format }} onChangeEvent={changeHandler} {...inputsData.format} />
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
                <ImageInput defaultImage={formData.image} onChnageHandler={changeHandler} {...inputsData.image} />
                <MultipleImageInput defaultImages={formData.gallery} onChnageHandler={galleryChangeHandler} {...inputsData.gallery} />
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
