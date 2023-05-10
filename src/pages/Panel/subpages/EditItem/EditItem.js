import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

// components
import FormHeader from "../components/FormHeader/FormHeader";
import EditProduct from "./EditProduct/EditProduct";
import EditCourse from "./EditeCourse/EditeCourse";
import EditArtwork from "./EditArtwork/EditArtwork";

export default function EditItem() {
    const userLocation = useLocation();
    const [formName, setFormName] = useState('');
    const [formTitle, setFormTitle] = useState('');

    useEffect(() => {
        let path = userLocation.pathname;
        path = path.split('/');
        setFormName(path[2]);
    }, [])
    useEffect(() => {
        if (formName === 'editproduct') {
            setFormTitle('ویرایش محصول');
        } else if(formName === 'editcourse'){
            setFormTitle('ویرایش دوره');
        } else if(formName === 'editartwork'){
            setFormTitle('ویرایش نمونه کار')
        }
    }, [formName])
    return (
        <div id="new-item">
            <div className="wrapper my-3 p-2 text-xs">
                <FormHeader title={formTitle} />
                {formName === 'editproduct' && (
                    <EditProduct/>
                )}
                {formName === 'editcourse' && (
                    <EditCourse/>
                )}
                {formName === 'editartwork' && (
                    <EditArtwork/>
                )}
            </div>
        </div>
    )
}

