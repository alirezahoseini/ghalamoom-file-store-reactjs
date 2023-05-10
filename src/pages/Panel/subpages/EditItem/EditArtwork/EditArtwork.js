import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";

// datas
import { apiLinks } from '../../../../../data/links'
// hooks
import useAxiosPut from "../../../../../hooks/axios/useAxiosPut";
import useAxiosGet from "../../../../../hooks/axios/useAxiosGet";
import useAxiosDelete from "../../../../../hooks/axios/useAxiosDelete";

// components
import NormalInput from "../../../components/Inputs/NormalInput";
import Textarea from "../../../components/Inputs/Textarea";
import ImageInput from "../../../components/Inputs/ImageInput";
import SubmitFormButton from "../../components/Buttons/SubmitFormButton";
import CancelButton from "../../components/Buttons/CancelButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import SimpleDataLoader from '../../../../../components/ui/SimpleDataLoader/SimpleDataLoader'
import Modal from '../../../../../components/ui/Modal'
import MultipleImageInput from "../../../components/Inputs/MultipleImageInput/MultipleImageInput";


export default function EditArtwork() {
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
      label: 'عنوان نمونه کار',
      placeholder: 'عنوان نمونه کار را وارد کنید',
      type: 'text',
      required: true,
      errorMessage: 'عنوان نمونه کار باید بین 5 الی 15 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{5,50}',
      maxLength: 50,
    },
    runTime: {
      name: 'runTime',
      label: 'زمان اجرا',
      placeholder: 'برای مثال : اسفند 1400 تا فروردین 1401',
      type: 'text',
      required: true,
      errorMessage: 'زمان اجرا باید بین 5 الی 35 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{5,35}',
      maxLength: 35,
    },
    description: {
      name: 'description',
      label: 'توضیحات',
      placeholder: 'توضیحات نمونه کار',
      required: true,
      errorMessage: 'توضیحات باید بین 40 الی 800 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{40,800}',
      maxLength: 800,
      minLength: 50,
      rows: '8'
    },
    image: {
      imageValue: '',
      inputId: 'new-artwork-image'
    },
    gallery: {
      imageValue: [],
      inputId: 'new-artwork-gallery'
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
    setAxiosPutUrl(`${apiLinks.artworks}/${urlParams.artworkId}`)
  }
  const deleteHandler = () => {
    setIsShowDeleteModal(prev => !prev)
    setAxiosDeleteUrl(`${apiLinks.artworks}/${urlParams.artworkId}`)
  }
  /////// loading prev course data from server
  useEffect(() => {
    setAxiosGetUrl(`${apiLinks.artworks}/${urlParams.artworkId}`)
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
        alert(`نمونه کاری با آیدی ${urlParams.artworkId} پیدا نشد.!`)
        navigateTo(-1)
      }
      setSimpleLoaderStatus('error')
    }
  }, [axiosGetError, axiosGetResult]);
  //////// save changes results
  useEffect(() => {
    // show update results
    if (axiosPutResult !== null) {
      alert('تغییرات با موفقیت ذخیره شدند');
    }
    if (axiosPutError !== null) {
      console.log(axiosPutError)
    }
  }, [axiosPutError, axiosPutResult]);
  ///////  Delete results
  useEffect(() => {
    if (axiosDeleteResult !== null) {
      alert('نمونه کار با موفقیت پاک شد');
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
                <NormalInput value={formData.runTime} onChangeEvent={changeHandler} {...inputsData.runTime} />
                <Textarea value={formData.description} onChangeEvent={changeHandler} {...inputsData.description} />
              </div>
              {/* End of Right Side - Text form  */}
              {/* Left side - select Image */}
              <div className="left-side xl:w-4/12">
                <ImageInput defaultImage={formData.image} onChnageHandler={changeHandler} />
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
                <DeleteButton onClickEvent={() => setIsShowDeleteModal(prev => !prev)} isPending={axiosDeleteIsPending} title='حذف نمونه کار' />
              </div>
            </div>
            {/* End of Buttons  */}
          </form>
        </div>
        <Modal isShow={isShowDeleteModal} onClose={() => setIsShowDeleteModal(prev => !prev)}>
          <div className="w-full p-3 text-center font-bold">
            <h2 className="text-slate-800 mb-5 dark:text-slate-100">آیا نمونه کار مورد نظر پاک شود؟</h2>
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
