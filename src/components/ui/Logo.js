import React, { memo } from 'react'
import { Link } from 'react-router-dom'
// assets
import logoImage from '../../assets/images/logos/qhalamoom-logo.svg'
// datas
import { dynamicLinks } from '../../data/links'

const Logo = memo(({width = 102}) => {
  return (
    <Link to={dynamicLinks.home}>
        <img src={logoImage} alt="Qhalamum Logo" width={width}/>
    </Link>
  )
})

export default Logo