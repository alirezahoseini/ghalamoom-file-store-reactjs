/* how use

 1- send image file with (setOrginalImage) state.
 2- you can access this file affter send image in (selectedImage) state ===> 
    {
        base64: reader.result,
        name: file.name,
        type: file.type,
        size: file.size
    }

3- you most clear states affter get image object 
 - // clear useBase64Image states
      setOrginalImage(null)
      setSelectedImage(null)

*/

import React, { useEffect, useState } from 'react'

export default function useBase64Image() {
    const [orginalImage, setOrginalImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);

    const selectedFile = () => {
        const file = orginalImage;
        const reader = new FileReader();
        // max size check
        if (file && file.size > 1000000) {
            alert('حداکثر فایل مجاز 500 کیلوبایت است')
        } else {
            try {
                reader.addEventListener('load', () => {
                    setSelectedImage({
                        base64: reader.result,
                        name: file.name,
                        type: file.type,
                        size: file.size
                    });
                })
                reader.readAsDataURL(file)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (orginalImage !== null) {
            selectedFile()
        }
    }, [orginalImage])

    return { setOrginalImage, selectedImage, setSelectedImage }
}
