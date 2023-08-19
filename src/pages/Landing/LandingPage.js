
import React from 'react'

// components
import LandingHeader from './components/LandingHeader/LandingHeader'
import VpnSection from './components/LandingVpnSection/VpnSection'

// Assets
import technos from '../../assets/images/landing/technos.svg'

export default function LandingPage() {
  return (
    <div className='container mx-auto'>
      <LandingHeader />
      <img src={technos} alt="technos" className='mt-10'/>
      <VpnSection />
    </div>
  )
}
