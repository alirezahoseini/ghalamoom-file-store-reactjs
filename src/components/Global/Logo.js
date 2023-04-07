import React from 'react'
import { Link } from 'react-router-dom'
import { dynamicLinks } from '../../dynamicLinks'

export default function Logo() {
  return (
    <Link to={dynamicLinks.home}>
        <img src="./logo.svg" alt="Qhalamum Logo" width={102}/>
    </Link>
  )
}
