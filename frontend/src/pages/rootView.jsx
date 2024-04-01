/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom'
import React from 'react'

export default function RootView() {
  return (
    <div>
      <button><NavLink to={'/login'}>Login</NavLink></button>
      <button><NavLink to={'/signup'}>SignUp</NavLink></button>
    </div>
  )
}