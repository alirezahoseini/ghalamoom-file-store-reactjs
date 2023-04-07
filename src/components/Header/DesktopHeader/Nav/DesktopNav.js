import React, { useState } from 'react'


// Files 
import { navigaitionLinks } from '../../../../dynamicLinks.js'

// Components 
import DesktopNavItem from './DesktopNavItem.js'


export default function Nav() {
  const [navLinks, setNavLinks] = useState(navigaitionLinks)


  return (
    <>
      <ul id='desktop-nav' className='flex lg:mr-10 xl:mr-20 gap-2 items-center'>
        {
          navLinks.map(link => (
            <DesktopNavItem key={'desktop-' +link.id} {...link} />
          ))
        }
      </ul>
    </>
  )
}
