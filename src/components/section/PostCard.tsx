import React from "react";
import { PostI } from "../../types";
import moment from "moment";

interface PostCardProps {
  post: PostI;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post-card p-16 ">
      <span className="post-date mb-8">
        {moment(post.created_time).format("MMMM Do YYYY, h:mm:ss")}
      </span>
      <p>{post.message}</p>
    </div>
  );
};

export default PostCard;
