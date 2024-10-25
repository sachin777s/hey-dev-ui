import React from 'react'
import SinglePost from '../../../components/SinglePost'

const Posts = () => {
    return (
        <div className='px-2 sm:px-4'>
            {
                Array(8).fill(0).map((_, i) => {
                    return (
                        <SinglePost key={i} />
                    )
                })
            }
        </div>
    )
}

export default Posts