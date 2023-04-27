import { Link } from "react-router-dom"

export default function CancelButton({ title}) {
  return (
    <Link to={-1} className={`text-slate-800 font-bold w-full py-3 px-4 rounded-lg shadow-both-0 bg-slate-200 hover:bg-slate-300 transition-all duration-300 mt-6 flex justify-center items-center dark:bg-slate-700 dark:text-violet-100 dark:hover:bg-slate-600`} >
        {title}
    </Link>
  )
}