import { BiLoader } from 'react-icons/bi'

// Components
import ProductPreviewItem from "./ProductPreviewItem"

export default function ProductsPreviwe({ productsData, isLoadProducts, onRemoveProduct, onEditProduct }) {

  return (
    <div id='products-preview' className='bg-white rounded-xl p-2'>
      <h2 className='text-xl font-bold text-gray-5 text-center'>محصولات</h2>
      <table className='w-full flex flex-col mt-3 '>
        <thead>
          <tr className='w-full flex text-sm justify-evenly text-white text-center bg-gray-4 rounded-lg p-3'>
            <td className='w-2/12' >آیدی</td>
            <td className='w-3/12' >تصویر</td>
            <td className='w-7/12'>عنوان</td>
            <td className='w-4/12'>گزینه ها</td>
          </tr>
        </thead>
        <tbody>
          {
            isLoadProducts ? (
              // Show Loader
              <tr className="text-2xl flex w-full justify-center p-5 text-text-1 animate-spin">
                <td >
                  <BiLoader />
                </td>
              </tr>
            ) : (
              // Chack Exist products
              productsData.length ? (
                // show products
                productsData.length > 0 && productsData.map(product => (
                  <ProductPreviewItem  key={product.id} {...product} onRemove={onRemoveProduct} onEdit={onEditProduct} />
                ))
              ) : (
                // Show Empty products
                <tr className="text-lg flex w-full justify-center p-5 text-text-1">
                  <td >
                    <h4 >محصولی وجود ندارد</h4>
                  </td>
                </tr>
              )
            )
          }

        </tbody>
      </table>
    </div>
  )
}
