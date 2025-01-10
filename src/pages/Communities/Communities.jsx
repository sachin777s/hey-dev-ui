import React from 'react'
import CommunitiesNavbar from './CommunitiesNavbar'
import { Outlet } from 'react-router-dom'

const Communities = () => {
  return (
    <section>
      <CommunitiesNavbar />
      <div>
        <Outlet/>
      </div>
    </section>
  )
}

export default Communities
