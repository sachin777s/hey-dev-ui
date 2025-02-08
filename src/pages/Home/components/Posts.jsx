import React, { useEffect, useState } from "react";
import SinglePost from "../../../components/SinglePost";
import API from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { inceaseCurrentPage, loadPosts } from "../../../app/slices/posts";
import { Spinner } from "@nextui-org/react";

const Posts = () => {
  const { posts, hasMore, currentPage } = useSelector(
    (state) => state.posts.normalPosts
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        dispatch(inceaseCurrentPage({ type: "normal" }));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!hasMore || isLoading) return;

      try {
        setIsLoading(true);
        const response = await API.get(
          `/api/post/?page=${currentPage}&limit=3&type=latest`
        );
        console.log(response.data);
        dispatch(loadPosts({ type: "normal", posts: response.data.data }));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  return (
    <div className="px-2 sm:px-4">
      {posts.map((post, i) => (
        <SinglePost key={i} post={post} user={post.user} />
      ))}
      {isLoading && (
        <div className="py-4 flex items-center justify-center">
          <Spinner className="mx-auto" color="success" />
        </div>
      )}
    </div>
  );
};

export default Posts;
