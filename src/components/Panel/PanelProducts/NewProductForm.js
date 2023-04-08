import React , {useState} from 'react'
import { MdAddCircleOutline } from 'react-icons/md'

// Files 
import { formValidation } from '../../../utils.js'

// Componenets 
import Input from './../../Global/Input';
import Textarea from './../../Global/Textarea';
import ImageInput from '../../Global/ImageInput'
import Button from '../../Global/Button'


export default function NewProductForm() {

    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [sizeValue, setSizeValue] = useState(0);
    const [productImage, setProductImage] = useState('');
    const [validate, setValidate] = useState(false)


    // Create New product 
    const createNewProduct = async (event) => {
        event.preventDefault()

        const inputsValue = [
            titleValue ,
            descriptionValue,
            sizeValue,
            productImage
        ]
        
        const validation = await formValidation(inputsValue)

        if(!validation){
            alert('لطفا تمام مقادیر را پر کنید.!')
        }else{
            console.log(inputsValue)
        }
        
        
    }


    return (
        <div id='new-product-form' className='bg-white p-3 rounded-lg'>
            <h2 className='flex items-center text-gray-5 mt-3 mb-10 justify-center'>
                <MdAddCircleOutline  className='text-4xl ml-3'/>
                <span className='text-2xl'>افزودن محصول جدید</span>
            </h2>
            <form className='my-5 flex flex-col gap-5' onSubmit={(event) => createNewProduct(event)}>
                {/* Title input  */}
                <Input value={titleValue} setValue={setTitleValue} placeholder='عنوان محصول جدید' name='title' validation={validate} />
                {/* Description Input  */}
                <Textarea setValue={setDescriptionValue} value={descriptionValue} placeholder='توضیحات محصول' name='description' validation={validate}/>
                <Input type='text' value={sizeValue} placeholder='سایز فایل: مثلا 28mb' setValue={setSizeValue} name='size' validation={validate} />
                {/* Image Input  */}
                <ImageInput setValue={setProductImage} validation={validate} />
                {/* Submit Button  */}
                <Button value='ایجاد محصول جدید' type='submit' hover={true} />
            </form>
        </div>
    )
}
