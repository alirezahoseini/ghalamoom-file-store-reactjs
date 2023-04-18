import {TbListDetails, TbLayoutGrid} from 'react-icons/tb'
import './ListSwitchingButton.css'

export default function ListSwitchingButton({isList, setIsList}) {
  return (
    <div id='list-switching' className='text-lg bg-slate-200 w-fit flex items-center rounded-3xl overflow-hidden p-1 relative dark:bg-slate-900'>
        <div className={`bg-shape-list-switch ${isList === false && 'left'}`}></div>
        <button className={`${isList && 'active'}`} onClick={()=> setIsList(prev => !prev)}>
            <TbListDetails />
        </button>
        <button className={`${!isList && 'active'}`} onClick={()=> setIsList(prev => !prev)}>
            <TbLayoutGrid />
        </button>
    </div>
  )
}
