import { Avatar, Navbar } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom';

const ExploreNavbar = () => {

  const [isDialogVisble, setIsDailogVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const dailogRef = useRef(null);

  const handleInputChange = (event) => {
    setSearchInput(event?.target.value);
    console.log(searchInput);
  }

  // Hiding search suggestions container onClick Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dailogRef.current && !dailogRef.current.contains(event.target)) {
        setIsDailogVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //For handling search related keywords and users
  useEffect(() => {
    const handleSearchKeyword = async () => {

    }

    const handleSearchUser = async () => {

    }
    handleSearchKeyword();
    handleSearchUser();
  }, [searchInput])

  //For handling search queries
  const handleSearchQuery = () => {

  }

  return (
    <header className='relative'>
      <Navbar
        shouldHideOnScroll
        maxWidth='full'
        isBlurred
        isBordered
        className='flex items-center justify-center'
      >
        <div className='mx-auto w-2/3 min-w-[16rem] flex items-center justify-center relative'>
          <input
            autoComplete={false}
            autoCorrect={false}
            onFocus={() => setIsDailogVisible(true)}
            placeholder='Search Here...'
            onChange={handleInputChange}
            className='py-2 pr-12 px-4 w-full border-none border-b-2 border-gray-700 outline-none rounded-3xl'
            type="text"
          />
          <BsSearch size={18} className='absolute right-4' />
        </div>
      </Navbar>
      {
        isDialogVisble &&
        <div
          ref={dailogRef}
          className='absolute top-18 w-full bg-white dark:bg-black z-10'
        >
          <div className="w-full flex flex-col">
            {
              Array(3).fill(3).map((_, i) => {
                return (
                  <Link
                    key={i}
                    onClick={handleSearchQuery}
                    className='w-full pl-2 py-2 hover:bg-[#EEEEEF] dark:hover:bg-[#121212] flex items-center gap-2'
                  >
                    <BsSearch size={16} />
                    {"next js released"}
                  </Link>
                )
              })
            }
          </div>
          <div className="w-full flex flex-col items-start">
            {
              Array(3).fill(3).map((_, i) => {
                return (
                  <Link
                    key={i}
                    href='#'
                    className='pl-2 py-2 w-full flex items-center gap-2 hover:bg-[#EEEEEF] dark:hover:bg-[#121212]'
                  >
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <div className='flex flex-col'>
                      <span>{"Sachin Kumar"}</span>
                      <span className='text-sm'>{"@sachin777sk"}</span>
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
      }
    </header>
  )
}

export default ExploreNavbar