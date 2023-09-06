import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { v4 } from 'uuid'

// contexts
import { NotificationContext } from '../../../../Contexts/Notifications/NotificationProvider'

// datas
import { apiLinks } from "../../../../data/links";

// utils
import { deleteCooki, getCooki } from '../../../../utils/cookis'

// hooks
import useAxiosPatch from '../../../../hooks/axios/useAxiosPatch'
import useAxiosGet from "../../../../hooks/axios/useAxiosGet";

// components
import FormHeader from '../components/FormHeader/FormHeader'
import NormalInput from "../../components/Inputs/NormalInput";
import Textarea from "../../components/Inputs/Textarea";
import SubmitFormButton from "../components/Buttons/SubmitFormButton";
import CancelButton from "../components/Buttons/CancelButton";
import SimpleDataLoader from "../../../../components/ui/SimpleDataLoader/SimpleDataLoader";
import Avatar from './Avatar/Avatar'

export default function EditProfile() {
    const notificationDispatch = useContext(NotificationContext)
    const { axiosGetResult, axiosGetError, setAxiosGetUrl, setAxiosGetToken } = useAxiosGet();
    const { axiosPatchResult, axiosPatchIsPending, axiosPatchError, setAxiosPatchUrl, setAxiosPatchData } = useAxiosPatch();
    const [isLoadedDataFromApi, setIsLoadedDataFromApi] = useState(false)
    const [simpleLoaderStatus, setSimpleLoaderStatus] = useState('load')
    const [formData, setFormData] = useState();
    const navigateTo = useNavigate()
    const inputsData = {
        name: {
            name: 'name',
            label: 'نام',
            placeholder: 'اسم خود را به فارسی بنویسید',
            type: 'text',
            required: true,
            errorMessage: 'اسم شما باید بین 3 الی 15 کلمه فارسی باشد',
            pattern: '^[\u0600-\u06FF\\s]{3,15}',
            maxLength: 15,
        },
        email: {
            id: 'email',
            label: 'ایمیل (غیر قابل تغییر)',
            name: 'email',
            type: 'email',
            placeholder: 'ایمیل خود را وارد کنید',
            pattern: '^[a-zA-Z0-9_.+-]{3,30}@[a-zA-Z0-9-]{3,15}\\.[a-zA-Z0-9-.]{2,5}$',
            errorMessage: 'ایمیل باید معتبر باشد مثل: myname@gmail.com',
            required: true,
            disabled: '{true}'
        },
        bio: {
            name: 'bio',
            label: ' بیوگرافی (اختیاری) ',
            placeholder: 'چند خط در مورد خود بنویسید',
            required: false,
            errorMessage: 'بیوگرافی باید بین 30 الی 150 کلمه باشد',
            pattern: '^[\\w\u0600-\u06FF\\s]{30,150}',
            maxLength: 150,
            minLength: 30,
            rows: '2'
        },
        age: {
            name: 'age',
            label: "سن (اختیاری)",
            placeholder: 'سن خود را وارد کنید',
            pattern: "^([1-9][0-9\\.]{0,3}|100)$",
            required: false,
            maxLength: "3",
            errorMessage: 'سن خود را به عدد وارد کنید',
        },
        userAvatar: {
            bgColor: '#4ea8de',
            avatar: {
                id: 8,
                image: '/images/avatars/Aavatar-5.webp'
            }
        }
    }
    const userId = getCooki('userid');
    const authToken = getCooki('token');
    const changeHandler = (event) => {
        // Image 
        if (event.bgColor) {
            setFormData({ ...formData, avatar: event })
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
        event.preventDefault()
        setAxiosPatchData(formData)
        setAxiosPatchUrl(`${apiLinks.users}/${userId}`)
    }
    /////// loading user info from server
    useEffect(() => {
        setAxiosGetUrl(`${apiLinks.users}/profile`)
        setAxiosGetToken(authToken)
    }, [])
    /////// set prev data to inputs and showing
    useEffect(() => {
        if (axiosGetResult !== null) {
            console.log(axiosGetResult)
            const { password, ...otherValues } = axiosGetResult;
            setFormData(otherValues)
            setSimpleLoaderStatus('hidde')
            setIsLoadedDataFromApi(true)
        }
        if (axiosGetError !== null) {
            console.log(axiosGetError)
            if (axiosGetError.status === 404) {
                navigateTo('/panel/')
            }
            setSimpleLoaderStatus('error')
        }
    }, [axiosGetError, axiosGetResult]);
    /////// update profile
    useEffect(() => {
        // show update results
        if (axiosPatchResult !== null) {
            notificationDispatch({
                type: 'ADD_NOTE',
                id: v4(),
                payload: {
                    message: 'تغییرات با موفقیت ذخیره شدند',
                    status: 'success'
                }
            })

            // reload window after seved changes
            setTimeout(() => {
                window.location.reload();
                deleteCooki('avatarImg')
                deleteCooki('bgColorCode')
                deleteCooki('username')
            }, 2000);
        }
        if (axiosPatchError !== null) {
            notificationDispatch({
                type: 'ADD_NOTE',
                id: v4(),
                payload: {
                    message: "تغییرات ذخیره نشدند.!",
                    status: 'error'
                }
            })
            console.log(axiosPatchError)
        }
    }, [axiosPatchError, axiosPatchResult]);

    return (
        isLoadedDataFromApi ? (
            <div id='edit-profile' className="my-3 p-2 text-xs">
                <FormHeader title={'ویرایش حساب کاربری'} />
                <div className="wrapper w-full flex flex-col xl:flex-row p-4 rounded-2xl bg-white my-3 dark:bg-slate-800 ">
                    <form onSubmit={submitHandler} className="w-full relative">
                        <section className="flex flex-col xl:flex-row">
                            {/* Right Side - Text form  */}
                            <div className="right-side xl:w-8/12">
                                <NormalInput {...inputsData.name} onChangeEvent={changeHandler} value={formData.name} />
                                <NormalInput {...inputsData.email} onChangeEvent={changeHandler} value={formData.email} />
                                <Textarea {...inputsData.bio} onChangeEvent={changeHandler} value={formData.bio} />
                                <NormalInput {...inputsData.age} onChangeEvent={changeHandler} value={formData.age} />
                            </div>
                            {/* End of Right Side - Text form  */}
                            {/* Left side - select Image */}
                            <div className="left-side xl:w-4/12">
                                <Avatar {...formData.avatar} onChangeEvent={changeHandler} />
                            </div>
                            {/* End of Left side - select Image */}
                        </section>
                        <div className="buttons w-full flex items-center gap-3">
                            <div className="w-8/12 xl:w-5/12" >
                                <SubmitFormButton isPending={axiosPatchIsPending} title='ذخیره تغییرات' />
                            </div>
                            <div className={`w-4/12 xl:w-3/12 ${axiosPatchIsPending && 'pointer-events-none'}`} >
                                <CancelButton title={'لغو'} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        ) : (
            <SimpleDataLoader status={simpleLoaderStatus} />
        )

    )
}
