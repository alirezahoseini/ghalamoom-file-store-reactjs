import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TbX } from 'react-icons/tb'

// contexts
import { ShoppingCartContext } from '../../../../components/ui/ShopipingCart/ShoppingCartProvider'

// default image
import defaultImage from '../../../../assets/images/panel/imageDefault.json'

// links
import {dynamicLinks} from '../../../../data/links'

export default function ShoppingCartItem(props) {
    const {shoppingCartDespatch} = useContext(ShoppingCartContext)
    const { 
        uniqId,
        id,
        type = 'product',
        title = 'بدون عنوان',
        image,
        price = 10,
        } = props
    return (
        <div className='flex items-center max-w-full p-2 my-2'>
            <Link to={`${dynamicLinks[type + 's']}/${id}`} className='flex items-center w-10/12'>
            <img src={image ? image : defaultImage[0]} alt={title} className='w-2/12 rounded-md' />
            <div className='w-8/12 text-right pr-2 text-base font-bold'>
                <h4 className=' text-slate-800'>
                    {title}
                </h4>
                <p className='text-slate-500 '>
                    {price}
                    <span className='mr-2'>تومان</span>
                </p>
            </div>
            </Link>
            <div className='w-2/12 mr-auto text-2xl'>
                <TbX className=' cursor-pointer hover:border border-red-700 hover:text-red-700 rounded-full ' onClick={
                    () => shoppingCartDespatch ({
                        type: 'REMOVE_PRODUCT',
                        uniqId
                    })
                } title='حذف از سبد خرید' />
            </div>
        </div>
    )
}