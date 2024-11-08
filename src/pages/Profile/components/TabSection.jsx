import { Tab, Tabs } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const TabSection = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/profile/posts")
  },[])

  return (
    <section>
      <Tabs
        className='mt-4 w-full border-b border-b-[var(--primary-border)]'
        size='lg'
        variant="underlined"
        aria-label="Tabs variants"
        color='red'
      >
        <Tab
          key="posts"
          title={<Link to={"/profile/posts"}>Posts</Link>}
        />
        <Tab
          key="replies"
          title={<Link to={"/profile/replies"}>Replies</Link>}
        />
        <Tab
          key="likes"
          title={<Link to={"/profile/likes"}>Likes</Link>}
        />
      </Tabs>
      <Outlet />
    </section>
  )
}

export default TabSection