import React from "react";

function AboutPage() {
  return (
    <section className="px-2 sm:px-4">
      {/* Description */}
      <div className="mt-4">
        <h1 className="text-xl font-semibold">Description</h1>
        <p className="mt-4">
          {
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates veniam adipisci corporis sit, sunt aut, error quasi, explicabo inventore tempora voluptas repudiandae quam maiores. Optio accusamus nesciunt ipsam quam velit asperiores saepe placeat, fuga quo ratione consectetur earum praesentium animi, nulla itaque, molestias omnis fugiat. Illo illum asperiores aspernatur voluptas ut blanditiis quae dolor tempore. Harum obcaecati neque ad eveniet, nulla error mollitia aut est. Vel, dignissimos quaerat sunt, modi non rerum sit eligendi fuga illo quibusdam, minus voluptatem. Blanditiis soluta voluptates iure repudiandae maxime. Tempore magnam vero dolorum eos provident iste quis sed neque architecto repudiandae illo dolore tenetur molestiae, accusamus id quisquam magni porro? Velit quisquam dicta sequi ipsa accusantium eaque corrupti voluptatem aut. Tenetur nemo neque animi excepturi possimus explicabo necessitatibus exercitationem placeat! Modi ad quisquam ratione!"
          }
        </p>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Industries</h1>
        <p className="mt-4">{"Artificial Intelligence, Blockchain"}</p>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Website</h1>
        <a className="mt-4 block underline" href="#">
          https://www.tcs.com/careers/india
        </a>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Company Size</h1>
        <span className="block mt-4">{"51 - 200"}</span>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Founded IN</h1>
        <span className="block mt-4">2013</span>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Email</h1>
        <a className="mt-4 block underline" href="mailto:organization@example.com">
          organization@example.com
        </a>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Contact Number</h1>
        <a className="block mt-4" href="tel:1234567890">1234567890</a>
      </div>
    </section>
  );
}

export default AboutPage;
