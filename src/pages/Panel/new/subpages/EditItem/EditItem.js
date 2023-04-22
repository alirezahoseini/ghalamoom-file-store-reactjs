import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

// components
import FormHeader from "../../components/FormHeader/FormHeader";
import EditProduct from "./EditProduct/EditProduct";

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
        }
    }, [formName])
    return (
        <div id="new-item">
            <div className="wrapper my-3 p-2 text-xs">
                <FormHeader title={formTitle} />
                {formName === 'editproduct' && (
                    <EditProduct/>
                )}
            </div>
        </div>
    )
}

