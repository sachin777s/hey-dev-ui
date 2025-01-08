import React from "react";
import CompanyNavbar from "./CompanyNavbar";
import CompanyInfo from "./components/CompanyInfo";
import CompanyTabSection from "./components/CompanyTabSection";

const Company = () => {
  return (
    <section>
      <CompanyNavbar />
      <div className="">
        <CompanyInfo />
        <CompanyTabSection />
      </div>
    </section>
  );
};

export default Company;
