import React from 'react'

// Components 
import NewProductForm from './NewProductForm'
import ProductsPreviwe from './ProductsPreviwe'

export default function PanelProducts() {
  return (
    <div id='panel-products' className='flex items-center justify-around'>
      <div className='w-6/12 p-5'>
        <NewProductForm />
      </div>
      <div className='w-6/12 p-5'>
        <ProductsPreviwe />
      </div>
    </div>
  )
}
