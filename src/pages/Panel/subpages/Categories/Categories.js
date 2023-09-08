import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../Contexts/Notifications/NotificationProvider'
// datas
import { apiLinks } from '../../../../data/links';
// Utils
import { getCooki } from '../../../../utils/cookis'
// hooks
import useAxiosPost from "../../../../hooks/axios/useAxiosPost";
// components
import NormalInput from "../../components/Inputs/NormalInput";
import Textarea from "../../components/Inputs/Textarea";
import SelectBox from "../../components/Inputs/SelectBox";
import PriceInput from "../../components/Inputs/PriceInput";
import ImageInput from "../../components/Inputs/ImageInput";
import SubmitFormButton from "../components/Buttons/SubmitFormButton";
import CancelButton from "../components/Buttons/CancelButton";
import MultipleImageInput from "../../components/Inputs/MultipleImageInput/MultipleImageInput";

export default function Categories() {
    const notificationDispatch = useContext(NotificationContext)
    const { axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostData, setAxiosPostToken, setAxiosPostError } = useAxiosPost();
    const authToken = getCooki('token')
    const [formData, setFormData] = useState({
        name: "محصول",                                                  /// max length 70 
        type: 'Product',                                                /// chooseing from select box

    });
    const navigateTo = useNavigate();
    const inputsData = {
        name: {
            name: 'name',
            label: 'نام دسته',
            placeholder: 'نام دسته را وارد کنید',
            type: 'text',
            required: true,
            errorMessage: 'عنوان محصول باید بین 3 الی 20 کلمه باشد',
            pattern: '^[\\w\u0600-\u06FF\\s]{3,20}',
            maxLength: 20,
        },
        type: {
            selectBoxName: 'type',
            label: "نوع دسته",
            items: [
                { name: "محصول", id: 'Product' },
                { name: "دوره", id: 'Course' },
                { name: "نمونه کار", id: 'Artwork' },
            ]
        },
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
        console.log(formData)
        event.preventDefault();
        setAxiosPostToken(authToken);
        setAxiosPostData(formData);
        setAxiosPostUrl(apiLinks.products);
    }
    useEffect(() => {
        if (axiosPostResult !== null) {
            console.log(axiosPostResult)
            notificationDispatch({
                type: 'ADD_NOTE',
                payload: {
                    id: v4(),
                    message: 'محصول با موفقیت ایجاد شد',
                    status: 'success'
                }
            })
            // navigateTo('/panel/products')
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
                            <NormalInput value={formData.name} onChangeEvent={changeHandler} {...inputsData.name} />
                            <div className="w-full flex-col xl:flex-row flex justify-start relative mb-5 mt-3">
                                <div className="w-full xl:w-6/12">
                                    <SelectBox value={formData.type} onChangeEvent={changeHandler} {...inputsData.type} />
                                </div>
                            </div>
                        </div>
                        {/* End of Right Side - Text form  */}
                        {/* Left side - select Image */}
                        <div className="left-side xl:w-4/12">
                            left
                        </div>
                        {/* End of Left side - select Image */}
                    </section>
                    <div className="buttons w-full flex items-center gap-3">
                        <div className="w-8/12 xl:w-5/12" >
                            <SubmitFormButton isPending={axiosPostIsPending} name={'ایجاد محصول'} />
                        </div>
                        <div className={`w-4/12 xl:w-3/12 ${axiosPostIsPending && 'pointer-events-none'}`} >
                            <CancelButton name={'لغو'} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
