import {TbMessageCircle2, TbBellRinging} from 'react-icons/tb'

// components
import SearchBox from './SearchBox/SearchBox'
import MobileMenu from './MobileMenu/MobileMenu'
import HeaderIcon from './HeaderIcon/HeaderIcon'

export default function PanelHeader() {
  return (
    <div id='panel-header' className='w-full lg:pt-3 sticky top-0 right-0 z-50' >
      <div className="wrapper">
        <div className='flex justify-between bg-white p-3 lg:rounded-xl shadow-both-2 lg:shadow-both-1 backdrop-blur-md bg-opacity-80 dark:bg-slate-800 dark:bg-opacity-80'>
          {/* right elements */}
          <div className="right-items flex">
            <MobileMenu />
          </div>
          {/* left elements */}
          <div className="left-items flex lg:w-full lg:justify-between">
            <SearchBox />
            <div id='icons' className="flex gap-2 mr-5">
            <HeaderIcon badgeColor={'before:bg-green-400'} delay={5000}>
              <TbMessageCircle2 />
            </HeaderIcon>
            <HeaderIcon badgeColor={'before:bg-orange-400'} delay={15000}>
              <TbBellRinging />
            </HeaderIcon>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  )
}
