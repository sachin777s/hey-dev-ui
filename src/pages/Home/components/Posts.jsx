import React, { useEffect, useState } from "react";
import SinglePost from "../../../components/SinglePost";
import API from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "../../../app/slices/posts";
import { Spinner } from "@nextui-org/react";

const Posts = () => {
  const posts = useSelector((state) => state.posts.data);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setPageNumber((prevPage) => prevPage + 1);
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
          `/api/post/?page=${pageNumber}&limit=3&type=latest`
        );
        console.log(response.data);
        dispatch(loadPosts(response.data.data));
        setHasMore(response.data.data.length === 3);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [pageNumber]);

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
