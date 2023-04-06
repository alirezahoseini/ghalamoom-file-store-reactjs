import React from 'react'

// Components
import DesktopHeader from './DesktopHeader/Nav/DesktopHeader'
import MobileHeader from './MobileHeader/MobileHeader'

export default function Header() {
  return (
    <header className='w-screen p-0 m-0'>
        <DesktopHeader />
        <MobileHeader />
    </header>
  )
}
