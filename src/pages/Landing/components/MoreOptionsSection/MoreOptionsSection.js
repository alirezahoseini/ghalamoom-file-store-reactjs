import React from 'react'

// Assets
import likeAndCommentsIcon from '../../../../assets/images/landing/like-and-comments.png'

export default function MoreOptionsSection() {
  return (
    <div id='more-options-section' className='flex'>
        <div className='bg-white relative'>
            <img className='absolute top-0 ' src={likeAndCommentsIcon} alt="like and comments" />
            <h2>تعامل با کاربران</h2>
        </div>
    </div>
  )
}
