import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../../Contexts/Notifications/NotificationProvider'

// datas
import { apiLinks } from '../../../../../data/links';
// Utils
import { getCooki } from '../../../../../utils/cookis'

// hooks
import useAxiosPost from "../../../../../hooks/axios/useAxiosPost";

// components
import NormalInput from "../../../components/Inputs/NormalInput";
import Textarea from "../../../components/Inputs/Textarea";
import ImageInput from "../../../components/Inputs/ImageInput/ImageInput";
import SubmitFormButton from "../../components/Buttons/SubmitFormButton";
import CancelButton from "../../components/Buttons/CancelButton";
import MultipleImageInput from "../../../components/Inputs/MultipleImageInput/MultipleImageInput";

export default function NewArtwork() {
    const notificationDispatch = useContext(NotificationContext);
    const authToken = getCooki('token');
    const { axiosPostResult, axiosPostIsPending, axiosPostError,setAxiosPostToken, setAxiosPostUrl, setAxiosPostData } = useAxiosPost();
    const [formData, setFormData] = useState({
        title: '',                             /// max length 70 
        image: '',                             /// dataurl image
        runTime: '',                           ///  
        description: '',                       /// max length 400
        gallery: [],                          /// 
    });
    const navigateTo = useNavigate()
    const inputsData = {
        title: {
            name: 'title',
            label: 'عنوان نمونه کار',
            placeholder: 'عنوان نمونه کار را وارد کنید',
            type: 'text',
            required: true,
            errorMessage: 'عنوان نمونه کار باید بین 5 الی 20 کلمه باشد',
            pattern: '^[\\w\u0600-\u06FF\\s–]{5,20}',
            maxLength: 20,
        },
        runTime: {
            name: 'runTime',
            label: 'زمان اجرا',
            placeholder: 'برای مثال : اسفند 1400 یا فروردین 1401',
            type: 'text',
            required: true,
            errorMessage: 'زمان اجرا باید بین 5 الی 20 کلمه باشد',
            pattern: '^[\\w\u0600-\u06FF\\s]{5,20}',
            maxLength: 20,
        },
        description: {
            name: 'description',
            label: 'توضیحات',
            placeholder: 'توضیحات نمونه کار',
            required: true,
            errorMessage: 'توضیحات باید بین 40 الی 800 کلمه باشد',
            pattern: '^[\\w\u0600-\u06FF\\s]{40,800}',
            maxLength: 800,
            minLength: 40,
            rows: '8'
        },
        image: {
            imageValue: '',
            name: 'image'
        },
        gallery: {
            imageValue: [],
            inputId: 'new-artwork-gallery'
        }
    }
    const changeHandler = ({ id, value }) => {
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
          }else {
            // console.log(formData)
            setAxiosPostToken(authToken);
            setAxiosPostData(formData);
            setAxiosPostUrl(apiLinks.artworks);
          }
    }
    useEffect(() => {
        if (axiosPostResult !== null) {
            notificationDispatch({
                type: 'ADD_NOTE',
                payload: {
                    id: v4(),
                    message: 'نمونه کار شما با موفقیت منتشر شد',
                    status: 'success'
                }
            })
            navigateTo('/panel/artworks')
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
                            <NormalInput value={formData.runTime} onChangeEvent={changeHandler} {...inputsData.runTime} />
                            <Textarea value={formData.description} onChangeEvent={changeHandler} {...inputsData.description} />
                        </div>
                        {/* End of Right Side - Text form  */}
                        {/* Left side - select Image */}
                        <div className="left-side xl:w-4/12">
                            <ImageInput defaultImage={formData.image} onChnageHandler={changeHandler} {...inputsData.image}/>
                            <MultipleImageInput defaultImages={formData.gallery} onChnageHandler={galleryChangeHandler} {...inputsData.gallery} />
                        </div>
                        {/* End of Left side - select Image */}
                    </section>
                    <div className="buttons w-full flex items-center gap-3">
                        <div className="w-8/12 xl:w-5/12" >
                            <SubmitFormButton isPending={axiosPostIsPending} title={'انتشار نمونه کار'} />
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
