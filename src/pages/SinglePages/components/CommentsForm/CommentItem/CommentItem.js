import React, { useEffect, useState } from 'react'
import { TbStar, TbStarFilled } from 'react-icons/tb'

// assets
import noneUserImage from '../../../../../assets/images/global/none-user.png'

export default function CommentItem(props) {
    const [createdDate, setCreatedDate] = useState();
    const detailesComment = {
        name: props.author.name,
        avatarId: props.author.avatar,
        content: props.content,
        createdAt: props.createdAt,
        rating: props.rating,
        userId: props.authorId
    }
    const [rateArray, setRateArray] = useState([
        { id: 'one', value: 1, selected: false },
        { id: 'tow', value: 2, selected: false },
        { id: 'three', value: 3, selected: false },
        { id: 'four', value: 4, selected: false },
        { id: 'fiwe', value: 5, selected: false }
    ]);
  


    useEffect(() => {
        const now = new Date(detailesComment.createdAt);
        setCreatedDate(now.toLocaleDateString('fa-IR'));

        const newRate = [...rateArray];
        newRate.forEach(item => {
            if (item.value <= detailesComment.rating) {
                item.selected = true
            } else {
                item.selected = false
            }
        });
        setRateArray(newRate)
    }, [])
    return (
        <div className='comment-item'>
            <div className="wrapper flex items-start gap-3 w-full">
                <div className="image rounded-full overflow-hidden border-2 bg-fuchsia-100 border-slate-200" style={{ width: 42 }}>
                    
                    <img src={detailesComment.avatarId ? process.env.PUBLIC_URL + `/images/avatars/Avatar-${detailesComment.avatarId}.webp` : noneUserImage}  alt="userimage" className='w-full' />
                </div>
                <div className="body border border-slate-300 p-2 rounded-md" style={{ width: 'calc(100% - 55px)' }}>
                    <div className="head flex items-center justify-between text-xs">
                        <div className='flex items-center gap-2'>
                            <span className='font-bold text-slate-600' style={{ fontSize: '11px' }}>{detailesComment.name}</span>
                            <span className='text-slate-400'>{createdDate}</span>
                        </div>
                        <div className="wrapper flex  items-center justify-start my-1 text-yellow-500" >
                            {rateArray.map((item => (
                                <div key={item.id}>
                                    {item.selected ? (<TbStarFilled />) : (<TbStar />)}
                                </div>
                            )))}
                        </div>
                    </div>
                    <p className='my-3 text-xs text-slate-600 leading-6 break-words'>
                        {detailesComment.content}
                    </p>
                </div>
            </div>
        </div>
    )
}
