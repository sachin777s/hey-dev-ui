import { Button } from "@nextui-org/react";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdPhonelink } from "react-icons/md";
import { useSelector } from "react-redux";

function About() {
  const user = useSelector((state) => state.user.data);

  return (
    <section className="px-2 sm:px-4 pb-12">
      {/* About Section */}
      <div className="mt-6">
        <h1 className="text-xl font-semibold">About</h1>
        <p className="mt-3">{user.about}</p>
      </div>

      {/* Skills Section */}
      <div className="mt-12">
        <h1 className=" text-xl font-semibold">Skills</h1>
        <div className="mt-3 flex items-center gap-2">
          {user.skills.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center gap-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="mt-12">
        <h1 className="text-xl font-semibold">Projects</h1>
        <div className="flex flex-col gap-2 items-start">
          {user.projects.map((project, i) => (
            <div className="border-b py-4">
              <h3 className="font-semibold">{project.title}</h3>
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={project.gitUrl}
                  target="_black"
                  rel="noopener noreferrer"
                >
                  <Button>
                    <FaGithub size={22} />
                    Source Code
                  </Button>
                </a>
                <a
                  href={project.gitUrl}
                  target="_black"
                  rel="noopener noreferrer"
                >
                  <Button>
                    <MdPhonelink size={22} />
                    View Live
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="mt-12">
        <h1 className="text-xl font-semibold">Education</h1>
        <div className="mt-4 flex flex-col items-start gap-2">
          {user.education.map((singleEducation, i) => (
            <div
              key={i}
              className="px-4 py-2 bg-gray-200 dark:bg-[#3F3F46] rounded-2xl flex flex-col"
            >
              <h3 className="text-lg font-semibold">
                {singleEducation.collegeName}
              </h3>
              <div className="border-l-2 border-gray-600 dark:border-gray-400 flex flex-col pl-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                <span>{singleEducation.course}</span>
                <span>
                  Completed in{" "}
                  <span className="font-semibold">
                    {singleEducation.completedIn}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages Section */}
      <div className="mt-12">
        <h1 className="text-xl font-semibold">Languages</h1>
        <div className="mt-4 flex gap-2 flex-wrap items-center">
          {user.spokenLanguages.map((language, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center gap-2"
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-16">
        <h1 className="text-xl font-semibold">Other Links</h1>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          {/* website */}
          {user.website && (
            <a href={user.website} className="flex items-center gap-1">
              <CgWebsite size={22} /> Website
            </a>
          )}
          {/* github */}
          {user.socialLinks.github && (
            <a
              href={user.socialLinks.github}
              className="flex items-center gap-1"
            >
              <FaGithub size={22} /> Github
            </a>
          )}
          {/* linkedin */}
          {user.socialLinks.linkedin && (
            <a
              href={user.socialLinks.linkedin}
              className="flex items-center gap-1"
            >
              <FaLinkedin size={22} /> Linkedin
            </a>
          )}
          {/* twitter */}
          {user.socialLinks.twitter && (
            <a
              href={user.socialLinks.twitter}
              className="flex items-center gap-1"
            >
              <FaXTwitter size={22} /> X
            </a>
          )}
          {/* instagram */}
          {user.socialLinks.instagram && (
            <a
              href={user.socialLinks.instagram}
              className="flex items-center gap-1"
            >
              <AiFillInstagram size={22} /> Instagram
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
