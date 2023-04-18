

// components
import ListSwitchingButton from './ListSwitchingButton/ListSwitchingButton'
import NewItemButton from './NewItemButton/NewItemButton'

export default function CategoriesHeader({isList, setIsList, type, title}) {
  return (
    <div id='categories-header' className='w-full bg-slate-50 p-3 rounded-lg dark:bg-slate-800'>
        <div className="right-elements flex items-center justify-between">
            <ListSwitchingButton isList={isList} setIsList={setIsList} />
            <NewItemButton title={`${title} جدید`} path={`/panel/new${type}`} />
        </div>
    </div>
  )
}
