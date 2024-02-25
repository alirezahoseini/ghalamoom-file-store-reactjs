import { useState, useEffect, useContext } from "react"
import { v4 } from 'uuid'

// contexts
import { NotificationContext } from "../../../../Contexts/Notifications/NotificationProvider";

// datas
import { apiLinks } from '../../../../data/links'

// hooks
import useAxiosPut from "../../../../hooks/axios/useAxiosPut";
import useAxiosGet from "../../../../hooks/axios/useAxiosGet";

// utils
import { getCooki } from '../../../../utils/cookis'

// components
import Form from "./Form"
import CommentItem from "./CommentItem/CommentItem";
import { Link } from "react-router-dom";

export default function CommentsForm({ type, ...otherProps }) {
  const notificationDispatch = useContext(NotificationContext)
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  const { axiosPutResult, axiosPutIsPending, axiosPutError, setAxiosPutUrl, setAxiosPutData } = useAxiosPut()
  const [comments, setComments] = useState([]);
  const [resetingForm, setResetingForm] = useState(false);
  const authToken = getCooki('token');


  // Loading prev comments
  const loadComments = () => {
    setAxiosGetUrl(`${apiLinks.comments}/${type}/${otherProps.id}`);
  }
  const addNewComment = (newComment) => {
    const newCommentsArray = [...comments, newComment];
    const newItemObject = { ...otherProps, comments: JSON.stringify(newCommentsArray) };
    setAxiosPutUrl(`${apiLinks[`${type}s`]}/${otherProps.id}`)
    setAxiosPutData(newItemObject)
  }

  // Run component
  useEffect(() => {
    if (true) {
      loadComments()
    }
  }, []);

  useEffect(() => {
    if (axiosPutResult !== null) {
      setComments(JSON.parse(axiosPutResult.comments))

      notificationDispatch({
        type: 'ADD_NOTE',
        id: v4(),
        payload: {
          message: 'دیدگاه شما با موفقیت ثبت شد',
          status: 'success'
        }
      })
      setResetingForm(true);
      setTimeout(() => {
        setResetingForm(false);
      }, 1);
    } else if (axiosPutError !== null) {
      notificationDispatch({
        type: 'ADD_NOTE',
        id: v4(),
        payload: {
          message: 'دیدگاه ثبت نشد.!!!',
          status: 'error'
        }
      })
      console.log(axiosPutError)
    }
  }, [axiosPutResult, axiosPutError]);

  // If loaded useAxios get ===>>> geting comments
  useEffect(() => {
    if (axiosGetResult !== null) {
      console.log(axiosGetResult)
      setComments(axiosGetResult)
    } else if (axiosGetError !== null) {
      console.log(axiosGetError)
    }
  }, [axiosGetResult, axiosGetError])
  return (
    <div className='comments-form flex flex-col'>
      <h4 className='font-rokh text-slate-600 font-bold text-xl'>نقد و بررسی ها</h4>
      {/*  */}
      <div className="flex flex-col gap-5 my-5">
        {comments.length ? comments.map((comment) => (
          <div key={comment.id}>
            <CommentItem {...comment} />
          </div>
        )) : (
          <h2 className="font-bold text-sm text-slate-400 my-5">دیدگاهی ثبت نشده است</h2>
        )
        }
      </div>
      {/*  */}
      {/*  */}
      <div className="">
        {
          authToken && (<Form addNewComment={addNewComment} isPending={axiosPutIsPending} isResetForm={resetingForm} />)
        }
        {
          authToken === null && (
            <div className="relative">
              <div className="pointer-events-none"><Form /></div>
              <div className="flex items-center justify-center flex-col absolute w-full h-full bg-white top-0 backdrop-blur-sm bg-opacity-10">
                <p className="font-bold text-[16px]">برای ثبت دیدگاه باید وارد حساب کاربری خود شوید</p>
                <Link to={'/panel'} className="bg-blue-500 px-4 py-2 mt-4 rounded-lg text-white hover:bg-gray-600" >ورود | عضویت</Link>
              </div>
            </div>
          )
        }
      </div>
      {/*  */}
    </div>
  )
}
