import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

// components
import FormHeader from '../../components/FormHeader/FormHeader';
import NewProduct from "./NewProduct/NewProduct";
import NewCourse from "./NewCourse/NewCourse";

export default function NewItem() {
    const userLocation = useLocation();
    const [formName, setFormName] = useState('');
    const [formTitle, setFormTitle] = useState('');

    useEffect(() => {
        let path = userLocation.pathname;
        path = path.split('/');
        setFormName(path[2]);
    }, [])

    useEffect(() => {
        if (formName === 'newproduct') {
            setFormTitle('افزودن محصول جدید');
        }else if(formName === 'newcourse'){
            setFormTitle('افزودن دوره جدید');
        }
    }, [formName])
    return (
        <div id="new-item">
            <div className="wrapper my-3 p-2 text-xs">
                <FormHeader title={formTitle} />
                {formName === 'newproduct' && (
                    <NewProduct/>
                )}
                {formName === 'newcourse' && (
                    <NewCourse/>
                )}
            </div>
        </div>
    )
}
