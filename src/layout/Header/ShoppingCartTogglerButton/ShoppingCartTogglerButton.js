import React, {useContext} from 'react'
import { RiShoppingBasketLine } from 'react-icons/ri'

// contexts
import { ShoppingCartContext } from '../../../Contexts/ShopipingCart/ShoppingCartProvider'

export default function ShoppingCartTogglerButton(props) {
    const { shoppingCartState } = useContext(ShoppingCartContext);
    return (
        <button onClick={() => props.onClickEvent()} type='button' className="relative  flex items-center justify-center p-2 text-2xl rounded-xl mx-3 bg-slate-100 text-slate-700 border hover:bg-slate-500 hover:text-slate-100">
            <RiShoppingBasketLine />
            {shoppingCartState.itemsCount > 0 && (
                <span className='absolute -right-1 -top-1 bg-blue-500 rounded-fifty w-4 h-4 text-slate-50 flex items-center justify-center' style={{ fontSize: '11px' }}>{shoppingCartState.itemsCount}</span>
            )}
        </button>
    )
}
