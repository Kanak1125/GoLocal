import React from "react";
<<<<<<< HEAD
import MySwiper from "./MySwiper";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { BsArrowsAngleExpand } from "react-icons/bs";
=======
import PostItem from "./PostItem";
>>>>>>> f81704d9362fde650f7dcc4a9288d18d4cb128a3

const Post = (props) => {
  const { open, openModal, closeModal } = props;
  return (
<<<<<<< HEAD
    <div
      className='posts container bg-white max-w-[576px] ternary-color rounded-lg py-3 px-5 mx-auto cursor-pointer'
      onClick={openModal}
    >
      <div className='post-detail flex justify-between '>
        <div className='flex gap-4'>
          <div className='w-[32px] h-[32px] rounded-full accent-color'></div>
          <p className='username font-bold'>Ace</p>
        </div>
        <p className='time accent-text-color'>
          <span className='text-sm'>Yesterday at 12PM</span>
        </p>
      </div>

      <hr className='mt-3 rounded border-secondary' />

      <div className='post-info '>
        <div className='location-img-detail '>
          <div className='post-image my-5 bg-white rounded-md overflow-hidden'>
            <MySwiper />
          </div>
        </div>
        <div className='location-discription-map '>
          <div>
            <p className='post-description text-start text-sm py-8 px-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              laborum quisquam recusandae, itaque ipsa cupiditate eligendi fuga
              id fugit, obcaecat.
            </p>
          </div>
          <div className='post-details list-item list-inside list-none text-center font-medium'>
            <ul className='flex'>
              <li className='py-2 px-4 secondary-color rounded-full mr-4 '>
                Resturants
              </li>
              <li className='py-2 px-4 secondary-color rounded-full mr-4 '>
                Resturants
              </li>
            </ul>
          </div>
          <section className='reacts-section flex gap-5 my-5 mx-2'>
            <FaRegHeart size={24} />
            <div className='flex'>
              <FaRegComment size={24} className='cursor-pointer' />
              <span className='ml-2 cursor-pointer'>12</span>
            </div>
          </section>
          {/* <div className='map-location'>
            <a href='#'>View map Details</a>
          </div> */}
        </div>
      </div>
    </div>
=======
    <PostItem 
      open={open}
      openModal={openModal}
      closeModal={closeModal}
    />
>>>>>>> f81704d9362fde650f7dcc4a9288d18d4cb128a3
  );
};

export default Post;
