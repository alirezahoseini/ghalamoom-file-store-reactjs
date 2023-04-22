/*

status inputs:

load =========> loading
error ========> show not loading 
hidde ==========> hidde


*/




import React from 'react'
import loaderSvg from '../../../assets/images/simple-loader.svg'
import {TbPlugConnectedX} from 'react-icons/tb'

export default function SimpleDataLoader({status}) {
    return (
        <div className='w-full flex items-center justify-center flex-col p-6'>
            {status === 'load' && (<img src={loaderSvg} alt="" />)}
            {status === 'error' && (
                <div className=' flex flex-col items-center justify-center gap-2'>
                    <span className='text-3xl text-white bg-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg'>
                    <TbPlugConnectedX/>
                    </span>
                    <span className='font-bold mt-3 text-slate-600 dark:text-slate-400'>بارگزاری نشد.!</span>
                </div>
            )}
        </div>
    )
}
