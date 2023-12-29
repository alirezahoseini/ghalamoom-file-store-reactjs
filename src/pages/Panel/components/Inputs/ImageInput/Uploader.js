import React from 'react'
import styles from './Uploader.module.css'

function Uploader({percent = 0, uploadStart = false}) {
    
    return (
        uploadStart && <span id='loading' className={`absolute top-0 right-0 w-full h-full bg-white bg-opacity-30 rounded-xl backdrop-blur-sm flex items-center justify-center flex-col gap-3 `}>
            <h2 className='text-white '>درحال بارگذاری...</h2>
            <progress className={`${styles.progress} `} value={percent} max={100}></progress>
        </span>
    )
}

export default Uploader