import React, { useEffect } from "react";
import ErrorAlert from "../components/elements/ErrorAlert";
import Spinner from "../components/elements/Spinner";
import Title from "../components/elements/Title";
import PostList from "../components/section/PostList";
import PostSenderList from "../components/section/PostSenderList";
import { useAppState } from "../context/appContext";

interface PostPageProps {}

const PostPage: React.FC<PostPageProps> = () => {
  const {
    isLoading,
    getPosts,
    sl_token,
    usersPosts,
    errorMessage,
  } = useAppState();

  useEffect(() => {
    if (sl_token && !errorMessage) {
      getPosts(1);
    }

    // eslint-disable-next-line
  }, [sl_token, errorMessage]);

  return (
    <div className="container mt-32">
      <Title pageTitle="Posts" />
      {errorMessage && <ErrorAlert>{errorMessage}</ErrorAlert>}
      {isLoading && (
        <div className="d-flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {usersPosts && (
        <div className="d-flex posts-container">
          <PostSenderList />
          <PostList />
        </div>
      )}
    </div>
  );
};

export default PostPage;
