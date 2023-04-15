import { Outlet } from 'react-router-dom'
//// test
import PanelSideBar from './new/components/PanelSideBar/PanelSideBar';
import PanelHeaderTest from './new/components/PanelHeader/PanelHeader'

// Files 
import './Panel.css'
import { useState } from 'react';

// components 
// import PanelHeader from './components/PanelHeader/PanelHeader'

export default function Panel() {
  return (
    // <div className='container mx-auto'>
    //   <div id="admin-panel" className='flex justify-center flex-col lg:flex-row lg:px-2 relative lg:gap-3'>
    //     <div className="lg:w-2/12 lg:h-fit lg:sticky lg:top-32 lg:right-0 " >
    //       <PanelHeaderTest />
    //     </div>
    //     <div className="w-full lg:w-10/12">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>

    <div id="user-panel" className={`bg-gray-100 dark:bg-slate-900 transition-all duration-300 `}>
      <div className="container mx-auto">
        <div className="wrapper flex lg:gap-3 relative">
          <div className='w-auto lg:sticky lg:top-0 lg:right-0 lg:h-screen' >
            <PanelSideBar/>
          </div>
          <div className='flex flex-col w-full'>
            <PanelHeaderTest/>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>

  )
}
