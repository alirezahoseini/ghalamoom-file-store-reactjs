import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

// datas
import { apiLinks } from '../../../../../data/links';

// hooks
import useAxiosPost from "../../../../../hooks/axios/useAxiosPost";

// components
import NormalInput from "../../../components/Inputs/NormalInput";
import Textarea from "../../../components/Inputs/Textarea";
import SelectBox from "../../../components/Inputs/SelectBox";
import PriceInput from "../../../components/Inputs/PriceInput";
import ImageInput from "../../../components/Inputs/ImageInput";
import SubmitFormButton from "../../components/Buttons/SubmitFormButton";
import CancelButton from "../../components/Buttons/CancelButton";

export default function NewCourse() {
  const { axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostData } = useAxiosPost();
  const [formData, setFormData] = useState({
    title: '',                            /// max length 70 
    image: '',                            /// dataurl image
    price: '',                            /// the price is in thousand tomans, like 20 
    fileSize: '',                         /// file size in megabytes
    miniDes: '',                          /// max length 180
    largeDes: '',                         /// max length 400
    time: '',                             /// course time
    likes: 0,                             /// default [] not change here
    comments: [],                         /// default 0 not change here
    studentCount: 0,                      /// default 0 not change here
    wayReceive: { "name": "دانلودی", "id": "download" },             /// chooseing from select box
    support: { "name": "تیکت", "id": "ticket" },                     /// chooseing from select box
    category: { "name": "بدون دسته", "id": "null" },                 /// chooseing from select box
    prerequisite: { "name": "بدون پیش نیاز", "id": "null" },         /// chooseing from select box
    level: { "name": "مبتدی", "id": "beginner" },                          /// chooseing from select box
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
      pattern: '^[\\w\u0600-\u06FF\\s]{5,50}',
      maxLength: 50,
    },
    miniDes: {
      name: 'miniDes',
      label: 'توضیح کوتاه',
      placeholder: 'دوره را در حد یک خط توصیف کنید',
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
      placeholder: 'توضیحات دوره',
      required: true,
      errorMessage: 'توضیحات باید بین 40 الی 400 کلمه باشد',
      pattern: '^[\\w\u0600-\u06FF\\s]{40,400}',
      maxLength: 400,
      minLength: 50,
      rows: '5'
    },
    prerequisite: {
      selectBoxName: 'prerequisite',
      label: 'پیشنیاز',
      items: [
        { name: "بدون پیش نیاز", id: 'null' },
        { name: 'دوره ایلوستریتور مقدماتی', id: 'illu-base' },
        { name: 'دوره ایلوستریتور متوسط', id: 'illu-midd' },
        { name: 'دوره ایلوستریتور پیشرفته', id: 'illu-advance' },
        { name: 'دوره فوتوشاپ مقدماتی', id: 'photo-base' },
        { name: 'دوره فوتوشاپ متوسط', id: 'photo-midd' },
        { name: 'دوره فوتوشاپ پیشرفته', id: 'photo-advance' },
      ]
    },
    category: {
      selectBoxName: 'category',
      label: 'دسته بندی',
      items: [
        { name: 'بدون دسته', id: 'null' },
        { name: 'گرافیک', id: 'graphic' },
        { name: 'طراحی', id: 'art' },
      ]
    },
    wayReceive: {
      selectBoxName: 'wayReceive',
      label: 'شیوه دریافت',
      items: [
        { name: 'دانلودی', id: 'download' },
        { name: 'اسپات پلیر', id: 'spotplayer' },
        { name: 'تماشای آنلاین', id: 'online' },
      ]
    },
    level: {
      selectBoxName: 'level',
      label: 'سطح دوره',
      items: [
        { name: 'مبتدی', id: 'beginner' },
        { name: 'متوسط', id: 'middle' },
        { name: 'پیشرفته', id: 'advanced' },
      ]
    },
    support: {
      selectBoxName: 'support',
      label: 'پشتیبانی',
      items: [
        { name: 'تیکت', id: 'ticket' },
        { name: 'تلفنی + تیکت', id: 'call-ticket' },
        { name: 'تلفنی + تیکت + واتساپ', id: 'call-ticket-whatsapp' },
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
    time: {
      name: 'time',
      label: 'مدت زمان دوره',
      placeholder: "زمان دوره به ساعت",
      pattern: "^([1-9]{1,3})$",
      required: true,
      maxLength: "3",
      errorMessage: 'مدت زمان دوره باید بین 1 الی 999 ساعت باشد ',
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
      inputId: 'new-course-image'
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
      setFormData({ ...formData, [event.target.name]: JSON.stringify(selectedItem) })
    } else {
      // Normal inputs
      setFormData({ ...formData, [event.target.name]: event.target.value })
    }
  }
  const submitHandler = (event) => {
    event.preventDefault();
    setAxiosPostData(formData)
    setAxiosPostUrl(apiLinks.courses)
  }
  useEffect(() => {
    if (axiosPostResult !== null) {
      alert('دوره با موفقیت منتشر شد');
      navigateTo('/panel/courses')
    }
    if (axiosPostError !== null) {
      console.log(axiosPostError)
    }
  }, [axiosPostError, axiosPostResult])

  return (
    <div id="new-product-form">
      <div className="wrapper w-full flex flex-col xl:flex-row p-4 rounded-2xl bg-white my-3 dark:bg-slate-800 ">
        <form onSubmit={submitHandler} className="w-full">
          <section className="flex flex-col xl:flex-row">
            {/* Right Side - Text form  */}
            <div className="right-side xl:w-8/12">
              <NormalInput value={formData.title} onChangeEvent={changeHandler} {...inputsData.title} />
              <Textarea value={formData.miniDes} onChangeEvent={changeHandler} {...inputsData.miniDes} />
              <div className="w-full flex-col xl:flex-row xl:items-center flex justify-start relative mb-5 mt-3">
                <div className="w-full xl:w-6/12">
                  <SelectBox value={formData.category} onChangeEvent={changeHandler} {...inputsData.category} />
                </div>
                <div className="w-full xl:w-6/12">
                <SelectBox value={formData.level} onChangeEvent={changeHandler} {...inputsData.level} />
                </div>
              </div>
              <div className="w-full flex-col xl:flex-row xl:items-center flex justify-start relative mb-5 mt-3">
                <div className="w-full xl:w-6/12">
                  <SelectBox value={formData.wayReceive} onChangeEvent={changeHandler} {...inputsData.wayReceive} />
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
              <NormalInput value={formData.time} onChangeEvent={changeHandler} {...inputsData.time} />
              <NormalInput value={formData.fileSize} onChangeEvent={changeHandler} {...inputsData.fileSize} />
              <Textarea value={formData.largeDes} onChangeEvent={changeHandler} {...inputsData.largeDes} />
            </div>
            {/* End of Right Side - Text form  */}
            {/* Left side - select Image */}
            <div className="left-side xl:w-4/12">
              <ImageInput defaultImage={formData.image} onChnageHandler={changeHandler} {...inputsData.image} />
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
