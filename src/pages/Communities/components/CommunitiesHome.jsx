import React, { useEffect, useState } from "react";
import SinglePost from "../../../components/SinglePost";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../../../api";
import { FaUsers } from "react-icons/fa6";
import { inceaseCurrentPage, loadPosts } from "../../../app/slices/posts";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@nextui-org/react";

const CommunitiesHome = () => {
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { posts, hasMore, currentPage } = useSelector(
    (state) => state.posts.communityPosts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        dispatch(inceaseCurrentPage({ type: "community" }));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetching owned and joined communties
  useEffect(() => {
    const fetchCommunities = async () => {
      const response = await API.get("/api/user/profile/communities");
      console.log(response.data.data);
      setCommunities(response.data.data);
    };
    fetchCommunities();
  }, []);

  // Fetching community type posts
  useEffect(() => {
    if (!hasMore || isLoading) {
      return;
    }

    const fetchCommunitiesPosts = async () => {
      setIsLoading(true);
      const response = await API.get(
        `/api/community/posts/get?page=${currentPage}&limit=3`
      );
      dispatch(loadPosts({ type: "community", posts: response.data.data }));
      setIsLoading(false);
    };
    fetchCommunitiesPosts();
  }, [currentPage]);

  return (
    <>
      <div className="py-4 flex items-center justify-center flex-wrap gap-2">
        {/* Communities */}
        {communities.map((community, i) => (
          <Link
            key={i}
            to={`/communities/${community._id}/posts`}
            className="p-2 flex items-center flex-col gap-2 border border-transparent hover:border-[#c4c4c4] hover:dark:border-[#222222] box-content rounded-2xl"
          >
            <div className="h-32 w-32 rounded-2xl overflow-hidden flex items-center justify-center">
              {community.logo ? (
                <img
                  className=" h-full object-cover"
                  src={community.logo}
                  alt=""
                />
              ) : (
                <FaUsers size={80} />
              )}
            </div>
            <div className="flex flex-col text-center">
              <span className="font-semibold hover:underline">
                {community.name}
              </span>
              <span className="">
                <span className="font-semibold">
                  {community.memberCount + 1}
                </span>
                <span className="opacity-70"> Members</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Posts  */}
      <div className="border-t-[0.5px] border-color">
        {posts.map((post, i) => (
          <div className="mt-2 px-2 sm:px-4">
            <Link
              to={`/communities/${post.community._id}/posts`}
              className="flex items-center gap-4 hover:underline opacity-70 font-bold"
            >
              <FaUserFriends />
              {post.community.name}
            </Link>
            <SinglePost post={post} user={post.user} key={i} />
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="mt-8 flex items-center justify-center">
          <Spinner color="success" />
        </div>
      )}
      {!hasMore && (
        <div className="py-8 flex items-center justify-center">
          No More posts
        </div>
      )}
    </>
  );
};

export default CommunitiesHome;
