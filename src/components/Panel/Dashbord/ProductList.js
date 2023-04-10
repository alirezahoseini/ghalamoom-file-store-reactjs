import React, { useEffect, useState } from 'react'
import { BiLoader } from 'react-icons/bi'
import axios from 'axios'
import ProductListItem from './ProductListItem'

export default function ProductList({ category, headTitle = 'عنوان پیشفرض' }) {

    const [products, setProducts] = useState([])
    const [showLoader, setShowLoader] = useState(true)


    useEffect(() => {
        const url = `https://x8ki-letl-twmt.n7.xano.io/api:_UjxYfOm/${category}`
        axios.get(url)
            .then(res => res)
            .then(data => {
                console.log(data.data)
                setProducts(data.data)
                setShowLoader(false)
            })
            .catch(err => {
                console.log(err)
                alert("محصولات بارگزاری نشدند : لطفا از vpn استفاده کنید")
            })
    }, [])

    return (
        <div className='bg-white p-3 rounded-2xl w-full'>
            <h2 className='text-base text-center text-secondary-2 '>{headTitle}</h2>

            <table className='w-full text-right flex flex-col gap-3 text-xs lg:text-sm'>
                <thead >
                    <tr className='w-full flex py-1 px-2 border-b-2 border-gray-1 pb-3 text-secondary-2'>
                        <th className='w-4/12'>تصویر</th>
                        <th className='w-4/12'>عنوان</th>
                        <th className='w-4/12'>بیشتر</th>
                    </tr>
                </thead>
                <tbody className='flex flex-col gap-4' >
                    {
                        showLoader ? (
                            <tr id="loading" className='w-full flex justify-center text-secondary-2 text-2xl' >
                                <td>
                                    <BiLoader className='animate-spin' />
                                </td>
                            </tr>
                        ) : (
                            products.length > 0 ? (
                                products.map(product => (
                                    <ProductListItem key={product.id} {...product} />
                                ))
                            ) : (
                                <tr>
                                    <td>
                                        <span>محصولی وجود ندارد</span>
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
