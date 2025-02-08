import React, { useEffect, useState } from "react";
import SinglePost from "../../../components/SinglePost";
import API from "../../../api";
import { Spinner } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { inceaseCurrentPage, loadPosts } from "../../../app/slices/posts";

const Posts = () => {
  const { posts, hasMore, currentPage } = useSelector(
    (state) => state.posts.ownedPosts
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        dispatch(inceaseCurrentPage({ type: "owned" }));
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
          `/api/post/?page=${currentPage}&limit=3&type=latest&filter=owned`
        );
        console.log(response.data);
        dispatch(loadPosts({ type: "owned", posts: response.data.data }));
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

export default Posts;
