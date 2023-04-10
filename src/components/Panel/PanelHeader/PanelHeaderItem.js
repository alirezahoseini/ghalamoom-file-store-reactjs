import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PanelHeaderItem({ title, path, icon, onClose = null }) {
    return (
        <li onClick={onClose} >
            <NavLink to={path} className={`mobile-menu-item p-2 text-secondary-2 my-2 flex rounded-lg items-center hover:bg-gray-1 transition-all duration-300 ${isActive => isActive ? "active" : ""}`} >
                <span className='text-lg ml-2'>
                    {icon}
                </span>
                <span>{title}</span>
            </NavLink>
        </li>
    )
}
