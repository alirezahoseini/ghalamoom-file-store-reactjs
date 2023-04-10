import React, { useState } from 'react'
import { MdAddCircleOutline } from 'react-icons/md'

// Files 
import { formValidation } from '../../../utils.js'

// Componenets 
import Input from './../../Global/Input';
import Textarea from './../../Global/Textarea';
import Button from '../../Global/Button'
import ImageInput from '../../Global/ImageInput.js';


export default function NewProductForm(addNewProductToList) {

    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [sizeValue, setSizeValue] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productFormat, setProductFormat] = useState('');
    const [validate, setValidate] = useState(false);

    // Create New product 
    const submitHandler = async (event) => {
        event.preventDefault()

        // Validate inputs 
        const inputsValue = [
            titleValue,
            descriptionValue,
            sizeValue,
            productImage,
            productCategory,
            productFormat
        ]
        const validation = await formValidation(inputsValue)
        if (!validation) {
            alert('لطفا تمام مقادیر را پر کنید.!')
        } else {
            // create product data object
            const product = {
                title: titleValue,
                description: descriptionValue,
                size: sizeValue,
                image: productImage,
                category: productCategory,
                format: productFormat,
                info: productInfo
            }
            addNewProductToList.addNewProductToList(product);
            restForm();
        }
    }

    // Reset form
    const restForm = () => {
        setTitleValue('');
        setDescriptionValue('')
        setSizeValue('')
        setValidate(false)
        setProductImage('')
        setProductCategory('')
        setProductFormat('')
        setProductInfo('')
    }


    return (
        <div id='new-product-form' className='bg-white p-3 rounded-lg'>
            <h2 className='flex items-center text-gray-5 mt-3 mb-10 justify-center'>
                <MdAddCircleOutline className='text-3xl ml-3' />
                <span className='text-xl font-bold'>افزودن محصول جدید</span>
            </h2>
            <form className='my-5 flex flex-col gap-4' onSubmit={(event) => submitHandler(event)}>
                {/* Title input  */}
                <Input value={titleValue} setValue={setTitleValue} placeholder='عنوان محصول جدید' name='title' max={50} min={5} />
                {/* Product info input  */}
                <Textarea setValue={setProductInfo} value={productInfo} placeholder='توضیح کوتاه محصول : حداکثر 15 کلمه' name='description' />
                {/* Description Input  */}
                <Textarea setValue={setDescriptionValue} value={descriptionValue} placeholder='توضیحات محصول' name='description' rows={5} />
                <div className='w-full flex justify-around items-center gap-2'>
                    {/* Size  Input */}
                    <Input type='number' value={sizeValue} placeholder='سایز فایل: مثلا 28' setValue={setSizeValue} name='size' />
                    {/* Category input  */}
                    <Input type='text' value={productCategory} placeholder='دسته بندی: مثلا فونت' setValue={setProductCategory} name='category' max={30} />
                </div>
                {/* Format input  */}
                <Input type='text' value={productFormat} placeholder='فرمت فایل: مثلا ایلوستریتور ai' setValue={setProductFormat} name='format' max={30} />
                {/* Image Input  */}
                <ImageInput imageValue={productImage} setNewImageValue={setProductImage} inputId='new-product-image-in-form' />

                {/* Submit Button  */}
                <Button value='ایجاد محصول جدید' type='submit' hover={true} />
            </form>
        </div>
    )
}
