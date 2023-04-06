import React, { useState } from 'react'
import dynamicLinks from '../../../dynamicLinks.js'

// Files 
import daynamicLinks from '../../../dynamicLinks.js'

// Components
import MobileNavItem from './MobileNavItem'

export default function MobileNav() {
    const [navLinks, setNavLinks] = useState([
        { id: 1, name: 'خانه', url: dynamicLinks.home, subMenu: false },
        { id: 2, name: 'دوره های آموزشی', url: dynamicLinks.course, subMenu: false },
        { id: 3, name: 'فروشگاه', url: dynamicLinks.shop, subMenu: false },
        { id: 4, name: 'نمونه کارها', url: dynamicLinks.artworks, subMenu: false },
        { id: 5, name: 'درباره من', url: dynamicLinks.about, subMenu: false },
        {
            id: 6, name: 'وبلاگ', url: '#', subMenu: true, subLinks: [
                { id: 1, name: 'مقالات', url: dynamicLinks.mag },
                { id: 2, name: 'ویدیو', url: dynamicLinks.videos },
                { id: 3, name: 'پادکست', url: dynamicLinks.cast },
            ]
        }
    ])
    return (
        <ul className=''>
            {
                navLinks.length && navLinks.map(link => (
                    <MobileNavItem key={link.id} {...link} />
                ))
            }
        </ul>
    )
}
