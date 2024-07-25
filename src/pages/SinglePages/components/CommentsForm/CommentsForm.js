import { useState, useEffect, useContext } from "react"
import { v4 } from 'uuid'

// contexts
import { NotificationContext } from "../../../../Contexts/Notifications/NotificationProvider";

// datas
import { apiLinks } from '../../../../data/links'

// hooks
import useAxiosPost from "../../../../hooks/axios/useAxiosPost";
import useAxiosGet from "../../../../hooks/axios/useAxiosGet";

// utils
import { getCooki } from '../../../../utils/cookis'

// components
import Form from "./Form"
import CommentItem from "./CommentItem/CommentItem";
import QuestForm from './QuestForm'
import { Link } from "react-router-dom";

export default function CommentsForm({ type, ...otherProps }) {
  const notificationDispatch = useContext(NotificationContext)
  const { axiosGetResult, axiosGetIsPending, axiosGetError, setAxiosGetUrl } = useAxiosGet();
  const { axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostData, setAxiosPostToken } = useAxiosPost();
  const [resetingForm, setResetingForm] = useState(false);
  const [comments, setComments] = useState([]);
  const authToken = getCooki('token');


  // Loading prev comments
  const loadComments = () => {
    setAxiosGetUrl(`${apiLinks.comments}/${type}/${otherProps.id}`);
  }
  const addNewComment = (newComment) => {
    if (authToken) {
      setAxiosPostUrl(`${apiLinks.comments}/${type}/${otherProps.id}`)
      setAxiosPostToken(authToken);
    } else {
      console.log('quest user')
      setAxiosPostUrl(`${apiLinks.comments}/guest/${type}/${otherProps.id}`)
    }
    setAxiosPostData(newComment);
  }

  // Run component
  useEffect(() => {
    if (true) {
      loadComments()
    }
  }, []);

  useEffect(() => {
    if (axiosPostResult !== null) {
      loadComments();
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
    } else if (axiosPostError !== null) {
      notificationDispatch({
        type: 'ADD_NOTE',
        id: v4(),
        payload: {
          message: 'دیدگاه ثبت نشد.!!!',
          status: 'error'
        }
      })
      console.log(axiosPostError)
    }
  }, [axiosPostResult, axiosPostError]);

  // If loaded useAxios get ===>>> geting comments
  useEffect(() => {
    if (axiosGetResult !== null) {
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
          authToken && (<Form addNewComment={addNewComment} isPending={axiosPostIsPending} isResetForm={resetingForm} />)
        }
        {
          authToken === null && (
            <QuestForm addNewComment={addNewComment} isPending={axiosPostIsPending} isResetForm={resetingForm} />
          )
        }
      </div>
      {/*  */}
    </div>
  )
}
