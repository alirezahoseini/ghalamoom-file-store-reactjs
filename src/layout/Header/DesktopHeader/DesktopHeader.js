import React from 'react'
import { Link } from 'react-router-dom'

// datas
import { dynamicLinks } from '../../../data/links'
//utils
import { getCooki } from '../../../utils/cookis'

// Components
import DesktopNav from './Nav/DesktopNav'
import Logo from '../../../components/ui/Logo'
import DesktopShopingCart from './DesktopShopingCart/DesktopShopingCart'
import SearchBox from './SearchBox/SearchBox'
import Button from './../../../components/ui/Button'

export default function DesktopHeader() {
  return (
    <div id='desktop-header' className='hidden lg:flex w-full'>
      <div className='bg-white items-center justify-between m-5 px-7 py-5 w-full rounded-2xl shadow-both-2 bg-opacity-95 flex'>
        {/* Section One */}
        <div id='right-section' className='max-w-8/12 w-fit flex justify-between items-center' >
          <Logo />
          <DesktopNav />
        </div>
        {/* Section Two */}
        <div id='left-section' className=' w-fit flex items-center justify-between gap-3'>
          <DesktopShopingCart />
          <div className='md:hidden xl:inline-block'>
            <SearchBox />
          </div>
          <Button type={'button'} value={`${getCooki('token') !== null ? 'پنل کاربری' : 'ورود | ثبت نام'}`} hover={true} link={true} url={dynamicLinks.panel} />
        </div>
      </div>
    </div>
  )
}
