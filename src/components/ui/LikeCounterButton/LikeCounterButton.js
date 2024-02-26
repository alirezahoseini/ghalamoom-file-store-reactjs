import { TbHeart, TbHeartFilled, TbLoader2 } from "react-icons/tb"
import './LikeCounterButton.css'
import { memo, useEffect, useState } from "react"
import axios from "axios";
import globalAuthToken from '../../../data/globalAuthToken'

// hooks
import useAxiosPost from "../../../hooks/axios/useAxiosPost";

// datas 
import { apiLinks } from '../../../data/links'

const LikeCounterButton = memo(({ type = 'product', ...otherProps }) => {
    const { axiosPostResult, axiosPostError, axiosPostIsPending, setAxiosPostUrl, setAxiosPostData } = useAxiosPost();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(otherProps.totalLikes);
    const [itemId, setItemId] = useState(otherProps.id)

    // console.log(type)
    // console.log(otherProps)
    const likeHandler = () => {
        let newProductObject;
        if (!isLiked) {
            newProductObject = { ...otherProps, likes: otherProps.totalLikes + 1 };
        } else {
            newProductObject = { ...otherProps };
        }

        // console.log(`${apiLinks.likes[`/${type}s`]}/${otherProps.id}`)
        axios.post(`${apiLinks.likes}/Product/${otherProps.id}`, '' , {
            headers: {
                Authorization: `Bearer ${globalAuthToken}`
            }
        })
        .then(res => console.log(res))
    }
    useEffect(() => {
        if (axiosPostResult !== null) {
            console.log(axiosPostResult)
            setIsLiked(prev => !prev);
            if (!isLiked) {
                setLikeCount(prevLikes => prevLikes + 1)
            } else {
                setLikeCount(prevLikes => prevLikes - 1)
            }
        } else if (axiosPostError !== null) {
            console.log(axiosPostError)
        }
    }, [axiosPostError, axiosPostResult,])

    useEffect(() => {
        if (itemId !== otherProps.id) {
            setItemId(otherProps.id)
            setLikeCount(otherProps.totalLikes)
            setIsLiked(false)
        }
    })


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
})

export default LikeCounterButton
