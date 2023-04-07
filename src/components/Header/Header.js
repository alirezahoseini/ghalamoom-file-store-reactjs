import React from 'react'

// Components
import DesktopHeader from './DesktopHeader/DesktopHeader'
import MobileHeader from './MobileHeader/MobileHeader'

export default function Header() {
  return (
    <header className='w-full p-0 m-0 lg:sticky top-0'>
        <DesktopHeader />
        <MobileHeader />
    </header>
  )
}
