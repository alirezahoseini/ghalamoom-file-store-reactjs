import React from 'react'
import { Link } from 'react-router-dom'
// datas
import { dynamicLinks } from '../../data/links'

export default function Logo({width = 102}) {
  return (
    <Link to={dynamicLinks.home}>
        <img src="./logo.svg" alt="Qhalamum Logo" width={width}/>
    </Link>
  )
}
