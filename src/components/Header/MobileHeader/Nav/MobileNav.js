import React, { useState } from 'react'
import { navigaitionLinks } from '../../../../dynamicLinks.js'

// Components
import MobileNavItem from './MobileNavItem'

export default function MobileNav({onClose}) {
    const [navLinks, setNavLinks] = useState(navigaitionLinks)
    return (
        <ul id='mobile-nav'>
            {
                navLinks.length && navLinks.map(link => (
                    <MobileNavItem key={'mobile-' + link.id}  {...link} onClose={onClose} />
                ))
            }
        </ul>
    )
}
