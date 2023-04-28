import { useState, useEffect } from "react"

// datas
import { apiLinks } from '../../../../data/links'

// hooks
import useAxiosPost from "../../../../hooks/axios/useAxiosPost";

// components
import Form from "./Form"
import CommentItem from "./CommentItem/CommentItem";

export default function CommentsForm({ type, ...otherProps }) {
  const { axiosPostResult, axiosPostIsPending, axiosPostError, setAxiosPostUrl, setAxiosPostData } = useAxiosPost()
  const [comments, setComments] = useState(otherProps.comments);
  const [resetingForm, setResetingForm] = useState(false);

  const addNewComment = (newComment) => {
    const newCommentsArray = [...comments, newComment];
    const newItemObject = { ...otherProps, comments: JSON.stringify(newCommentsArray) };
    setAxiosPostUrl(`${apiLinks[`${type}s`]}/${otherProps.id}`)
    setAxiosPostData(newItemObject)
  }
  useEffect(() => {
    if (axiosPostResult !== null) {
      setComments(axiosPostResult.comments)
      alert('دیدگاه شما با موفقیت ثبت شد')
      setResetingForm(true);
      setTimeout(() => {
        setResetingForm(false);
      }, 1);
    } else if (axiosPostError !== null) {
      alert('دیدگاه ثبت نشد.!!!')
      console.log(axiosPostError)
    }
  }, [axiosPostResult, axiosPostError])
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
        <Form addNewComment={addNewComment} isPending={axiosPostIsPending} isResetForm={resetingForm} />
      </div>
      {/*  */}
    </div>
  )
}
