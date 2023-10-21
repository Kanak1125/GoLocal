import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import { useFeedContext } from "../context/FeedContext";

const Post = (props) => {
  const { open, openModal, closeModal } = props;
  // console.log(data);
  const { feedData } = useFeedContext();
  console.log(feedData);
  const postItems = feedData.map((item, idx)=> {
    return <PostItem key={idx} open={open} openModal={openModal} closeModal={closeModal} itemData={item} />
  })

  return (      
      <div className="mx-auto w-full ">
        {postItems}
      </div>
  );
};

export default Post;
