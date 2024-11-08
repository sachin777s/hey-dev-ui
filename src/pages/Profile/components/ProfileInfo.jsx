import { Button, Skeleton } from '@nextui-org/react'
import React from 'react'
import { RiLink } from 'react-icons/ri'

const ProfileInfo = () => {
    return (
        <div>
            {/* Banner */}
            <div className='relative'>
                <Skeleton isLoaded={true}>
                    <img
                        className='w-full'
                        src="https://pbs.twimg.com/profile_banners/1411148530429825025/1701254233/1080x360"
                        alt=""
                    />
                </Skeleton>
                <img
                    className='h-2/3 rounded-full absolute left-2 sm:left-4 bottom-0 translate-y-1/2 border-5 border-black'
                    src="https://pbs.twimg.com/profile_images/1847175865597112320/C0DbR5kX_400x400.jpg"
                    alt={<>SOmething</>}
                />
                <Button className="absolute right-2 -bottom-12" variant='bordered' radius='full'>
                    Edit Profile
                </Button>
            </div>
            <div className='ml-2 sm:ml-4 mt-24 flex flex-col'>
                <span className='text-2xl font-bold'>
                    {"Sachin Kumar"}
                </span>
                <span className='opacity-70'>
                    @{"sachin777s"}
                </span>
            </div>
            <div className='ml-2 mt-2 sm:ml-4 text-xl'>
                <span>Full Stack Engineer | Creator</span>
            </div>
            <div className='ml-2 mt-2 sm:ml-4'>
                <a href="#" className='flex items-center gap-1'>
                    <RiLink />
                    <span className='text-blue-500'>
                        {"https://github.com/sachin777s"}
                    </span>
                </a>
            </div>
            <div className='ml-2 mt-2 sm:ml-4 flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                    <span className='text-xl'>1.8K</span>
                    <span className='opacity-70'>Followers</span>
                </div>
                <div className='flex items-center gap-1'>
                    <span className='text-xl'>89</span>
                    <span className='opacity-70'>Followings</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo