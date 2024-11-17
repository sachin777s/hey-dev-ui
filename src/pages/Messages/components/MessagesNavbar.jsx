import { Navbar } from '@nextui-org/react'
import React from 'react'
import { BsDot } from 'react-icons/bs'

const MessagesNavbar = () => {
  return (
    <Navbar isBordered isBlurred>
      <div className='flex items-center'>
        <BsDot /> <h1 className='text-xl font-semibold'>Messages</h1>
      </div>
    </Navbar>
  )
}

export default MessagesNavbar