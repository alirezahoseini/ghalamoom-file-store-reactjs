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
    const [sizeValue, setSizeValue] = useState('');
    const [productImage, setProductImage] = useState('');
    const [validate, setValidate] = useState(false);

    // Create New product 
    const submitHandler = async (event) => {
        event.preventDefault()

        // Validate inputs 
        const inputsValue = [
            titleValue,
            descriptionValue,
            sizeValue,
            productImage
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
                image: productImage
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
    }


    return (
        <div id='new-product-form' className='bg-white p-3 rounded-lg'>
            <h2 className='flex items-center text-gray-5 mt-3 mb-10 justify-center'>
                <MdAddCircleOutline className='text-4xl ml-3' />
                <span className='text-2xl'>افزودن محصول جدید</span>
            </h2>
            <form className='my-5 flex flex-col gap-5' onSubmit={(event) => submitHandler(event)}>
                {/* Title input  */}
                <Input value={titleValue} setValue={setTitleValue} placeholder='عنوان محصول جدید' name='title' max={50} min={5} />
                {/* Description Input  */}
                <Textarea setValue={setDescriptionValue} value={descriptionValue} placeholder='توضیحات محصول' name='description' />
                <Input type='number' value={sizeValue} placeholder='سایز فایل: مثلا 28' setValue={setSizeValue} name='size' />
                {/* Image Input  */}
                <ImageInput imageValue={productImage} setNewImageValue={setProductImage} inputId='new-product-image-in-form' />

                {/* Submit Button  */}
                <Button value='ایجاد محصول جدید' type='submit' hover={true} />
            </form>
        </div>
    )
}
