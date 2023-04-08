import React from 'react'

// Components 
import NewProductForm from './NewProductForm'
import ProductsPreviwe from './ProductsPreviwe'

export default function PanelProducts() {
  return (
    <div id='panel-products' className='flex flex-col lg:flex-row items-center justify-around'>
      <div className='w-full p-3 lg:w-6/12 lg:p-5'>
        <NewProductForm />
      </div>
      <div className='w-full p-3 lg:w-6/12 lg:p-5'>
        <ProductsPreviwe />
      </div>
    </div>
  )
}
