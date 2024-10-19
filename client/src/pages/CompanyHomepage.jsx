import React from 'react'
import { Outlet } from 'react-router-dom'

const CompanyHomepage = () => {
  return (
    <div>
      Navbar
      <Outlet />
    </div>
  )
}

export default CompanyHomepage
