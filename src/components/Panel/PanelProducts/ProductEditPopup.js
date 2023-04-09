import React, { useEffect, useState } from "react"
import { FaTimes } from 'react-icons/fa'


// Files 
import { formValidation } from '../../../utils.js'


// Components
import Input from "../../Global/Input"
import Textarea from "../../Global/Textarea"
import ImageInput from "../../Global/ImageInput.js"
import Button from "../../Global/Button.js"

export default function ProductEditPopup({ isShow, productData, onClose, onSubmitForm }) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [size, setSize] = useState('')
    const [productImage, setProductImage] = useState('')
    const [productId, setProductId] = useState('')


    useEffect(() => {
        // check product id update
        setProductId(prevState => {
            if (prevState !== productData.id) {
                return productData.id
            } else {
                return prevState
            }
        })
    })

    useEffect(() => {
        // if product id changed ==> set new data to inputs
        setPrductDataToStates()
    }, [productId])

    // set product data to inputs
    const setPrductDataToStates = () => {
        if (productData) {
            setTitle(productData.title)
            setDescription(productData.description)
            setSize(productData.size)
            setProductImage(productData.image)
        } else {
            return
        }
    }







    const submitHandler = async () => {
        // Validate inputs 
        const inputValues = [
            title,
            description,
            size,
            productImage,
            productId,
        ]
        const isValid = await formValidation(inputValues)
        if(!isValid){
            alert('لطفا همه فیلد ها رو پر کنید.!')
        }else{
            const newProduct = {
                title,
                description,
                size,
                image: productImage,
                productId,
            }

            onSubmitForm(null , newProduct)
        }


    }

    return (
        <div id='product-edit-popup' className={`flex w-screen h-screen fixed top-0 right-0  justify-center items-center  z-50 transition-all duration-500 backdrop-blur-sm ${isShow ? 'opacity-100 visible pointer-events-auto ' : 'opacity-0 invisible pointer-events-none'}`}>
            {/* backdrop filter */}
            <div id="back-drop-filter" className={`w-full h-full cursor-pointer fixed top-0 right-0 bg-secondary-1 bg-opacity-10  transition-all duration-700 ${isShow ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>
            {/* Main section  */}
            <div className={`bg-white px-5 py-3 w-10/12 md:w-6/12 lg:w-4/12 rounded-xl flex flex-col items-center justify-center gap-5 z-10 transition-all duration-500 max-h-screen overflow-y-auto ${isShow ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
                {/* popup header */}
                <button onClick={onClose} className='text-xl text-gray-3 absolute top-4 right-4' ><FaTimes /></button>
                <h2 className="text-base font-bold text-text-1">ویرایش محصول</h2>
                {/* popup header */}
                <form onSubmit={submitHandler} className='w-full flex flex-col gap-3'>
                    {/* Title  */}
                    <Input type="text" value={title} placeholder='عنوان محصول' setValue={setTitle} name='title' />
                    {/* Description  */}
                    <Textarea value={description} setValue={setDescription} name='description' placeholder='توضیحات محصول' />
                    {/* Size  */}
                    <Input type="number" value={size} placeholder="سایز محصول" setValue={setSize} name='size' />
                    {/* Image  */}
                    <ImageInput imageValue={productImage} setNewImageValue={setProductImage} inputId='edite-product-image' />
                    {/* Buttons  */}
                    <div id="popup-footer-buttons" className="w-full flex items-center justify-around my-3 gap-3">
                        <p onClick={onClose} className=' inline-block w-full'>
                            <Button value='لغو' type='button' hover={true} bgColor='bg-gray-3' textColor="text-secondary-1" size='w-full' />
                        </p>
                        <p onClick={submitHandler} className='inline-block w-full'>
                            <Button value='ویرایش' type='button' hover={true}  size='w-full'/>
                        </p>

                    </div>
                </form>
            </div>
            {/* End of Main section  */}
        </div>
    )
}
