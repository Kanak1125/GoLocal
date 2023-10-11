import React, { useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import Posts from "../Components/Posts";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import MySwiperFull from "../Components/MySwiperFull";
import WebMap from "../Components/WebMap";
import PostDetails from "../Components/PostDetails";
import Sidebar from "../Components/Sidebar";
import MyModal from "../Components/MyModal";

const Feed = () => {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    document.body.classList.remove('overflow-hidden');

  }

  const navigate = useNavigate();

  if (open) document.body.classList.add('overflow-hidden');
  return (
    <div className="">
      {open && <MyModal >
        <button 
          className="w-[32px] h-[32px] rounded-full accent-color absolute z-50 right-3 top-3 md:left-4"
          onClick={closeModal}
        >X</button>
        <div className="img-container w-full md:w-[70%] md:h-screen relative py-5 px-8 bg-white">
            {/* <div className="h-full"> */}
              <MySwiperFull />
            {/* </div> */}
          </div>
          <div className="md:w-[30%] p-7 md:p-5">
            <WebMap height={'300px'}/>
            <PostDetails />
          </div>
      </MyModal>
      }
      <Navbar />
      {/* <Post /> */}

      <main className='flex justify-center my-8 border-2 border-red-400 gap-8 max-w-[1400px] mx-auto'>
        <div className="feed flex flex-col break-words break-all px-3">
          <div className='mx-auto flex flex-col
          gap-4 items-center justify-between w-full p-5 rounded-lg bg-gray-100 sm:flex-row'>
            <div className="w-[40px] min-w-[40px] h-[40px] mx-2 rounded-full accent-color"></div>
            <p className='username font-bold'>Wanna post something?</p>
            <button
            onClick={() => navigate("/post")}
            className='w-full h-[40px] accent-color text-white font-bold rounded-full transition-all duration-300 sm:w-[100px]'
            >
            Post
            </button>
          </div>
          <Posts open={open} openModal={openModal} closeModal={closeModal} />
        </div>
        <Sidebar />
      </main>
    </div>
  );
};

export default Feed;
