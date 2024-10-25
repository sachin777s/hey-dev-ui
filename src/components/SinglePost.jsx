import { Avatar } from '@nextui-org/react'
import React from 'react'
import { AiOutlineRetweet } from 'react-icons/ai'
import { BsBookmark, BsChat, BsDot, BsHeart } from 'react-icons/bs'
import { IoIosStats } from 'react-icons/io'
import { IoShareOutline } from 'react-icons/io5'

const SinglePost = () => {
    return (
        <div
            className='mt-12 w-full flex items-start gap-2'
        >
            <div>
                <Avatar
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
            </div>
            <div className='w-full'>
                <div className='flex items-center'>
                    <span className='font-semibold'>Sachin Kumar</span>
                    <BsDot />
                    <span className='opacity-70'>@sachin777sk</span>
                    <BsDot />
                    <span className='opacity-70'>Oct 12</span>
                </div>
                <div>
                    <p>Lorem ipsum lorem24 dolor sit amet consectetur adipisicing elit. Dolore inventore qui cum? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto ex dolor dignissimos.</p>
                </div>
                <div className='mt-4 w-full h-96 bg-slate-200 rounded-3xl'>

                </div>
                <div className='mt-4 flex items-center justify-evenly'>
                    <div className='flex items-center gap-1 cursor-pointer hover:text-[var(--main-color)]'>
                        <BsChat size={16} />
                        <span className='text-sm'>1K</span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer hover:text-[var(--main-color)]'>
                        <AiOutlineRetweet size={16} />
                        <span className='text-sm'>121</span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer hover:text-[var(--main-color)]'>
                        <BsHeart size={16} />
                        <span className='text-sm'>12K</span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer hover:text-[var(--main-color)]'>
                        <IoIosStats size={16} />
                        <span className='text-sm'>99K</span>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <BsBookmark className='hover:text-[var(--main-color)] hidden sm:block' size={16} />
                        <IoShareOutline className='hover:text-[var(--main-color)]' size={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost