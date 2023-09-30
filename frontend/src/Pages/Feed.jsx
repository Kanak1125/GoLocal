import React, { useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import Posts from "../Components/Posts";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import MySwiperFull from "../Components/MySwiperFull";
import WebMap from "../Components/WebMap";
import PostDetails from "../Components/PostDetails";

const Feed = () => {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  const navigate = useNavigate();

  if (open) document.body.classList.add('overflow-hidden');
  return (
    <div className="overflow-hidden">
      {open && <div className="w-full min-h-screen absolute bg-black z-40 flex h-full gap-2">
          <div className="img-container w-[70%] h-full basis-3/4 ">
            <MySwiperFull />
          </div>
          <div className="basis-1/4 w-full">
            <WebMap />
            <PostDetails />
          </div>
        </div>  
      }
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
      <Posts 
        open={open}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Feed;
