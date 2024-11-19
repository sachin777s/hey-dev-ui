import React from 'react'
import SinglePost from '../../../components/SinglePost'
import { FaUserFriends } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CommunityHome = () => {
    return (
        <>
            {
                Array(7).fill(0).map((_, i) => (
                    <div className='mt-2'>
                        <Link to={"/communities/543534"} className='flex items-center gap-4 hover:underline opacity-70 font-bold'>
                            <FaUserFriends />
                            {"React js fans"}
                        </Link>
                        <SinglePost key={i} />
                    </div>
                ))
            }
        </>
    )
}

export default CommunityHome