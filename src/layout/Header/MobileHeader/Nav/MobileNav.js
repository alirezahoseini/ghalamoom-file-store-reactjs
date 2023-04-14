import React, { useState } from 'react'

// datas 
import { navigaitionLinks } from '../../../../data/links'

// components
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
