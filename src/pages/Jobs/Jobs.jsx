import React from 'react'
import JobsNavbar from './JobsNavbar'
import { Outlet } from 'react-router-dom'

const Jobs = () => {
  return (
    <section>
      <JobsNavbar />
      <div>
        <Outlet/>
      </div>

    </section>
  )
}

export default Jobs