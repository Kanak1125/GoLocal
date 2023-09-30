import React from "react";
import PostItem from "./PostItem";

const Post = (props) => {
  const { open, openModal, closeModal } = props;
  return <PostItem open={open} openModal={openModal} closeModal={closeModal} />;
};

export default Post;
