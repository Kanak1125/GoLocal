import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Posts from "../Components/Posts";
import Post from "./Post";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      {/* <Post /> */}

      <div className='max-w-[576px] my-5 mx-auto'>
        <button
          onClick={() => navigate("/post")}
          className='accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300 w-full '
        >
          Post
        </button>
      </div>
      <Posts />
    </div>
  );
};

export default Feed;
