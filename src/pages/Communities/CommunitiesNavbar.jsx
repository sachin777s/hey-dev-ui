import { Avatar, AvatarGroup, Navbar } from '@nextui-org/react'
import React from 'react'
import { BsArrow90DegLeft, BsArrowBarLeft, BsDot, BsSearch } from 'react-icons/bs'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

const CommunitiesNavbar = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Navbar isBordered>
      <div className='flex items-center'>
        <BsDot /> <h1 className='text-xl font-semibold'>Communities</h1>
      </div>
      <div className='flex items-center justify- gap-2'>
        {/* Search Modal */}
        <div>
          <BsSearch onClick={onOpen} />
          <Modal
            className='absolute bg-white dark:bg-black'
            placement='top'
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isKeyboardDismissDisabled
            scrollBehavior='inside'
            size='xl'
          >
            <ModalContent className='p-0'>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <span className='flex items-center gap-1'>
                      <IoIosArrowRoundBack onClick={() => onClose()} size={26} /> Discover Communities
                    </span>
                    <div className='mt-4 w-[90%] relative flex items-center'>
                      <input
                        className='w-full pl-4 pr-10 py-2 rounded-full outline-none border font-normal'
                        type="text"
                        placeholder='Search Here...'
                      />
                      <BsSearch className='absolute right-4' />
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    <div className=''>
                      {/* Communities recomendations based on search */}
                      <div className='mt-8'>
                        {
                          Array(5).fill(0).map((_, i) => (
                            <Link
                              to={"/communities/78778"}
                              onClick={() => onClose()}
                              className='py-2 border-t-[0.5px] dark:border-[#545454] flex items-center gap-2'
                            >
                              <div className='h-32 w-32 rounded-2xl bg-gray-300 overflow-hidden'>
                                <img
                                  className=' h-full object-cover'
                                  src="https://pbs.twimg.com/community_banner_img/1579498877941649408/ib8y5Ccy?format=jpg&name=360x360"
                                  alt=""
                                />
                              </div>
                              <div className='flex flex-col'>
                                <span className="font-semibold">React/ Next JS Devs</span>
                                <span className="">
                                  <span className='font-semibold'>{"2.6K"}</span>
                                  <span className='opacity-70'> Members</span>
                                </span>
                                <div>
                                  <AvatarGroup max={3}>
                                    {
                                      Array(3).fill(0).map(() => (
                                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                      ))
                                    }
                                  </AvatarGroup>
                                </div>
                              </div>
                            </Link>
                          ))
                        }
                      </div>
                    </div>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <Link to={"/communities/start-community"}>
          <AiOutlineUsergroupAdd size={22} />
        </Link>
      </div>
    </Navbar>
  )
}

export default CommunitiesNavbar