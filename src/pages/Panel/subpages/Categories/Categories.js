import { useEffect, useState, useContext } from "react";
import { v4 } from "uuid";

// contexts
import { NotificationContext } from "../../../../Contexts/Notifications/NotificationProvider";
// datas
import { apiLinks } from "../../../../data/links";
// Utils
import { getCooki } from "../../../../utils/cookis";
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
  const notificationDispatch = useContext(NotificationContext);
  const {
    axiosPostResult,
    axiosPostIsPending,
    axiosPostError,
    setAxiosPostUrl,
    setAxiosPostResult,
    setAxiosPostData,
    setAxiosPostError,
  } = useAxiosPost();
  const { axiosGetResult, axiosGetError, setAxiosGetUrl, setAxiosGetToken } =
    useAxiosGet();
  const {
    axiosDeleteResult,
    axiosDeleteError,
    setAxiosDeleteUrl,
    setAxiosDeleteResult,
  } = useAxiosDelete();
  const [simpleDataLoaderStatus, setSimpleDataLoaderStatus] = useState("load");
  const authToken = getCooki("token");
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    name: "", /// max length 70
    type: "", /// chooseing from select box
  });
  const inputsData = {
    name: {
      name: "name",
      label: "نام دسته",
      placeholder: "نام دسته را وارد کنید",
      type: "text",
      required: true,
      errorMessage: "عنوان دسته باید بین 3 الی 20 کلمه باشد",
      // pattern: '',
      maxLength: 20,
      minLength: 3,
    },
    type: {
      name: "type",
      label: "نوع دسته",
      items: ["Product", "Course"],
    },
  };
  const changeHandler = ({ id, value }) => {
    if (id === "type") {
      setFormData({ ...formData, [id]: value });
      return;
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.type) {
      notificationDispatch({
        type: "ADD_NOTE",
        payload: {
          id: v4(),
          message: "لطفا تمام فیلدها را پر کنید",
          status: "error",
        },
      });
      return;
    }

    // Validate name length
    if (formData.name.length < inputsData.name.minLength || formData.name.length > inputsData.name.maxLength) {
      notificationDispatch({
        type: "ADD_NOTE",
        payload: {
          id: v4(),
          message: inputsData.name.errorMessage,
          status: "error",
        },
      });
      return;
    }

    // If validation passes, submit the form
    setAxiosPostData(formData);
    setAxiosPostUrl(apiLinks.categories);
  };
  const removeHandler = (categoryId) => {
    setAxiosDeleteUrl(`${apiLinks.categories}/${categoryId}`);
    setSelectedId(categoryId);
  };
  // create category
  useEffect(() => {
    if (axiosPostResult !== null && axiosPostError === null) {
      notificationDispatch({
        type: "ADD_NOTE",
        payload: {
          id: v4(),
          message: "دسته با موفقیت ایجاد شد",
          status: "success",
        },
      });
      setAxiosPostResult(null);
      setCategories((prev) => [...prev, axiosPostResult]);
    }
    if (axiosPostError !== null) {
      if (axiosPostError.status === 409) {
        notificationDispatch({
          type: "ADD_NOTE",
          payload: {
            id: v4(),
            message: "این دسته قبلا ایجاد شده است",
            status: "error",
          },
        });
        setAxiosPostError(null);
      }
    }
  }, [axiosPostError, axiosPostResult, notificationDispatch, setAxiosPostError, setAxiosPostResult]);

  // Remove category
  useEffect(() => {
    if (axiosDeleteResult !== null && selectedId !== null) {
      setCategories(axiosDeleteResult.data.categories);
      setSelectedId(null);
      notificationDispatch({
        type: "ADD_NOTE",
        payload: {
          id: v4(),
          message: "دسته با موفقیت حذف شد",
          status: "success",
        },
      });
      setAxiosDeleteResult(null);
    }
    if (axiosDeleteError !== null) {
      console.log(axiosDeleteError);
    }
  }, [axiosDeleteError, axiosDeleteResult, notificationDispatch, selectedId, setAxiosDeleteResult]);

  // load old categories
  useEffect(() => {
    if (axiosGetResult !== null) {
      setCategories(axiosGetResult);
      setSimpleDataLoaderStatus("hidde");
    }
    if (axiosGetError !== null) {
      console.log(axiosGetError);
      setSimpleDataLoaderStatus("error");
    }
  }, [axiosGetError, axiosGetResult]);
  // first load data
  useEffect(() => {
    setAxiosGetToken(authToken);
    setAxiosGetUrl(apiLinks.categories);
  }, [authToken, setAxiosGetToken, setAxiosGetUrl]);

  return (
    <div id="new-product-form">
      <div className="wrapper w-full flex flex-col xl:flex-row p-4 rounded-2xl bg-white my-3 dark:bg-slate-800 ">
        <form onSubmit={submitHandler} className="w-full">
          <section className="flex flex-col xl:flex-row">
            {/* Right Side - Text form  */}
            <div className="right-side xl:w-8/12">
              <NormalInput
                value={formData.name}
                onChangeEvent={changeHandler}
                {...inputsData.name}
              />
              <div className="w-full flex-col xl:flex-row flex justify-start relative mb-5 mt-3">
                <div className="w-full xl:w-6/12">
                  <SelectBox
                    value={formData.type}
                    onChangeEvent={changeHandler}
                    {...inputsData.type}
                  />
                </div>
              </div>
              <div className="buttons w-full flex items-center gap-3">
                <div className="w-8/12 xl:w-5/12">
                  <SubmitFormButton
                    isPending={axiosPostIsPending}
                    title={"ایجاد دسته بندی "}
                  />
                </div>
                <div
                  className={`w-4/12 xl:w-3/12 ${
                    axiosPostIsPending && "pointer-events-none"
                  }`}
                >
                  <CancelButton title={"لغو"} />
                </div>
              </div>
            </div>
            {/* End of Right Side - Text form  */}
            {/* Left side - select Image */}
            <div className="left-side xl:w-4/12 px-3">
              <h2 className="font-bold text-slate-800 dark:text-slate-200 dark:border-slate-600 xl:my-3 mt-10 mr-2 border-b pb-3">
                دسته بندی ها
              </h2>
              {simpleDataLoaderStatus === "hidde" &&
                (categories.length ? (
                  categories.map((item) => (
                    <CategoryItem
                      key={item.id}
                      {...item}
                      deleteItem={removeHandler}
                    />
                  ))
                ) : (
                  <p className="text-center mt-4 font-bold text-gray-600  dark:text-slate-300">
                    هیچ دسته ای وجود ندارد.!
                  </p>
                ))}

              {simpleDataLoaderStatus !== "hidde" && (
                <SimpleDataLoader status={simpleDataLoaderStatus} />
              )}
            </div>
            {/* End of Left side - select Image */}
          </section>
        </form>
      </div>
    </div>
  );
}
