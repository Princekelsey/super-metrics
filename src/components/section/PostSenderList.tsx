import React from "react";
import { useAppState } from "../../context/appContext";
import Input from "../elements/Input";
import PostSender from "./PostSender";

interface PostSenderListProps {}

const PostSenderList: React.FC<PostSenderListProps> = () => {
  const { usersPosts, handleSearch } = useAppState();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    handleSearch(value, "SENDER");
  };

  return (
    <div className="post-sender-list ">
      <div className="mb-32">
        <Input
          type="text"
          id="saerch"
          name="saerch"
          placeholder="Search post sender"
          onChange={onChange}
        />
      </div>
      <div className="content">
        {usersPosts ? (
          <React.Fragment>
            {Object.keys(usersPosts).map((key) => {
              return (
                <PostSender
                  key={key}
                  senderName={key}
                  posts={usersPosts[key]}
                  senderId={usersPosts[key][0].from_id}
                />
              );
            })}
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default PostSenderList;
