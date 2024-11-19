import { Avatar } from '@nextui-org/react';
import React, { useState } from 'react'
import { BsDot, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    }

    return (
        <div className=''>
            <div className='mx-auto mt-2 w-2/3 min-w-[16rem] flex items-center justify-center relative'>
                <input
                    autoComplete={false}
                    autoCorrect={false}
                    placeholder='Search Here...'
                    onChange={handleInputChange}
                    value={inputText}
                    className='py-2 pr-12 px-4 w-full border-none border-b-2 border-gray-700 outline-none rounded-3xl'
                    type="text"
                />
                <BsSearch size={18} className='absolute right-4' />
            </div>
            <div className='mt-4 border-t-[0.5px] border-color'>
                {
                    Array(6).fill(0).map((_, i) => {
                        return (
                            <Link to={"id"} key={i} className="px-2 sm:px-4 py-2 flex items-center gap-2 border-b-[0.5px] border-color bg-hover">
                                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div className='flex flex-col'>
                                    <span className='flex items-center'>
                                        <strong>{"Sachin Kumar"}</strong>
                                        <BsDot />
                                        <span>@sachin777sk</span>
                                    </span>
                                    <span className=''>
                                        {"hey".slice(0, 12)}
                                    </span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserList