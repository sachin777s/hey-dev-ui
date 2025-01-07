import { Button } from "@nextui-org/react";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdPhonelink } from "react-icons/md";

function About() {
  return (
    <section className="px-2 sm:px-4 pb-12">
      {/* About Section */}
      <div className="mt-6">
        <h1 className="text-xl font-semibold">About</h1>
        <p className="mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          voluptates aliquam neque autem maxime molestiae minima quidem dolores
          necessitatibus blanditiis, dolore ad hic sequi dignissimos est animi
          reiciendis, recusandae inventore?
        </p>
      </div>

      {/* Skills Section */}
      <div className="mt-12">
        <h1 className=" text-xl font-semibold">Skills</h1>
        <div className="mt-3 flex items-center gap-2">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center gap-2"
              >
                React js
              </span>
            ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="mt-12">
        <h1 className="text-xl font-semibold">Projects</h1>
        <div className="flex flex-col gap-2 items-start">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div className={`flex items-center gap-4 py-4`}>
                <Button>
                  <FaGithub size={22} />
                  Source Code
                </Button>
                <Button>
                  <MdPhonelink size={22} />
                  View Live
                </Button>
              </div>
            ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="mt-12">
        <h1 className="text-xl font-semibold">Education</h1>
        <div className="mt-4 flex flex-col items-start gap-2">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="px-4 py-2 bg-gray-200 dark:bg-[#3F3F46] rounded-2xl flex flex-col"
              >
                <h3 className="text-lg font-semibold">
                  IFTM University, Modaradabad
                </h3>
                <div className="border-l-2 border-gray-600 dark:border-gray-400 flex flex-col pl-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <span>B.Tech CSE</span>
                  <span>
                    Completed in <span className="font-semibold">2025</span>
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
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center gap-2"
              >
                {"Hindi"}
              </span>
            ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-16">
        <h1 className="text-xl font-semibold">Other Links</h1>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          {/* website */}
          {true && (
            <a href="#" className="flex items-center gap-1">
              <CgWebsite size={22} /> Website
            </a>
          )}
          {/* github */}
          {true && (
            <a href="#" className="flex items-center gap-1">
              <FaGithub size={22} /> Github
            </a>
          )}
          {/* linkedin */}
          {true && (
            <a href="#" className="flex items-center gap-1">
              <FaLinkedin size={22} /> Linkedin
            </a>
          )}
          {/* twitter */}
          {true && (
            <a href="#" className="flex items-center gap-1">
              <FaXTwitter size={22} /> X
            </a>
          )}
          {/* instagram */}
          {true && (
            <a href="#" className="flex items-center gap-1">
              <AiFillInstagram size={22} /> Instagram
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
