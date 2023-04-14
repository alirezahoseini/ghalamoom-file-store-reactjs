import axios from 'axios';
import React, { useEffect, useState } from 'react'

// components 
import NewProductForm from './components/NewProductForm/NewProductForm'
import ProductsList from './components/ProductsList/ProductsList'
import ProductEditPopup from './components/EditeProductPopup/EditeProductPopup';
import Loader from '../../../../components/ui/Loader';


export default function PanelProducts() {

  const [products, setProducts] = useState([]);
  const [isLoadProducts, setIsLoadProducts] = useState(true);
  const [updateComponent, setUpdateComponent] = useState(false)
  const [isLoadDataFromApi, setIsLoadDataFromApi] = useState(false)
  const [isShowProductEditePopup, setIsShowProductEditePopup] = useState(false)
  const [currentProductForEdit, setCurrentProductForEdit] = useState('')


  useEffect(() => {
    const url = 'https://x8ki-letl-twmt.n7.xano.io/api:hq-tx9uX/products'
    axios.get(url)
      .then(res => res)
      .then(data => {
        console.log(data.data)
        setProducts(data.data)
        setIsLoadProducts(false)
      })
      .catch(err => {
        console.log(err)
        alert("محصولات بارگزاری نشدند : لطفا با از vpn استفاده کنید")
      })
  }, [updateComponent])


  // Add new product to product list
  const addNewProduct = (newProductInputValues) => {
    // show loader
    setIsLoadDataFromApi(true)

    const url = 'https://x8ki-letl-twmt.n7.xano.io/api:hq-tx9uX/products'
    // request
    axios.post(url, newProductInputValues)
      .then(res => res)
      .then(createdProduct => {
        setIsLoadDataFromApi(false)
        alert('محصول با موفقیت اضافه شد')
        // Product to preview list
        setProducts(prevState => [...prevState, createdProduct.data])
        setUpdateComponent(prev => !prev)
      }
      )
      .catch(err => {
        setIsLoadDataFromApi(false)
        alert('محصول اضافه نشد. دوباره سعی کنید')
        console.log(err)
      }
      )

  }

  // Remove product from list
  const removeProduct = (productId) => {
    // show loader
    setIsLoadDataFromApi(true)
    // request
    const url = `https://x8ki-letl-twmt.n7.xano.io/api:hq-tx9uX/products/${productId}`
    axios.delete(url)
      .then(res => {
        const newProductsList = products.filter(product => product.id !== productId)
        setProducts(newProductsList);
        alert('محصول با موفقیت پاک شد')
        setIsLoadDataFromApi(false)
      }).catch(err => {
        if (err.response) {
          console.log(err.response)
          setIsLoadDataFromApi(false)
        } else if (err.request) {
          alert("محصول پاک نشد : لطفا با از vpn استفاده کنید")
          setIsLoadDataFromApi(false)
        }
      })
  }

  // Edit product
  const editProduct = (productIdFromProductsList = null, editdProductObjectFromPopup = null) => {
    if (editdProductObjectFromPopup === null && productIdFromProductsList !== null) {
      ////// Set current product data to edit form popup and openit
      const currentProduct = products.filter(product => product.id === productIdFromProductsList)
      setCurrentProductForEdit(currentProduct[0])
      setIsShowProductEditePopup(true)
    } else {
      ////// Edit product from server and app
      const productId = editdProductObjectFromPopup[1];
      const newProduct = editdProductObjectFromPopup[0]

      // show loader
      setIsLoadDataFromApi(true)

      // request
      const url = `https://x8ki-letl-twmt.n7.xano.io/api:hq-tx9uX/products/${productId}`
      axios.post(url, newProduct)
        .then(res => res)
        .then(data => {
          setUpdateComponent(prevState => !prevState)
          alert('محصول با موفقیت ویرایش شد')
          setIsLoadDataFromApi(false)
          setIsShowProductEditePopup(false)
        })
        .catch(err => {
          console.log(err)
          alert("محصول ویرایش نشد : لطفا با  vpn استفاده کنید")
          setIsLoadDataFromApi(false)
          setIsShowProductEditePopup(false)
        })

    }
  }


  return (
    <div id='panel-products' className='flex flex-col items-start justify-around'>
      {/* Products list  */}
      <div className='w-full p-3'>
        <ProductsList productsData={products} onRemoveProduct={removeProduct} onEditProduct={editProduct} isLoadProducts={isLoadProducts} />
      </div>
      {/* New product form  */}
      <div className='w-full p-3'>
        <NewProductForm addNewProductToList={addNewProduct} />
      </div>
      {
        <ProductEditPopup isShow={isShowProductEditePopup} onClose={() => setIsShowProductEditePopup(prevState => !prevState)} productData={currentProductForEdit} onSubmitForm={editProduct} />
      }
      {
        /* Showing Loader  */
        <Loader isShow={isLoadDataFromApi} />
      }
    </div>
  )
}
