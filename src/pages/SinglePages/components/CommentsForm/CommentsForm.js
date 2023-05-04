import { useState, useEffect } from "react"

// datas
import { apiLinks } from '../../../../data/links'

// hooks
import useAxiosPut from "../../../../hooks/axios/useAxiosPut";

// components
import Form from "./Form"
import CommentItem from "./CommentItem/CommentItem";

export default function CommentsForm({ type, ...otherProps }) {
  const { axiosPutResult, axiosPutIsPending, axiosPutError, setAxiosPutUrl, setAxiosPutData } = useAxiosPut()
  const [comments, setComments] = useState([]);
  const [resetingForm, setResetingForm] = useState(false);

  const addNewComment = (newComment) => {
    const newCommentsArray = [...comments, newComment];
    const newItemObject = { ...otherProps, comments: JSON.stringify(newCommentsArray) };
    setAxiosPutUrl(`${apiLinks[`${type}s`]}/${otherProps.id}`)
    setAxiosPutData(newItemObject)
  }
  useEffect(() => {
    if (otherProps.comments.length) {
      setComments(JSON.parse(otherProps.comments))
    }
  } , [])
  useEffect(() => {
    if (axiosPutResult !== null) {
      setComments(JSON.parse(axiosPutResult.comments))
      alert('دیدگاه شما با موفقیت ثبت شد')
      setResetingForm(true);
      setTimeout(() => {
        setResetingForm(false);
      }, 1);
    } else if (axiosPutError !== null) {
      alert('دیدگاه ثبت نشد.!!!')
      console.log(axiosPutError)
    }
  }, [axiosPutResult, axiosPutError])
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
        <Form addNewComment={addNewComment} isPending={axiosPutIsPending} isResetForm={resetingForm} />
      </div>
      {/*  */}
    </div>
  )
}
