import React from "react";
import ReactPaginate from "react-paginate";
import Input from "../elements/Input";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import PostCard from "./PostCard";
import { useAppState } from "../../context/appContext";
import { isObjectEmpty } from "../../utils";

interface PostListProps {}

const PostList: React.FC<PostListProps> = () => {
  const {
    selectedUser,
    getPosts,
    handleSearch,
    usersPosts,
    handleSort,
  } = useAppState();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    handleSearch(value, "POST");
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    getPosts(selected + 1);
  };

  return (
    <div className="post-list ml-32">
      <div className="d-flex items-center justify-between w-full mb-32">
        {selectedUser?.posts && (
          <div className="d-flex items-center">
            <button
              className="btn mr-8 btn-primary p-12"
              onClick={() => {
                if (!selectedUser.posts.length) return;
                handleSort("asce");
              }}
            >
              <FiArrowUp />
            </button>
            <button
              className="btn btn-primary p-12"
              onClick={() => {
                if (!selectedUser.posts.length) return;
                handleSort("desc");
              }}
            >
              <FiArrowDown />
            </button>
          </div>
        )}
        {selectedUser?.posts && (
          <Input
            type="text"
            id="saerch"
            name="saerch"
            placeholder="Search post"
            onChange={onChange}
          />
        )}
      </div>

      {selectedUser && selectedUser.posts.length ? (
        <div className="mb-16 d-flex items-center justify-between">
          <span className="fw-700 ml-8">{`${
            selectedUser.posts.length
              ? `${selectedUser.posts[0].from_name}'s Posts`
              : ""
          } `}</span>
          <ReactPaginate
            pageCount={10}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            marginPagesDisplayed={1}
            containerClassName={"pagination"}
            pageClassName={"page-item "}
            pageLinkClassName={"page-link"}
            activeClassName={"active-page"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            previousLabel={`Prev`}
            disabledClassName={"disabled"}
          />
        </div>
      ) : null}
      <div className="post-content">
        {selectedUser ? (
          <React.Fragment>
            {selectedUser.posts.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {usersPosts && !isObjectEmpty(usersPosts) ? (
              <span>Select a user to view post</span>
            ) : null}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default PostList;
