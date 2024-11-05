import React from 'react'
import SettingsNavbar from './SettingsNavbar'
import THemeChange from "../../components/ThemeChanger";

const Settings = () => {
  return (
    <section>
      <SettingsNavbar />
      <div className='px-2 sm:px-4'>
        Settings
      </div>
    </section>
  )
}

export default Settings