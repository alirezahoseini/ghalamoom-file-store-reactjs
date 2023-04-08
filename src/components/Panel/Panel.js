import React from 'react'
import { Outlet } from 'react-router-dom'

// Files 
import './Panel.css'

// Components 
import PanelHeader from './PanelHeader/PanelHeader'

export default function Panel() {
  return (
    <div id="admin-panel">
        <PanelHeader />
        <Outlet />
    </div>
  )
}
