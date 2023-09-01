
import React from 'react'

// components
import LandingHeader from './components/LandingHeader/LandingHeader'
import VpnSection from './components/LandingVpnSection/VpnSection'
import PanelTowColorSection from './components/PanelTowColorSection/PanelTowColorSection'
import CategoriesSection from './components/CategoriesSection/CategoriesSection'
import MoreOptionsSection from './components/MoreOptionsSection/MoreOptionsSection'

// Assets
import technos from '../../assets/images/landing/technos.svg'

export default function LandingPage() {
  return (
    <div className='container mx-auto px-2'>
      <LandingHeader />
      <img src={technos} alt="technos" className='mt-10'/>
      <VpnSection />
      <PanelTowColorSection />
      <CategoriesSection />
      <MoreOptionsSection />
    </div>
  )
}
