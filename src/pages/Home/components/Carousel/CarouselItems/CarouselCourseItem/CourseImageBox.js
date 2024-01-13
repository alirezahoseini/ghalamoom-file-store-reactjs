import React from 'react'

// assets
import defaultImage from '../../../../../../assets/images/panel/imageDefault.json'

export default function CourseImageBox({ image, title, level, prerequisite }) {
    return (
        <div className="course-item_image flex justify-center relative">
            <img width={506} height={404} src={image ? image : defaultImage} alt={title} className='rounded-xl  w-11/12 -translate-y-8 hover:-translate-y-10 transition-all duration-500 shadow-both-0' />
            <div className="course-item_badges flex items-center justify-between absolute -top-3 w-10/12 mx-auto text-slate-100 font-bold" style={{ fontSize: '11px' }}>
                <span className='bg-slate-300 bg-opacity-40 px-2 py-1 rounded-rounded shadow-both'>
                    {level === 'Preliminary' && 'مبتدی'}
                    {level === 'Intermediate' && 'متوسط'}
                    {level === 'Advanced' && 'پیشرفته'}
                </span>
                <span className='bg-slate-400 bg-opacity-40 px-2 py-1 rounded-rounded shadow-both'>
                    {prerequisite === 'NoPrerequisite' && "بدون پیش نیاز"}
                    {prerequisite === 'AiPreliminary' && ' ایلوستریتور مقدماتی'}
                    {prerequisite === 'AiIntermediate' && ' ایلوستریتور متوسط'}
                    {prerequisite === 'AiAdvanced' && ' ایلوستریتور پیشرفته'}
                    {prerequisite === 'PsPreliminary' && ' فوتوشاپ مقدماتی'}
                    {prerequisite === 'PsIntermediate' && ' فوتوشاپ متوسط'}
                    {prerequisite === 'PsAdvanced' && ' فوتوشاپ پیشرفته'}
                </span>
            </div>
        </div>
    )
}
