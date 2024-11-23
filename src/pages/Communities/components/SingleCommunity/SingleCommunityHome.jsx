import { Avatar, AvatarGroup, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React, { useMemo, useState } from 'react'
import { VscThreeBars } from 'react-icons/vsc';
import { Link } from 'react-router-dom'
import SinglePost from '../../../../components/SinglePost';

const SingleCommunityHome = () => {

  const [selectedKeys, setSelectedKeys] = useState(new Set(["Top"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <>
      <div className="">
        <img
          className='w-full'
          src="https://pbs.twimg.com/community_banner_img/1856388724990586880/u6yBIu77?format=jpg&name=small"
          alt=""
        />
        <div className='pl-2 sm:pl-4 flex flex-col'>
          <span className="mt-2 text-3xl font-semibold">NExt DEvs</span>
          <span className="mt-2 text-xl">👽Welome to the {"NExt DEvs"} Community</span>
          <div className='mt-2 flex items-center justify-between gap-4'>
            <Link to={"/communities/4545/members"} className='px-2 flex items-center gap-4 hover:bg-gray-200 dark:hover:bg-gray-900'>
              <AvatarGroup>
                {
                  Array(3).fill(0).map((_, i) => (
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  ))
                }
              </AvatarGroup>
              <span>
                <span className='font-semibold'>860</span> Members
              </span>
            </Link>
            <div className='mr-2 sm:mr-4'>
              <Button radius='full' variant='bordered'>Join</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 sm:px-4 pt-4 mt-4 border-t-[0.5px] border-color">
        <div className="">
          <Dropdown placement='bottom-start'>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="capitalize"
              >
                <VscThreeBars />{selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <DropdownItem key="top">Top</DropdownItem>
              <DropdownItem key="latest">Latest</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="">
          {
            Array(9).fill(0).map((_, i) => (
              <>
                <SinglePost />
              </>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default SingleCommunityHome