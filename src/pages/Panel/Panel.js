import { Outlet } from 'react-router-dom'
//// test
import PanelSideBar from './new/components/PanelSideBar/PanelSideBar';
import PanelHeaderTest from './new/components/PanelHeader/PanelHeader'

// Files 
import './Panel.css'

// components 
// import PanelHeader from './components/PanelHeader/PanelHeader'

export default function Panel() {
  return (
    // <div className='container mx-auto'>
    //   <div id="admin-panel" className='flex justify-center flex-col lg:flex-row lg:px-2 relative lg:gap-3'>
    //     <div className="lg:w-2/12 lg:h-fit lg:sticky lg:top-32 lg:right-0 " >
    //       <PanelHeaderTest />
    //     </div>
    //     <div className="w-full lg:w-10/12">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
    <div id="user-panel" className='bg-gray-0 '>
      <div className="container mx-auto">
        <div className="wrapper flex lg:gap-3 relative">
          <div className='w-auto sticky top-0 right-0 h-screen' >
            <PanelSideBar />
          </div>
          <div className='flex flex-col w-full'>
            <PanelHeaderTest />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
