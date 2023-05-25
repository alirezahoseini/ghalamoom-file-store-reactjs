import { useState } from 'react'
import { TbMenu, TbX } from 'react-icons/tb'

// components
import HambergerMenu from '../../../../../../components/ui/HambergerMenu'
import UserInfo from '../../UserInfo/UserInfo'
import SideBarMenu from '../../SideBarMenu/SideBarMenu'
import LogoutBtn from '../../LogoutBtn/LogoutBtn'
import ThemeChangerBtn from '../../ThemeChangerBtn/ThemeChangerBtn'

export default function MobileMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  return (
    <div id='mobile-menu' className='ml-4 lg:hidden' >
      <button className="opener-btn flex items-center justify-center text-2xl p-2 bg-gray-100 rounded-md text-slate-600 dark:bg-gray-700 dark:text-gray-400" onClick={() => setIsOpenMenu(prev => !prev)} >
        {isOpenMenu ? (<TbX />) : (<TbMenu />)}
      </button>
      <div id="side-menu">
        <HambergerMenu isShow={isOpenMenu} onClose={() => setIsOpenMenu(prev => !prev)} position='right' width='w-8/12' bgColor={'dark:bg-slate-800 bg-white'} >
          <div className='p-4 pt-8'>
            {/* close button  */}
            <button className='w-fit text-2xl text-gray-600 absolute left-4 top-4 dark:text-slate-300' onClick={() => setIsOpenMenu(prev => !prev)}>
              <TbX />
            </button>
            {/* content  */}
            <UserInfo isOpen={isOpenMenu} withEvent={true} onClickEvent={() => setIsOpenMenu(false)}  />
            <SideBarMenu isOpen={isOpenMenu} withEvent={true} onClickEvent={() => setIsOpenMenu(false)} />
            <LogoutBtn isOpen={isOpenMenu} />
            <div className='mt-4'>
              <ThemeChangerBtn />
            </div>
          </div>
        </HambergerMenu>
      </div>
    </div>
  )
}
