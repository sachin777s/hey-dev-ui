import React, { useEffect, useState } from "react";
import SinglePost from "../../../components/SinglePost";
import API from "../../../api";
import { Spinner } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { inceaseCurrentPage, loadPosts } from "../../../app/slices/posts";

const Likes = () => {
  const { posts, hasMore, currentPage } = useSelector(
    (state) => state.posts.likedPosts
  );
  const [isLoading, setIsLoading] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        dispatch(inceaseCurrentPage({ type: "liked" }));
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
        const response = await API.get(
          `/api/post/?page=${currentPage}&limit=3&type=latest&filter=liked`
        );
        console.log(response.data);
        dispatch(loadPosts({ type: "liked", posts: response.data.data }));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  return (
    <section className="mt-4 px-2 sm:px-4">
      {posts.map((post, i) => {
        return <SinglePost key={i} post={post} user={post.user} />;
      })}
      {isLoading && (
        <div className="py-4 flex items-center justify-center">
          <Spinner className="mx-auto" color="success" />
        </div>
      )}
    </section>
  );
};

export default Likes;
