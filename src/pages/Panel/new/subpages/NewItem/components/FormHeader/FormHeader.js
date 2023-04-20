import { Link } from "react-router-dom"
import {TbChevronRight} from 'react-icons/tb'
 
export default function FormHeader({ title }) {
    return (
        <div id="new-product-form">
            <div className="wrapper w-full bg-slate-50 p-4 rounded-xl flex items-center justify-between dark:bg-slate-800">
                <h2 className="font-bold text-slate-900 text-sm dark:text-slate-200">افزودن {title} جدید</h2>
                <Link to={-1} className="bg-slate-100 py-2 px-3 rounded-lg font-bold text-slate-700 flex items-center justify-center dark:bg-slate-700 dark:text-slate-300">
                    <TbChevronRight className="text-base ml-2" />
                    بازگشت
                </Link>
            </div>
        </div>
    )
}
