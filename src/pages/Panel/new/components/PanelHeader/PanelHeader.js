
// components
import SearchBox from './SearchBox/SearchBox'
import MobileMenu from './MobileMenu/MobileMenu'

export default function PanelHeaderTest() {
  return (
    <div id='panel-header' className='w-full lg:pt-3 sticky top-0 right-0' >
      <div className="wrapper">
        <div className='bg-white p-3 lg:rounded-xl shadow-both-2 lg:shadow-both-1 backdrop-blur-md bg-opacity-80 dark:bg-slate-800 dark:bg-opacity-80'>
          {/*  */}
          <div className="right-items flex">
            <MobileMenu/>
            <SearchBox/>
          </div>
          {/*  */}
          {/*  */}
          <div className="left-items"></div>
          {/*  */}
        </div>
      </div>
    </div>
  )
}
