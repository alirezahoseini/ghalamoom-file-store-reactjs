import { useState } from 'react'
// components
import CategoriesHeader from "../../components/CategoriesHeader/CategoriesHeader"
import DataList from '../../components/DataList/DataList'


import productImage0 from '../../../../../assets/images/products/1.jpg'
import productImage1 from '../../../../../assets/images/products/Clash.jpg'
import productImage2 from '../../../../../assets/images/products/DAKAR.jpg'
import productImage3 from '../../../../../assets/images/products/Enrique.jpg'
import productImage4 from '../../../../../assets/images/products/Kelium.jpg'
import productImage5 from '../../../../../assets/images/products/Magistic.jpg'



export default function Products() {
    const productsArray = [
        {
          id: 1,
          title: 'محصول شماره یک',
          category: 'فایل psd',
          inStock: true,
          salesCount: 15,
          price: 35,
          image: productImage0
        },
        {
          id: 2,
          title: "فایل لایه باز اینستاگرمی",
          category: 'فایل ai',
          inStock: false,
          salesCount: 632,
          price: 22,
          image: productImage1
        },
        {
          id: 3,
          title: "فونت DAKAR",
          category: 'فونت',
          inStock: true,
          salesCount: 5,
          price: 56,
          image: productImage2
        },
        {
          id: 4,
          title: "پوستر جدید Enrique",
          category: 'پوستر',
          inStock: true,
          salesCount: 35,
          price: 14,
          image: productImage3
        },
        {
          id: 5,
          title: "فونت Kelium",
          category: 'فونت',
          inStock: true,
          salesCount: 19,
          price: 5,
          image: productImage4
        },
        {
          id: 6,
          title: "پریست Magistic",
          category: 'پریست لایت روم',
          inStock: false,
          salesCount: 325,
          price: 15,
          image: productImage5
        },
      ]
    //////// For list or grid products items ===> change withe categories button show in products list ////
    const [isList, setIsList] = useState(true)
    return (
        <div id='products'>
            <div className="wrapper px-2 my-3">
                <CategoriesHeader isList={isList} setIsList={setIsList} title="محصول" type='product'  />
                <DataList isList={isList} data={productsArray} title="محصول" type='product' />
            </div>
        </div>
    )
}
