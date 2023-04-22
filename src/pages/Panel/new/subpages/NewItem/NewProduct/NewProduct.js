import { useEffect, useState } from "react"
import { Link , useNavigate } from "react-router-dom";

// assets
import imageDefault from '../../../../../../assets/images/panel/imageDefault'

// hooks
import useAxiosPost from "../../../../../../hooks/axios/useAxiosPost";

// components
import NormalInput from "../components/Inputs/NormalInput";
import Textarea from "../components/Inputs/Textarea";
import InStockRadio from "../components/Inputs/InStockRadio";
import SelectCategory from "../components/Inputs/SelectBox";
import SelectBox from "../components/Inputs/SelectBox";
import PriceInput from "../components/Inputs/PriceInput";
import ImageInput from "../components/Inputs/ImageInput";
import SubmitFormButton from "../components/Inputs/SubmitFormButton";

export default function NewProduct() {
  const {axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostData} = useAxiosPost();
  const [formData, setFormData] = useState({
    title: '',                             /// max length 70 
    inStock: 'true',                      /// default true 
    image: imageDefault[0],               /// dataurl image
    price: 0,                             /// the price is in thousand tomans, like 20 
    fileSize: 0,                          /// file size in megabytes
    miniDes: '',                          /// max length 180
    largeDes: '',                         /// max length 400
    saleCount: 0,                         /// default 0 not change here
    likes: 0,                             /// default 0 not change here
    downloadCount: 0,                     /// default 0 not change here
    category: { "name":"بدون دسته", "id": "null" },     /// chooseing from select box
    format: { "name":" فایل zip", "id": "zip" },          /// chooseing from select box
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
        { name: 'پوستر', id: 'poster' },
        { name: 'موکاپ', id: 'mockup' },
        { name: 'پک استیکر', id: 'sticker-pack' },
        { name: 'کاور پست', id: 'post-cover' },
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
    event.preventDefault()
    setAxiosPostData(formData)
    setAxiosPostUrl('https://x8ki-letl-twmt.n7.xano.io/api:hq-tx9uX/products')
  }
  useEffect(()=> {
    if(axiosPostResult !== null){
      alert('محصول با موفقیت ایجاد شد');
      navigateTo('/panel/products')
    }
    if(axiosPostError !== null){
      console.log()
    }
  }, [axiosPostError, axiosPostResult])

  return (
    <div id="new-product-form">
      <div className="wrapper w-full flex flex-col xl:flex-row p-4 rounded-2xl bg-white my-3 dark:bg-slate-800 ">
        <form onSubmit={submitHandler} className="w-full">
          <section className="flex flex-col xl:flex-row">
            {/* Right Side - Text form  */}
            <div className="right-side xl:w-8/12">
              <NormalInput onChangeEvent={changeHandler} {...inputsData.title} />
              <Textarea onChangeEvent={changeHandler} {...inputsData.miniDes} />
              <div className="w-full flex-col xl:flex-row flex justify-start relative mb-5 mt-3">
                <div className="w-full xl:w-6/12">
                  <SelectBox onChangeEvent={changeHandler} {...inputsData.category} />
                </div>
                <div className="w-full xl:w-6/12">
                  <InStockRadio onChangeEvent={changeHandler} {...inputsData.inStock} />
                </div>
              </div>
              <div className="w-full flex-col xl:flex-row flex justify-start items-center relative mb-5 mt-3">
                <div className="w-full xl:w-6/12">
                  <SelectBox onChangeEvent={changeHandler} {...inputsData.format} />
                </div>
                <div className="w-full xl:w-6/12">
                  <PriceInput onChangeEvent={changeHandler} {...inputsData.price} />
                </div>
              </div>
              <NormalInput onChangeEvent={changeHandler} {...inputsData.fileSize} />
              <Textarea onChangeEvent={changeHandler} {...inputsData.largeDes} />
            </div>
            {/* End of Right Side - Text form  */}
            {/* Left side - select Image */}
            <div className="left-side xl:w-4/12">
              <ImageInput onChnageHandler={changeHandler} {...inputsData.image} />
            </div>
            {/* End of Left side - select Image */}
          </section>
          <div className="buttons w-full flex items-center gap-3">
            <div className="w-6/12 lg:w-3/12" >
              <SubmitFormButton isPending={axiosPostIsPending} title={'ایجاد محصول'} />
            </div>
            <div className="w-6/12 lg:w-3/12" >
              <Link to={-1} className={`text-orange-950 font-bold w-full py-3 px-4 rounded-lg shadow-both-0 bg-orange-200 hover:bg-orange-300 transition-all duration-300 mt-6 flex justify-center items-center dark:bg-orange-900 dark:text-violet-100 dark:hover:bg-orange-950 ${axiosPostIsPending && 'opacity-50 pointer-events-none'}`} >
                لغو
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
