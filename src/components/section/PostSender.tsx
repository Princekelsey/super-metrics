import React from "react";
import { useAppState } from "../../context/appContext";
import { PostI, SelectedUser } from "../../types";

interface PostSenderProps {
  senderName: string;
  senderId: string;
  posts: PostI[];
}

const PostSender: React.FC<PostSenderProps> = ({
  senderName,
  posts,
  senderId,
}) => {
  const {
    selectedUser,
    handleStateUpdate,
    defaultState,
    setDefault,
  } = useAppState();

  return (
    <div
      className={
        selectedUser && selectedUser.from_id === senderId
          ? "p-16 post-sender active"
          : "p-16 post-sender"
      }
      onClick={() => {
        handleStateUpdate<SelectedUser>(
          { from_id: senderId, posts },
          "selectedUser"
        );
        setDefault({
          ...defaultState,
          selectedUser: { from_id: senderId, posts },
        });
      }}
    >
      <span>{senderName}</span>
      <span className="badge">{posts.length}</span>
    </div>
  );
};

export default PostSender;
