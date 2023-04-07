import React from 'react'
import { Link } from 'react-router-dom'
import { dynamicLinks } from '../../dynamicLinks'

export default function Logo({width = 102}) {
  return (
    <Link to={dynamicLinks.home}>
        <img src="./logo.svg" alt="Qhalamum Logo" width={width}/>
    </Link>
  )
}
