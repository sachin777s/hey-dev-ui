import React from 'react'
import ProfileNavbar from './ProfileNavbar'
import TabSection from './components/TabSection'
import ProfileInfo from './components/ProfileInfo'

const Profile = () => {

  return (
    <>
      <ProfileNavbar />
      <div>
        <ProfileInfo />
        <TabSection />
      </div>
    </>
  )
}

export default Profile