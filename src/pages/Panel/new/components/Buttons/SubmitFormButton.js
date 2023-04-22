// assets
import circleLoading from '../../../../../assets/images/panel/circleLoading.svg'

export default function SubmitFormButton({ title, isPending}) {
  return (
    <button type='submit' className={`text-white font-bold w-full py-3 px-4 rounded-lg shadow-both-0 bg-green-500 hover:bg-green-400  transition-all duration-300 mt-6 flex justify-center items-center cursor-pointer dark:bg-green-600 dark:bg-opacity-40 dark:text-violet-100 dark:hover:bg-opacity-60 disabled:pointer-events-none disabled:bg-green-400`} disabled={isPending} >
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