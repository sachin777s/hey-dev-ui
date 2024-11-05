import { Avatar, Button } from '@nextui-org/react'
import React from 'react'
import { BsDot, BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const RightSidebar = () => {

  return (
    <div className='w-[25%] min-h-screen border-x-[0.5px] border-[var(--primary-border)] hidden lg:block sticky top-0'>

      {/* What's Happening */}
      <div className='mt-6 py-4 mx-4 px-4 border-[0.5px] border-[var(--primary-border)] rounded-2xl'>
        <h1 className='text-2xl font-semibold'>What's happening</h1>
        <div className='mt-4'>
          {
            Array(4).fill(0).map((_, i) => {
              return (
                <div key={i} className="mt-6 flex flex-col items-start gap-2">
                  <span className='flex items-center justify-between opacity-70'>
                    <span className='flex items-center justify-start'>
                      {"Artificial Inteligence"}
                      <BsDot />
                      Trending
                    </span>
                  </span>
                  <span className='text-xl font-semibold'>#{"chatgpt"}</span>
                  <span className='opacity-70'>
                    {"9876"} posts
                  </span>
                </div>
              )
            })
          }
        </div>
        <Link to={"/explore"} className='mt-4 block text-[var(--main-color)]'>Show more</Link>
      </div>

      {/* Who to Follow */}
      <div className='mt-6 mx-4 p-4 rounded-2xl border-[0.5px] border-[var(--primary-border)]'>
        <h1 className='text-2xl font-semibold'>Who to follow</h1>
        <div className='mt-4'>
          {
            Array(3).fill(0).map((_, i) => {
              return (
                <div key={i} className='mt-2 px-2 py-1 flex items-center justify-between rounded-2xl'>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-medium">Sachin Kumar</span>
                      <span className="opacity-70 text-base">@sachin8976</span>
                    </div>
                  </div>
                  <Button size='sm' radius='full' className='bg-[var(--main-color)] text-black'>Follow</Button>
                </div>
              )
            })
          }
        </div>
        <Link className='mt-4 block text-[var(--main-color)]' to={""}>Show more</Link>
      </div>
    </div>
  )
}

export default RightSidebar