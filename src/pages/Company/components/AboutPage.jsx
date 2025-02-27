import React from "react";
import { useSelector } from "react-redux";

function AboutPage() {
  const company = useSelector((state) => state.company.data);

  return (
    <section className="px-2 sm:px-4 py-8">
      {/* Description */}
      <div className="mt-4">
        <h1 className="text-xl font-semibold">Description</h1>
        <p className="mt-4">{company.description}</p>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Industries</h1>
        <p className="mt-4">{company.industry}</p>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Website</h1>
        <a className="mt-4 block underline" href="#">
          {company.website}
        </a>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Company Size</h1>
        <span className="block mt-4">{company.size}</span>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Founded IN</h1>
        <span className="block mt-4">{company.foundedIn}</span>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Email</h1>
        <a
          className="mt-4 block underline"
          href="mailto:organization@example.com"
        >
          {company.email}
        </a>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Contact Number</h1>
        <a className="block mt-4" href="tel:1234567890">
          {company.phone}
        </a>
      </div>
    </section>
  );
}

export default AboutPage;
