// assets
import circleLoading from '../../../../../../../assets/images/panel/circleLoading.svg'

export default function SubmitFormButton({ title, isPending }) {
  console.log(isPending)
  return (
    <button type='submit' className={`text-violet-950 font-bold w-full py-3 px-4 rounded-lg shadow-both-0 bg-violet-200 hover:bg-violet-300  transition-all duration-300 mt-6 flex justify-center items-center cursor-pointer dark:bg-blue-900 dark:text-violet-100 dark:hover:bg-blue-950 ${isPending && 'bg-violet-500 cursor-auto'}`} disabled={isPending} >
      {!isPending ? (
        <span>{title}</span>
      ) : (
        <div className='h-5 w-fit mx-auto flex items-center justify-center'>
          <img src={circleLoading} alt=""  />
        </div>
      )
      }
    </button>
  )
}