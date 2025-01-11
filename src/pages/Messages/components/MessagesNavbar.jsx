import { Navbar } from '@nextui-org/react'
import React from 'react'

const MessagesNavbar = () => {
  return (
    <Navbar isBordered isBlurred className='pl-8 sm:pl-0'>
      <div className='flex items-center'>
        <h1 className='text-xl font-semibold'>Messages</h1>
      </div>
    </Navbar>
  )
}

export default MessagesNavbar