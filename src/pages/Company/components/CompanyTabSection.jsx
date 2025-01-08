import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { PiIdentificationCardFill } from "react-icons/pi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const CompanyTabSection = () => {
  const navigate = useNavigate();
  const links = [
    {
      label: "Jobs",
      path: "/company/jobs",
      icon: <IoBag />,
    },
    {
      label: "Applicants",
      path: "/company/applicants",
      icon: <FaUsers />,
    },
    {
      label: "About",
      path: "/company/about",
      icon: <PiIdentificationCardFill />,
    },
  ];

  useEffect(() => {
    navigate("/company/about");
  }, []);

  return (
    <section>
      <div className="mt-8 p-1 grid grid-cols-3 gap-2 bg-[#D4D4D8] dark:bg-[#3F3F46]">
        {links.map((_, i) => (
          <NavLink
            className={({ isActive }) =>
              `${
                isActive && "bg-white dark:bg-black"
              } py-2 text-center rounded-xl flex items-center justify-center gap-1 ${
                !isActive && "hover:bg-[#edebeb] dark:hover:bg-[#151515]"
              }`
            }
            to={_.path}
          >
            {_.icon} {_.label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </section>
  );
};

export default CompanyTabSection;
