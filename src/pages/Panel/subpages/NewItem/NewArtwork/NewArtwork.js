import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

// datas
import { apiLinks } from '../../../../../data/links';

// hooks
import useAxiosPost from "../../../../../hooks/axios/useAxiosPost";

// components
import NormalInput from "../../../components/Inputs/NormalInput";
import Textarea from "../../../components/Inputs/Textarea";
import ImageInput from "../../../components/Inputs/ImageInput";
import SubmitFormButton from "../../components/Buttons/SubmitFormButton";
import CancelButton from "../../components/Buttons/CancelButton";
import MultipleImageInput from "../../../components/Inputs/MultipleImageInput/MultipleImageInput";

export default function NewArtwork() {
    const { axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostData } = useAxiosPost();
    const [formData, setFormData] = useState({
        title: '',                             /// max length 70 
        image: '',                             /// dataurl image
        runTime: '',                           ///  
        description: '',                       /// max length 400
        gallery: [],                          /// 
        likes: 0,                              /// default [] not change here
        comments: [],                          /// default 0 not change here
        created_at: new Date().getTime()
    });
    const navigateTo = useNavigate()
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
        event.preventDefault();
        setAxiosPostData(formData)
        setAxiosPostUrl(apiLinks.artworks)
    }
    useEffect(() => {
        if (axiosPostResult !== null) {
            alert('نمونه کار شما با موفقیت منتشر شد');
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
                            <ImageInput defaultImage={formData.image} onChnageHandler={changeHandler} />
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
