import React, { useContext, useState, memo, useMemo } from 'react'
import { TbPhotoEdit } from 'react-icons/tb'
import styles from '../AvatarSelectBox.module.css'

// Contexts
import { UserInformationContext } from '../../../../../../Contexts/UserInformationContext/UserInformationContextProvider'

// datas 
import avatarsArray from '../../../../../../data/avatarsArray'

// components
import AvatarImageSelectBoxItem from './AvatarImageSelectBoxItem'
import AvatarSelectBoxHeader from '../AvatarSelectBoxHeader/AvatarSelectBoxHeader'


const AvatarImageSelectBox = memo(() => {
    const { userInfoContext } = useContext(UserInformationContext);
    const [isShowSelectBox, setIsShowSelectBox] = useState(false)
    return (
        <div id='avatar-image-selectbox' className='inline-flex '>
            <button onClick={() => setIsShowSelectBox(prev => !prev)} type='button' className='bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:text-slate-700 px-3 py-2 rounded-md flex items-center gap-2 text-slate-700 dark:hover:bg-yellow-400 hover:bg-yellow-400 hover:shadow-both-0' >
                {useMemo(() => <TbPhotoEdit className='text-lg' />, [])}
                <span>تغییر آواتار</span>
            </button>
            <div className= {`${styles.selectBox} ${isShowSelectBox ? styles.show : ''} absolute bg-slate-100 top-0 right-0 overflow-y-auto max-h-full w-fit  rounded-lg dark:bg-slate-900`} >
                {useMemo(() => <AvatarSelectBoxHeader title={"تغییر آواتار"} onCloser={() => setIsShowSelectBox(false)} />, [])}
                <div className='p-5 flex flex-wrap'>
                    {avatarsArray.map((avatar) => {
                        const selected = avatar.id === userInfoContext.userInfo.avatar.avatar.id;
                        return <AvatarImageSelectBoxItem key={avatar.id} {...avatar} setIsShowSelectBox={setIsShowSelectBox} isChecked={selected} />
                    })}
                </div>
            </div>
        </div>
    )
})


export default AvatarImageSelectBox