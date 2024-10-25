import React, { useEffect, useRef, useState } from 'react'
import HomeNavbar from './HomeNavbar'
import Posts from './components/Posts'
import CreatePost from './components/CreatePost';

const Home = () => {

  return (
    <section>
      <HomeNavbar />
      <CreatePost />
      <Posts />
    </section>
  )
}

export default Home