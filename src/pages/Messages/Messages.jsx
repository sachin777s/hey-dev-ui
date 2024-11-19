import React from 'react'
import MessagesNavbar from './components/MessagesNavbar'
import { Outlet } from 'react-router-dom'

const Messages = () => {
  return (
    <section>
      <MessagesNavbar />
      <Outlet />
    </section>
  )
}

export default Messages