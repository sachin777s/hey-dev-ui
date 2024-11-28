import React from 'react'
import SearchJobs from './SearchJobs'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
import { IoLocationOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { MdAccessTime, MdOutlinePeopleAlt } from 'react-icons/md'

const JobsHome = () => {

  const navigate = useNavigate();

  return (
    <>
      <SearchJobs />
      <div className='px-2 sm:px-4'>
        {
          Array(10).fill(0).map((_, i) => (
            <div
              key={i}
              onClick={() => navigate("/jobs/:id")}
              to={`/jobs/:${435}`}
              className='mt-4 p-2 block border-[0.5px] border-color rounded-2xl hover:shadow-[0_0_8px_-2px_gray] cursor-pointer'>
              <h3 className='text-xl font-semibold'>
                Blockchain Developer
              </h3>
              <p className='opacity-80 text-base'>
                Webpack India Private Limited
              </p>
              <div className='mt-2 flex items-center gap-2 opacity-60'>
                <span className='flex items-center gap-1'>
                  <IoLocationOutline size={20} />
                  <span className='text-sm'>Banglore</span>
                </span>
                <span className='flex items-center gap-1'>
                  <RiMoneyRupeeCircleLine size={20} />
                  <span className='text-sm'>{"13"} LPA - {"16"} LPA</span>
                </span>
                <span>

                </span>
              </div>
              <div className='mt-2 opacity-60 flex items-center justify-between'>
                <span className='flex items-center gap-1'>
                  <MdAccessTime size={20} />
                  <span className='text-sm'>{"2 days"} ago</span>
                </span>
                <span className='flex items-center gap-1'>
                  <MdOutlinePeopleAlt />
                  {122} Applied
                </span>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default JobsHome