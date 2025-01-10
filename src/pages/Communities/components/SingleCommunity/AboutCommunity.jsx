import { User } from "@nextui-org/react";
import React from "react";
import { FaHandPointRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function AboutCommunity() {
  return (
    <div className="px-2 sm:px-4 pb-12">
      <div>
        <h1 className="text-xl font-semibold">Description</h1>
        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          fuga doloremque, distinctio eos architecto repudiandae odit sunt
          cumque culpa porro, quo mollitia nobis. Suscipit deleniti, repudiandae
          cupiditate voluptatem obcaecati quibusdam eum incidunt rerum excepturi
          voluptatum.
        </p>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Rules</h1>
        <ul className="mt-2" itemType="circle">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <li key={i} className="flex items-start gap-1">
                <FaHandPointRight size={22} />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto,
                illum.
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Created Date</h1>
        <span className="mt-2b block">12 May 2012</span>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Created By</h1>
        <User
          className="mt-2 border border-color p-2 rounded-full"
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          }}
          description={
            <Link isExternal href="https://x.com/jrgarciadev" size="sm">
              @jrgarciadev
            </Link>
          }
          name="Junior Garcia"
        />
      </div>
    </div>
  );
}

export default AboutCommunity;
