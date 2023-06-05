import React, { memo, useMemo } from 'react'
// datas
import { dynamicLinks } from '../../../data/links'
//utils
import { getCooki } from '../../../utils/cookis'

// Components
import DesktopNav from './Nav/DesktopNav'
import Logo from '../../../components/ui/Logo'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import SearchBox from './SearchBox/SearchBox'
import Button from './../../../components/ui/Button'

const DesktopHeader = memo(() => {

  return (
    <div id='desktop-header' className='hidden lg:flex w-full'>
      <div className='bg-white items-center justify-between m-5 px-7 py-5 w-full rounded-2xl shadow-both-2 bg-opacity-95 flex'>
        {/* Section One */}
        <div id='right-section' className='max-w-8/12 w-fit flex justify-between items-center' >
          {useMemo(() => <Logo />, [])}
          {useMemo(() => <DesktopNav />, [])}

        </div>
        {/* Section Two */}
        <div id='left-section' className=' w-fit flex items-center justify-between gap-3'>
          <div className='md:hidden xl:inline-block'>
            <SearchBox />
          </div>
          <ShoppingCart />
          <Button type={'button'} value={`${getCooki('token') !== null ? 'پنل کاربری' : 'ورود | ثبت نام'}`} hover={true} link={true} url={dynamicLinks.panel} />
        </div>
      </div>
    </div>
  )
})

export default DesktopHeader