import React from 'react'
import { Link } from 'react-router-dom'
// assets
import logoImage from '../../assets/images/logos/qhalamoom-logo.svg'
// datas
import { dynamicLinks } from '../../data/links'

export default function Logo({width = 102}) {
  return (
    <Link to={dynamicLinks.home}>
        <img src={logoImage} alt="Qhalamum Logo" width={width}/>
    </Link>
  )
}
