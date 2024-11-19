import React from 'react'
import CommunitiesNavbar from './components/CommunitiesNavbar'
import { Outlet } from 'react-router-dom'

const Communities = () => {
  return (
    <section>
      <CommunitiesNavbar />
      <div className='px-2 sm:px-4'>
        <Outlet/>
      </div>
    </section>
  )
}

export default Communities
