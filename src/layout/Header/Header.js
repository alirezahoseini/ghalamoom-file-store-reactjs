import React from 'react'
import { useLocation } from 'react-router-dom'


// Components
import DesktopHeader from './DesktopHeader/DesktopHeader'
import MobileHeader from './MobileHeader/MobileHeader'

export default function Header() {
  const location = useLocation();

  return (
    <header className='w-full p-0 m-0 lg:sticky top-0 z-50'>
      <DesktopHeader />
      {!location.pathname.includes('/panel') && (
        <MobileHeader />
      )}
    </header>
  )
}
