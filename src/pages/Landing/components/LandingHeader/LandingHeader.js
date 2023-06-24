import React from 'react'

import firstBannerImage from '../../../../assets/images/landing/ghalamoom-baner-1-mobile.svg'

export default function LandingHeader() {
  return (
    <div id='landing-header' className='flex flex-col lg:flex-row w-full items-center p-0 m-0'>
        {/* Right section  */}
        <section className='w-full my-3 lg:w-6/12'>
            <img src={firstBannerImage} className='w-full mx-auto' alt="first banner" />
        </section>
        {/* End of Right section  */}
        {/* Left section  */}
        <section className='w-full my-3 lg:w-6/12'>

        </section>
        {/* End of Left section  */}
    </div>
  )
}
