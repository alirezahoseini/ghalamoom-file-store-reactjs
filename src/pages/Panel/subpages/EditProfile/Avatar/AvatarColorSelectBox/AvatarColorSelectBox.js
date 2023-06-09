import React, { useContext, useState } from 'react'
import { TbPalette } from 'react-icons/tb'
import styles from '../AvatarSelectBox.module.css'

//  Contexts
import { UserAvatarContext } from '../Avatar'

// datas 
import { bgColorsArray } from '../../../../../../data/avatarsArray'

// components
import AvatarColorSelectBoxItem from './AvatarColorSelectBoxItem'
import AvatarSelectBoxHeader from '../AvatarSelectBoxHeader/AvatarSelectBoxHeader'

export default function AvatarColorSelectBox() {
    const { userAvaterDetails } = useContext(UserAvatarContext);
    const [isShowSelectBox, setIsShowSelectBox] = useState(false)

    return (
        <div id='avatar-color-selectbox'>
            <button
                onClick={() => setIsShowSelectBox(prev => !prev)}
                type='button' className='bg-slate-200 px-3 py-2 rounded-md flex items-center gap-2 text-slate-700 hover:bg-indigo-600 hover:text-slate-50 hover:shadow-both-0 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-indigo-600 ' >
                <TbPalette className='text-lg' />
                <span>تغییر رنگ پس زمینه</span>
            </button>
            <div className={`${styles.selectBox} ${isShowSelectBox ? styles.show : ''} absolute bg-slate-100 bottom-0 left-0 overflow-y-auto max-h-full w-fit rounded-lg dark:bg-slate-900`} >
                <AvatarSelectBoxHeader title='تغییر رنگ پس زمینه' onCloser={() => setIsShowSelectBox(prev => !prev)} />
                <div className=' flex flex-wrap w-full gap-2 py-5'>
                    {bgColorsArray.map((color) => {
                        const selected = color.id === userAvaterDetails.bgColor.id;
                        return <AvatarColorSelectBoxItem key={color.id} {...color} setIsShowSelectBox={setIsShowSelectBox} isChecked={selected} />
                    })}
                </div>
            </div>
        </div>
    )
}
