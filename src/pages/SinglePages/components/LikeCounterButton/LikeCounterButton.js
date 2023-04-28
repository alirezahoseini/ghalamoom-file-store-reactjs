import { TbHeart, TbHeartFilled, TbLoader2 } from "react-icons/tb"
import './LikeCounterButton.css'
import { useEffect, useState } from "react"

// hooks
import useAxiosPost from "../../../../hooks/axios/useAxiosPost";

// datas 
import { apiLinks } from "../../../../data/links";

export default function LikeCounterButton({ type = 'product', ...otherProps }) {
    const { axiosPostResult, axiosPostError, axiosPostIsPending, setAxiosPostUrl, setAxiosPostData } = useAxiosPost();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(otherProps.likes)
    const likeHandler = () => {
        let newProductObject;
        if (!isLiked) {
            newProductObject = { ...otherProps, likes: otherProps.likes + 1 };
        } else {
            newProductObject = { ...otherProps };
        }
        setAxiosPostUrl(`${apiLinks[`${type}s`]}/${otherProps.id}`)
        setAxiosPostData(newProductObject)

    }
    useEffect(() => {
        if (axiosPostResult !== null) {
            setIsLiked(prev => !prev);
            if (!isLiked) {
                setLikeCount(prevLikes => prevLikes + 1)
            } else {
                setLikeCount(prevLikes => prevLikes - 1)
            }
        } else if (axiosPostError !== null) {
            console.log(axiosPostError)
        }
    }, [axiosPostError, axiosPostResult])
    return (
        <button type="button" onClick={likeHandler}
            className={`like-counter-btn flex items-center justify-center px-3 font-bold py-2 gap-2 rounded-md text-xs font-yekan-bakh ${isLiked && 'liked'}`} disabled={axiosPostIsPending}
        >
            {!axiosPostIsPending ? (
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
}
