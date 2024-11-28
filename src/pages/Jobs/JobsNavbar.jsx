import { Navbar } from '@nextui-org/react'
import React from 'react'
import { BsDot } from 'react-icons/bs'

const JobsNavbar = () => {
  return (
    <Navbar isBordered>
      <div className='flex items-center'>
        <BsDot /> <h1 className='text-xl font-semibold'>Job Search</h1>
      </div>
    </Navbar>
  )
}

export default JobsNavbar