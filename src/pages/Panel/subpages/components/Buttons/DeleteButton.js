// assets
import circleLoading from '../../../../../assets/images/panel/circleLoading.svg'

export default function DeleteButton({ title, isPending, onClickEvent}) {
  return (
    <button onClick={onClickEvent} type='button' className={`text-red-500 font-bold w-full py-3 px-4 rounded-lg shadow-both-0 bg-slate-100 border-red-500 hover:bg-red-100   transition-all duration-300 mt-6 flex justify-center items-center cursor-pointer dark:bg-slate-700 dark:bg-opacity-40 dark:text-red-500 dark:hover:bg-red-400 dark:hover:bg-opacity-20 disabled:pointer-events-none disabled:bg-red-200`} disabled={isPending} >
      {!isPending ? (
        <span>{title}</span>
      ) : (
        <div className='h-5 w-fit mx-auto flex items-center justify-center'>
          <img src={circleLoading} alt=""/>
        </div>
      )
      }
    </button>
  )
}