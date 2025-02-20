import React, { useEffect, useState } from "react";
import SinglePost from "../../../../components/SinglePost";
import API from "../../../../api";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCommunityPosts,
  fetchCommunityPosts,
  increasePostsPage,
} from "../../../../app/slices/community";
import { Spinner } from "@nextui-org/react";
import { useParams } from "react-router-dom";

function CommunityPosts() {
  const { data, posts } = useSelector((state) => state.community);

  const { hasMore, currentPage } = posts;

  const { communityId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      (!hasMore && posts.data.length === 0) ||
      (posts.data.length > 0 && posts.data[0].community !== data)
    ) {
      dispatch(clearCommunityPosts());
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        dispatch(increasePostsPage());
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!hasMore || isLoading) {
      return;
    }

    const fetchCommunityPost = async () => {
      setIsLoading(true);
      const response = await API.get(
        `/api/community/posts/get?page=${currentPage}&limit=3&communityId=${communityId}`
      );
      console.log(response.data);
      dispatch(fetchCommunityPosts(response.data.data));
      setIsLoading(false);
    };
    fetchCommunityPost();
  }, [currentPage]);

  return (
    <div className="px-2 sm:px-4">
      {posts.data.map((post, i) => (
        <SinglePost key={i} post={post} user={post.user} />
      ))}
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner color="success" />
        </div>
      )}
      {posts.data.length === 0 && !isLoading && (
        <div className="min-h-[100px] flex items-center justify-center">
          <span>No Post Available</span>
        </div>
      )}
    </div>
  );
}

export default CommunityPosts;
