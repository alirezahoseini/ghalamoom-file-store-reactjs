import { HiPlusSm } from 'react-icons/hi'
import { Link } from 'react-router-dom'

// hooks
import useUserName from '../../../hooks/useUserName'

export default function UserInfo({ isOpen, withEvent, onClickEvent }) {
  const { isPending, userName } = useUserName()
  const userAvatar = process.env.PUBLIC_URL + '/images/avatars/Avatar-1.webp';
  return (

    withEvent ? (
      <Link onClick={onClickEvent} to={'editprofile'} id='user-info' className={`flex w-full items-center gap-6 border-b border-gray-300 pb-5 transition-colors duration-300 dark:border-slate-600`} >
        <div className={`user-img bg-pink-300 w-fit flex items-center justify-center rounded-full min-w-fit relative `} style={{ outline: '1px solid #d8d8d8', outlineOffset: '2px' }}>
          <img src={userAvatar} alt="user avatar" style={{ minWidth: '54px', maxWidth: '54px' }} />
          <div className="plus-btn absolute -left-2 -bottom-1 bg-gray-50 rounded-full p-1 transition-colors duration-300 dark:bg-slate-800 ">
            <HiPlusSm className='bg-green-500 text-white text-base rounded-full' style={{ boxShadow: '0 2px 10px #399b0086' }} />
          </div>
        </div>
        <div className={`user-name transition-all duration-200 ${isOpen ? 'w-fit opacity-100 visible translate-x-0' : '-translate-x-5 w-0 opacity-0 invisible'}`}>
          <span className='text-gray-400 inline-block mb-1 text-xs font-bold dark:text-slate-500' >سلام</span>
          {isPending ? (<div className='w-24 h-3 bg-slate-300 dark:bg-slate-600 rounded-md animate-pulse'></div>) : (
            <h4 className='font-bold text-gray-600 dark:text-slate-300 whitespace-nowrap' >{userName ? (userName) : ("بارگزاری نشد.!")}</h4>
          )}
        </div>
      </Link>
    ) : (

      <Link to={'editprofile'} id='user-info' className={`flex w-full items-center gap-6 border-b border-gray-300 pb-5 transition-colors duration-300 dark:border-slate-600`} title='حساب کاربری من'
      >
        <div className={`user-img bg-pink-300 w-fit flex items-center justify-center rounded-full min-w-fit relative `} style={{ outline: '1px solid #d8d8d8', outlineOffset: '2px' }}>
          <img src={userAvatar} alt="user avatar" style={{ minWidth: '54px', maxWidth: '54px' }} />
          <div className="plus-btn absolute -left-2 -bottom-1 bg-gray-50 rounded-full p-1 transition-colors duration-300 dark:bg-slate-800 ">
            <HiPlusSm className='bg-green-500 text-white text-base rounded-full' style={{ boxShadow: '0 2px 10px #399b0086' }} />
          </div>
        </div>
        <div className={`user-name transition-all duration-200 ${isOpen ? 'w-fit opacity-100 visible translate-x-0' : '-translate-x-5 w-0 opacity-0 invisible'}`}>
          <span className='text-gray-400 inline-block mb-1 text-xs font-bold dark:text-slate-500' >سلام</span>
          {isPending ? (<div className='w-24 h-3 bg-slate-300 dark:bg-slate-600 rounded-md animate-pulse'></div>) : (
            <h4 className='font-bold text-gray-600 dark:text-slate-300 whitespace-nowrap' >{userName ? (userName) : ("بارگزاری نشد.!")}</h4>
          )}
        </div>
      </Link>
    )


  )
}
