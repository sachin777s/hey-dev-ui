import { Navbar, Tabs } from '@nextui-org/react'
import React from 'react'
import { BsDot } from 'react-icons/bs'

const HomeNavbar = () => {
    return (
        <Navbar isBordered className="border-b[0.5px] border-[var(--primary-border)]">
            <div className='flex items-center'>
                <BsDot /> <h1 className='text-xl font-semibold'>Home</h1>
            </div>
        </Navbar>
    )
}

export default HomeNavbar