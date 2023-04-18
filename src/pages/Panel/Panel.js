import { Outlet } from 'react-router-dom'
//// test
import PanelSideBar from './new/components/PanelSideBar/PanelSideBar';
import PanelHeaderTest from './new/components/PanelHeader/PanelHeader'

// Files 
import './Panel.css'
import { useState } from 'react';

export default function Panel() {
  return (
    <div id="user-panel" className={`bg-gray-100 dark:bg-slate-900 transition-all duration-300 min-h-screen `}>
      <div className="lg:container mx-auto">
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
