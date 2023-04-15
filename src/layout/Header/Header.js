import React from 'react'

// components
import DesktopHeader from './DesktopHeader/DesktopHeader'
import MobileHeader from './MobileHeader/MobileHeader'

export default function Header() {

  return (
    <header className='w-full p-0 m-0 lg:sticky top-0 z-50'>
      <DesktopHeader />
      <MobileHeader />
    </header>
  )
}
