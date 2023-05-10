import { TbHeart, TbHeartFilled, TbLoader2 } from "react-icons/tb"
import './LikeCounterButton.css'
import { memo, useEffect, useState } from "react"

// hooks
import useAxiosPut from "../../../../hooks/axios/useAxiosPut";

// datas 
import { apiLinks } from "../../../../data/links";

const LikeCounterButton = memo(({ type = 'product', ...otherProps }) => {
    const { axiosPutResult, axiosPutError, axiosPutIsPending, setAxiosPutUrl, setAxiosPutData } = useAxiosPut();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(otherProps.likes);
    const [itemId, setItemId] = useState(otherProps.id)
    const likeHandler = () => {
        let newProductObject;
        if (!isLiked) {
            newProductObject = { ...otherProps, likes: otherProps.likes + 1 };
        } else {
            newProductObject = { ...otherProps };
        }
        setAxiosPutUrl(`${apiLinks[`${type}s`]}/${otherProps.id}`)
        setAxiosPutData(newProductObject)
    }
    useEffect(() => {
        if (axiosPutResult !== null) {
            setIsLiked(prev => !prev);
            if (!isLiked) {
                setLikeCount(prevLikes => prevLikes + 1)
            } else {
                setLikeCount(prevLikes => prevLikes - 1)
            }
        } else if (axiosPutError !== null) {
            console.log(axiosPutError)
        }
    }, [axiosPutError, axiosPutResult,])

    useEffect(()=>{
        if(itemId !== otherProps.id){
            setItemId(otherProps.id)
            setLikeCount(otherProps.likes)
            setIsLiked(false)
        }
    })

    
    return (
        <button type="button" onClick={likeHandler}
            className={`like-counter-btn flex items-center justify-center px-3 font-bold py-2 gap-2 rounded-md text-xs font-yekan-bakh ${isLiked && 'liked'}`} disabled={axiosPutIsPending}
        >
            {!axiosPutIsPending ? (
                <>
                    {isLiked ? (
                        <TbHeartFilled className="text-base" />
                    ) : (
                        <TbHeart className="text-base" />
                    )}
                    <span> {likeCount}</span>
                </>) : (
                <TbLoader2 />
            )
            }
        </button >
    )
})

export default LikeCounterButton
