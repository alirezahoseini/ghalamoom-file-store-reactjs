import {useState } from 'react'
import { FiChevronsRight } from 'react-icons/fi'
import { TbMenu2, TbX } from 'react-icons/tb'

// components 
import UserInfo from './UserInfo/UserInfo'
import SideBarMenu from './SideBarMenu/SideBarMenu'
import LogoutBtn from './LogoutBtn/LogoutBtn'
import ThemeChangerBtn from './ThemeChangerBtn/ThemeChangerBtn'

export default function PanelSideBar() {
    const [isSidebarOpen, setIsSidebarOpen ] = useState(true)
  return (
    <div id='sidebar' className='w-fit text-xs'>
        {/* THIS SIDEBAR SHOWING ONLY ON DESKTOP ---- NOT MOBILE MENU */}
        <div id='sidebar' className="hidden wrapper  py-3 lg:flex flex-col">
            <div id='wrapper' className={`bg-slate-50 shadow-both-2 rounded-2xl h-full px-2 py-4 transition-all duration-500 relative overflow-hidden dark:bg-slate-800 dark:shadow-slate-900 ${isSidebarOpen ? 'w-56' : 'w-20'} `}>
                {/* open and closer button  */}
                    <button id='oppener-btn' onClick={()=> setIsSidebarOpen(prevState => !prevState)} type="button" className={`absolute left-0 top-24 bg-slate-200 py-1 pr-1 text-lg text-slate-600 rounded-r-3xl cursor-pointer transition-all duration-100 z-10 dark:bg-slate-600 dark:text-slate-300 ${isSidebarOpen ? 'pl-3' : 'pl-1'} `}>
                        <FiChevronsRight className={`transition-all duration-400 ${isSidebarOpen ? 'rotate-0' : 'rotate-180'} `}  />
                    </button>
                {/* open and closer button  */}
                <div id='side-menu' className='pr-1'>
                    <UserInfo userName={'علیرضا'} isOpen={isSidebarOpen}/>
                    <SideBarMenu isOpen={isSidebarOpen} />
                    <LogoutBtn isOpen={isSidebarOpen} />
                </div>
            </div>
            <ThemeChangerBtn/>
        </div>
    </div>
  )
}
