import React, { useState } from "react";
import SinglePostNavbar from "./SinglePostNavbar";
import SinglePost from "../../components/SinglePost";
import Replies from "./components/Replies";

function SinglePostPage() {
  const [postsHierarchy, setpostsHierarchy] = useState([0,0]);

  return (
    <section>
      <SinglePostNavbar />
      <>
        <div className="px-2 sm:px-4">
          {postsHierarchy
            .map((_, i) => (
              <SinglePost />
            ))}
        </div>
        <Replies />
      </>
    </section>
  );
}

export default SinglePostPage;
