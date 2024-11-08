import React from 'react'
import SinglePost from "../../../components/SinglePost"

const Posts = () => {
  return (
    <section className='mt-4 px-2 sm:px-4'>
      {
        Array(5).fill(0).map((_, i) => {
          return <SinglePost />
        })
      }
    </section>
  )
}

export default Posts