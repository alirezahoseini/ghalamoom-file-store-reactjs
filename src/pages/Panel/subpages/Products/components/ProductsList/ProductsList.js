import { useState } from 'react'
import { BiLoader } from 'react-icons/bi'

// components
import ProductPreviewItem from "./ProductsListItem"
import Modal from '../../../../../../components/ui/Modal';
import Button from '../../../../../../components/ui/Button';

export default function ProductsPreviwe({ productsData, isLoadProducts, onRemoveProduct, onEditProduct }) {

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [deletedItemId, setDeleteIltemId] = useState(0)

  // Delet handler
  const deleteHandler = (productId) => {
    setIsShowDeleteModal(true)
    setDeleteIltemId(productId)
  }

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
                  <ProductPreviewItem key={product.id} {...product} onRemove={deleteHandler} onEdit={onEditProduct} />
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
      {
        // Showing Delete confirm modal 
        <Modal isShow={isShowDeleteModal} onClose={() => setIsShowDeleteModal(prevState => !prevState)} >
          {/* Modal Content  */}
          <div className='w-full text-center flex flex-col gap-6 py-3' >
            <h2 className='text-md text-secondary-2 font-bold'>آیا محصول مورد نظر پاک شود؟</h2>
            <div className='w-full flex gap-3'>
              <Button value='لغو' type='button' hover={true} size='w-6/12' clickEvent={() => setIsShowDeleteModal(prevState => !prevState)} />
              <Button value='تایید' type='button' hover={true} bgColor='bg-gray-1' textColor='text-secondary-1' size='w-6/12' clickEvent={() => {
                onRemoveProduct(deletedItemId)
                setIsShowDeleteModal(prevState => !prevState);
              }} />
            </div>
          </div>
          {/* End of Modal Content  */}
        </Modal>
      }
    </div>
  )
}
