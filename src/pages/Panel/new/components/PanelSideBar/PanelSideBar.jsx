import {useState } from 'react'
import { FiChevronsRight } from 'react-icons/fi'

// components 
import UserInfo from './UserInfo/UserInfo'
import SideBarMenu from './SideBarMenu/SideBarMenu'
import LogoutBtn from './LogoutBtn/LogoutBtn'

export default function PanelSideBar() {
    const [isSidebarOpen, setIsSidebarOpen ] = useState(true)
  return (
    <div id='sidebar' className='w-fit text-sm'>
        {/* Desktop Sidebar */}
        <div id='desktop-sidebar' className="hidden wrapper  py-3 lg:flex">
            <div id='wrapper' className={`bg-blue-1 shadow-both-2 rounded-2xl h-full px-2 py-4 transition-all duration-500 relative ${isSidebarOpen ? 'w-56' : 'w-20'} `}>
                {/* open and closer button  */}
                    <button id='oppener-btn' onClick={()=> setIsSidebarOpen(prevState => !prevState)} type="button" className={`absolute left-0 top-24 bg-gray-2 py-1 pr-1 text-lg text-gray-5 rounded-r-3xl cursor-pointer transition-all duration-500 z-10 ${isSidebarOpen ? 'pl-3' : 'pl-1'} `}>
                        <FiChevronsRight className={`transition-all duration-200 ${isSidebarOpen ? 'rotate-0' : 'rotate-180'} `}  />
                    </button>
                {/* open and closer button  */}
                <div id='side-menu' className='pr-1'>
                    <UserInfo userName={'علیرضا'} isOpen={isSidebarOpen}/>
                    <SideBarMenu isOpen={isSidebarOpen} />
                    <LogoutBtn isOpen={isSidebarOpen} />
                </div>
            </div>
        </div>
        {/* End of Desktop Sidebar */}
    </div>
  )
}
