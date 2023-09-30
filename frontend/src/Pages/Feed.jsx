import React, { useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import Posts from "../Components/Posts";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import MySwiperFull from "../Components/MySwiperFull";
import WebMap from "../Components/WebMap";
import PostDetails from "../Components/PostDetails";
import Sidebar from "../Components/Sidebar";

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
    <div className="overflow-y-hidden">
      {open && <div className="w-full min-h-screen absolute bg-black/40 z-40">

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
      <main className='flex my-8'>
        <Posts open={open} openModal={openModal} closeModal={closeModal} />
        <Sidebar />
      </main>
    </div>
  );
};

export default Feed;
