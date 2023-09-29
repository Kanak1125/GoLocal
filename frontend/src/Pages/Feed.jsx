import React from "react";
import Navbar from "../Components/Navbar";
import Posts from "../Components/Posts";
import Post from "../Components/Post";

const Feed = () => {
  return (
    <div>
      <Navbar />
      <Post />
      <Posts />
    </div>
  );
};

export default Feed;
