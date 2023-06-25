
import React from 'react'

// components
import LandingHeader from './components/LandingHeader/LandingHeader'

//
import technos from '../../assets/images/landing/technos.svg'

export default function LandingPage() {
  return (
    <div className='container'>
      <LandingHeader />
      <img src={technos} alt="technos" className='mt-10'/>
    </div>
  )
}
