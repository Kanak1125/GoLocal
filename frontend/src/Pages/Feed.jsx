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
