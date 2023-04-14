import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'

// files
import './DesktopNavItem.css'


export default function DesktopNavItem({ name, url, subMenu, subLinks = null }) {

  return (
    <>
      {
        !subMenu ? (
          // Single -------------------------------------------------------
          <li className={`mobile-nav-item font-yekan-bakh font-bold text-lg flex items-center text-primary-1 relative`}>
            <NavLink to={url} className={` relative px-3 pt-1 rounded-lg  ${isActive =>
              isActive ? "active" : ""
              }}`}>
              <i id='bg' className='absolute top-0 right-0 h-full w-full bg-primary-1 opacity-20 rounded-lg transition-all duration-300'></i>
              <span>
                {name}
              </span>
            </NavLink>
            <span className='w-1 h-3 inline-block border-l-2 border-dotted border-gray-3 mr-1'></span>
          </li >
        ) : (
          // With subMenu -----------------------------------------------
          <li className={`mobile-nav-item submenu font-yekan-bakh font-bold text-lg text-primary-1  relative`}
          >
            <div className={`relative px-3 pt-1 rounded-lg w-fit h-full flex items-center ${(isActive =>
              isActive ? "active" : "")
              }`}>
              <i id='bg' className='absolute top-0 right-0 h-full w-full bg-primary-1 opacity-20 rounded-lg transition-all duration-300'></i>
              <div id='title'>
                <span>
                  {name}
                </span>
                <span className='mr-3 text-xs'>
                  <FaChevronDown className='inline mb-1' />
                </span>
              </div>
              <div className='sublinks absolute top-0 right-0 pt-14 cursor-default '>
                <div className={` bg-white w-64 rounded-2xl flex flex-col overflow-hidden`}>
                  {subLinks.map((link) => (
                    <NavLink to={link.url} key={'desktop' + link.id} className={`submenu-item hover:bg-gray-3 cursor-pointer font-yekan-bakh p-4 ${isActive =>
                      isActive ? "active" : ""
                      }}`}>
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </li >
        )
      }
    </>
  )
}
