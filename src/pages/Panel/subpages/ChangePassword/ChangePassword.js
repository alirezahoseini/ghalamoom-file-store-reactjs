import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { v4 } from 'uuid'

// contexts 
import { NotificationContext } from '../../../../Contexts/Notifications/NotificationProvider'
// datas
import { apiLinks } from '../../../../data/links';
// hooks
import useAxiosPost from "../../../../hooks/axios/useAxiosPost";
// Utils
import { getCooki } from '../../../../utils/cookis'

// components
import NormalInput from "../../components/Inputs/NormalInput";
import SubmitFormButton from "../components/Buttons/SubmitFormButton";
import CancelButton from "../components/Buttons/CancelButton";
import FormHeader from '../components/FormHeader/FormHeader';

// Assets 
import changePasswordImage from '../../../../assets/images/panel/confirm-email-page/password.webp'


export default function ChangePassword() {
    const notificationDispatch = useContext(NotificationContext)
    const { axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostData, setAxiosPostToken, setAxiosPostError } = useAxiosPost();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
    });
    const navigateTo = useNavigate()
    const inputsData = {
        oldPassword: {
            name: 'oldPassword',
            label: "رمزعبور فعلی",
            placeholder: "رمزعبور فعلی خود را وارد کنید",
            type: 'text',
            required: true,
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*)[A-Za-z\\d]{8,30}$",
            errorMessage: 'رمزعبور باید حداقل 8 کاراکتر که شامل حروف کوچک و بزرگ انگلیسی و یک عدد است باشد',
            maxLength: 30,
        },
        newPassword: {
            name: 'newPassword',
            label: "رمزعبور جدید",
            placeholder: "رمزعبور جدید را وارد کنید",
            type: 'text',
            required: true,
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*)[A-Za-z\\d]{8,30}$",
            errorMessage: 'رمزعبور باید حداقل 8 کاراکتر که شامل حروف کوچک و بزرگ انگلیسی و یک عدد است باشد',
            maxLength: 30,
        },

    }
    const authToken = getCooki('token')
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

    const submitHandler = (event) => {
        console.log('sended in change form')
        event.preventDefault();
        setAxiosPostToken(authToken)
        setAxiosPostData(formData);
        setAxiosPostUrl(apiLinks.login + '/change-password');
    }
    useEffect(() => {
        if (axiosPostResult !== null) {
            notificationDispatch({
                type: 'ADD_NOTE',
                payload: {
                    id: v4(),
                    message: "رمزعبور با موفقیت تغییر کرد",
                    status: 'success'
                }
            })
            navigateTo('/panel/dashboard')
        }
        if (axiosPostError !== null) {
            if (axiosPostError.status === 406) {
                notificationDispatch({
                    type: 'ADD_NOTE',
                    payload: {
                        id: v4(),
                        message: "رمز عبور فعلی اشتباه است",
                        status: 'error'
                    }
                })
            }
            console.log(axiosPostError)
            setAxiosPostError(null)
        }
    }, [axiosPostError, axiosPostResult])

    return (
        <div id="change-password-form ">
            <div className="p-3 my-1 text-xs">
                <FormHeader title='تغییر رمزعبور' />
            </div>
            <div className="wrapper w-full lg:w-6/12 flex flex-col xl:flex-row mx-auto px-2 mb-5">
                <form onSubmit={submitHandler} className="w-full bg-white p-4 rounded-2xl dark:bg-slate-800 ">
                    <section className="flex flex-col items-center justify-center">
                        {/* Left side - image  */}
                        <div className="left-side w-full lg:w-6/12 -mt-10">
                            <img src={changePasswordImage} alt="change password" className="w-full" />
                        </div>
                        {/* End of Left side - image  */}
                        {/* Right Side - Text form  */}
                        <div className=" w-full right-side -mt-10">
                            <NormalInput value={formData.oldPassword} onChangeEvent={changeHandler} {...inputsData.oldPassword} />
                            <NormalInput value={formData.newPassword} onChangeEvent={changeHandler} {...inputsData.newPassword} />
                            {/* Buttons  */}
                            <div className="buttons w-full flex items-center gap-3">
                                <div className="w-8/12 xl:w-5/12" >
                                    <SubmitFormButton isPending={axiosPostIsPending} title={'تغییر رمز عبور'} />
                                </div>
                                <div className={`w-4/12 xl:w-3/12 ${axiosPostIsPending && 'pointer-events-none'}`} >
                                    <CancelButton title={'لغو'} />
                                </div>
                            </div>
                            {/* End of Buttons  */}
                        </div>
                        {/* End of Right Side - Text form  */}
                    </section>
                </form>
            </div>
        </div>
    )
}
