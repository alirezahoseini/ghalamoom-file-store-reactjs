import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

// Files 
import './Panel.css'

// Components 
import PanelHeader from './PanelHeader/PanelHeader'

export default function Panel() {




  return (
    <div className='container mx-auto'>
      <div id="admin-panel" className='flex justify-center flex-col lg:flex-row lg:px-2 relative lg:gap-3'>
        <div className="lg:w-2/12 lg:h-fit lg:sticky lg:top-32 lg:right-0 " >
          <PanelHeader />
        </div>
        <div className="w-full lg:w-10/12">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
