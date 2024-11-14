import React from 'react'
import NotificationNavbar from './NotificationNavbar'
import { Avatar } from '@nextui-org/react'

const Notifications = () => {
  return (
    <>
      <NotificationNavbar />
      <div className=''>
        {
          Array(9).fill(0).map((_, i) => {
            return (
              <div className="px-2 sm:px-4 py-2 border-b-[0.5px] border-color transition-all duration-300 bg-hover">
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <span className='mt-2 block'>
                  <strong>Rohit</strong> Posted Something
                </span>
                <p className='mt-2 opacity-70'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus, fugiat.
                </p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Notifications