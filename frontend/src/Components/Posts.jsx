import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import { useFeedContext } from "../context/FeedContext";

const Post = (props) => {
  const { open, openModal, closeModal } = props;
  // console.log(data);
  const { feedData, fetchStatus } = useFeedContext();
  console.log(feedData);
  console.log(fetchStatus);
  const postItems = feedData.map((item, idx)=> {
    return <PostItem key={idx} open={open} openModal={openModal} closeModal={closeModal} itemData={item} />
  })

  if (fetchStatus === "delayed") {
    return <p className="text-center">The response is taking longer than expected...</p>;
  }

  return (      
      <div className="mx-auto w-full ">
        {fetchStatus === "loading" && <p className="text-center">Loading...</p>}
        {postItems}
      </div>
  );
};

export default Post;
