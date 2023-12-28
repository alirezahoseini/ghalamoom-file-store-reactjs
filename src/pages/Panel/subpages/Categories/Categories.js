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
import useAxiosGet from "../../../../hooks/axios/useAxiosGet";
import useAxiosDelete from "../../../../hooks/axios/useAxiosDelete";
// components
import NormalInput from "../../components/Inputs/NormalInput";
import SimpleDataLoader from "../../../../components/ui/SimpleDataLoader/SimpleDataLoader";
import SelectBox from "../../components/Inputs/SelectBox";
import SubmitFormButton from "../components/Buttons/SubmitFormButton";
import CancelButton from "../components/Buttons/CancelButton";
import CategoryItem from "./CategoryItem";




export default function Categories() {
    const notificationDispatch = useContext(NotificationContext)
    const { axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostResult, setAxiosPostData, setAxiosPostToken, setAxiosPostError } = useAxiosPost();
    const { axiosGetResult, axiosGetError, setAxiosGetUrl, setAxiosGetToken } = useAxiosGet();
    const { axiosDeleteResult, axiosDeleteIsPending, axiosDeleteError, setAxiosDeleteUrl, setAxiosDeleteData, setAxiosDeleteToken, setAxiosDeleteError, setAxiosDeleteResult, axiosDeleteUrl } = useAxiosDelete()
    const [simpleDataLoaderStatus, setSimpleDataLoaderStatus] = useState('load')
    const authToken = getCooki('token');
    const adminAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTcwMjY2MTg0Nn0.q3dV3tfrc3gvJIP6hKP4xUkTAba4ietEwfEqGk42lLk'
    const [categories, setCategories] = useState([]);
    const [selectedId, setSelectedId] = useState(null)
    const [formData, setFormData] = useState({
        name: "",                                                  /// max length 70 
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
            errorMessage: 'عنوان دسته باید بین 3 الی 20 کلمه باشد',
            // pattern: '',
            maxLength: 20,
            minLength: 3
        },
        type: {
            selectBoxName: 'type',
            label: "نوع دسته",
            items: [
                { name: "محصول", id: 'Product' },
                { name: "دوره", id: 'Course' },
            ]
        },
    }
    const changeHandler = (event) => {
        // Image 
        if (event.target.className.includes('custom-select-box-input')) {
            setFormData({ ...formData, [event.target.name]: event.target.value })
        } else {
            setFormData({ ...formData, [event.target.name]: event.target.value })
        }
    }
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(formData)
        setAxiosPostToken(adminAuthToken);
        setAxiosPostData(formData);
        setAxiosPostUrl(apiLinks.categories);
    }
    const removeHandler = (categoryId) => {
        setAxiosDeleteUrl(`${apiLinks.categories}/${categoryId}`);
        setAxiosDeleteToken(adminAuthToken)
        setSelectedId(categoryId);
    }
    // create category
    useEffect(() => {
        if (axiosPostResult !== null && axiosPostError === null) {
            notificationDispatch({
                type: 'ADD_NOTE',
                payload: {
                    id: v4(),
                    message: 'دسته با موفقیت ایجاد شد',
                    status: 'success'
                }
            })
            setAxiosPostResult(null)
            setCategories(prev => [...prev, axiosPostResult])
        }
        if (axiosPostError !== null) {
            if (axiosPostError.status === 409) {
                notificationDispatch({
                    type: 'ADD_NOTE',
                    payload: {
                        id: v4(),
                        message: 'این دسته قبلا ایجاد شده است',
                        status: 'error'
                    }
                })
                setAxiosPostError(null)
            }
        }
    }, [axiosPostError, axiosPostResult])
    // Remove category
    useEffect(() => {
        if (axiosDeleteResult !== null && selectedId !== null) {
            let newCategoreis = [...categories]
            const filtredCategories = newCategoreis.filter(item => {
                return item.id !== selectedId
            })
            newCategoreis = filtredCategories;
            setCategories(newCategoreis)

            setSelectedId(null)
            notificationDispatch({
                type: 'ADD_NOTE',
                payload: {
                    id: v4(),
                    message: 'دسته با موفقیت حذف شد',
                    status: 'success'
                }
            })
            console.log(filtredCategories)
            setAxiosDeleteResult(null)

        }
        if (axiosDeleteError !== null) {
            console.log(axiosDeleteError)
        }
    }, [axiosDeleteError, axiosDeleteResult])
    // load old categories
    useEffect(() => {
        if (axiosGetResult !== null) {
            setCategories(axiosGetResult)
            setSimpleDataLoaderStatus('hidde')
        }
        if (axiosGetError !== null) {
            console.log(axiosGetError)
            setSimpleDataLoaderStatus('error')
        }
    }, [axiosGetError, axiosGetResult]);
    // first load deta
    useEffect(() => {
        setAxiosGetToken(authToken);
        setAxiosGetUrl(apiLinks.categories);
    }, [])

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
                            <div className="buttons w-full flex items-center gap-3">
                                <div className="w-8/12 xl:w-5/12" >
                                    <SubmitFormButton isPending={axiosPostIsPending} title={'ایجاد دسته بندی '} />
                                </div>
                                <div className={`w-4/12 xl:w-3/12 ${axiosPostIsPending && 'pointer-events-none'}`} >
                                    <CancelButton title={'لغو'} />
                                </div>
                            </div>
                        </div>
                        {/* End of Right Side - Text form  */}
                        {/* Left side - select Image */}
                        <div className="left-side xl:w-4/12 px-3">
                            <h2 className="font-bold text-slate-800 dark:text-slate-200 dark:border-slate-600 xl:my-3 mt-10 mr-2 border-b pb-3">دسته بندی ها</h2>
                            {simpleDataLoaderStatus === 'hidde' && (
                                categories.length ? (categories.map(item => (
                                    <CategoryItem key={item.id} {...item} deleteItem={removeHandler} />
                                ))) : ((<p className="text-center mt-4 font-bold text-gray-600  dark:text-slate-300">هیچ دسته ای وجود ندارد.!</p>))
                            )}

                            {simpleDataLoaderStatus !== 'hidde' && <SimpleDataLoader status={simpleDataLoaderStatus} />}
                        </div>
                        {/* End of Left side - select Image */}
                    </section>

                </form>
            </div>
        </div>
    )
}
