import React from "react";
import EditProfileNavbar from "./EditProfileNavbar";
import UpdatePicture from "./components/UpdatePicture";
import BasicInformation from "./components/BasicInformation";
import Education from "./components/Education";
import SocialLinks from "./components/SocialLinks";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Website from "./components/Website";
import Languages from "./components/Languages";
import Resume from "./components/Resume";

function EditProfile() {
  return (
    <>
      <EditProfileNavbar />
      <main className="px-2 sm:px-4 pb-16">
        {/* Updating the profile picture */}
        <UpdatePicture />
        {/* Updating Basic Information */}
        <BasicInformation />
        {/* Adding the skills */}
        <Skills />
        {/* Adding Projects */}
        <Projects />
        {/* Updating the education details */}
        <Education />
        {/* Updating Website Link */}
        <Website />
        {/* Updating the social media links */}
        <SocialLinks />
        {/* Adding Languages */}
        <Languages />
        {/* Uploading resume */}
        <Resume />
      </main>
    </>
  );
}

export default EditProfile;
