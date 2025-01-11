import { Navbar } from '@nextui-org/react'
import React from 'react'

const JobsNavbar = () => {
  return (
    <Navbar isBordered className='pl-8 sm:pl-0'>
      <div className='flex items-center'>
        <h1 className='text-xl font-semibold'>Job Search</h1>
      </div>
    </Navbar>
  )
}

export default JobsNavbar