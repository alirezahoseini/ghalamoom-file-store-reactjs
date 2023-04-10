import React from 'react'
import { useNavigate , Outlet } from 'react-router-dom'

// Files 
import './Panel.css'

// Components 
import PanelHeader from './PanelHeader/PanelHeader'

export default function Panel() {

  


  return (
    <div id="admin-panel" className='flex items-center justify-center flex-col
    '>
      <PanelHeader />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  )
}
