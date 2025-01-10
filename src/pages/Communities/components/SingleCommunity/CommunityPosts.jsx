import React from "react";
import SinglePost from "../../../../components/SinglePost";

function CommunityPosts() {
  return (
    <div className="px-2 sm:px-4">
      {Array(12)
        .fill(0)
        .map(() => (
          <SinglePost />
        ))}
    </div>
  );
}

export default CommunityPosts;
