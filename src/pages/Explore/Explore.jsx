import React from 'react'
import ExploreNavbar from './ExploreNavbar'
import SinglePost from '../../components/SinglePost'

const Explore = () => {
  return (
    <section>
      <ExploreNavbar />
      <div className='px-2 sm:px-4'>
        {
          false ?
            <div className=''>
             
            </div>
            :
            Array(8).fill(0).map((_, i) => {
              return (
                <SinglePost key={i} />
              )
            })
        }
      </div>
    </section>
  )
}

export default Explore