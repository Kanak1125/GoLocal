import React, { useState } from 'react'
import MySwiper from "./MySwiper";
import { FaRegComment, FaExpandAlt  } from "react-icons/fa";
import { BsHeart, BsHeartFill} from "react-icons/bs";
import { useAuthContext } from '../context/AuthContext';
import formatTimeAgo from '../modules/timeAgo';
import WebMap from "../Components/WebMap";
import MyModal from "../Components/MyModal";
import PostDetails from './PostDetails';
import { SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

const PostItem = (props) => {
    const { itemData } = props;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    function openModal() {
      setOpen(true);
    }
  
    function closeModal() {
      setOpen(false);
      document.body.classList.remove('overflow-hidden');
    }

    console.log(itemData);
    if (open) document.body.classList.add('overflow-hidden');
    const { currentUser } = useAuthContext();
    const [like, setLike] = useState(false);

    const currentDate = new Date(itemData.upload_date);
    // console.log(formatTimeAgo(currentDate));
    const formattedDiffTime = formatTimeAgo(currentDate);
    console.log(itemData.images);
  
    const swiperSlides = itemData.images.map((img, index) => {
      return (
        <SwiperSlide key={index} className='overflow-hidden h-[400px]'>
          <img src={img.image} alt="" className={`h-[240px] sm:h-[400px] w-full object-contain object-center select-none`}/>
        </SwiperSlide>
      )
    })

    // two sliders markups are diff. so we have to make two different array of components...
    const modalSwiperSlides = itemData.images.map((img, index) => {
      return (
        <SwiperSlide key={index} className='overflow-hidden bg-black rounded '>
          <img src={img.image} alt="" className={`h-[400px] md:h-[90vh] max-w-[666px] w-full object-contain object-center mx-auto select-none`}/>
        </SwiperSlide>
      )
    })

    function handleLike() {
      if (!currentUser) return navigate('/login');  // only allow user to interact with the post if they're logged in...
      setLike(prevStatus => !prevStatus);
    }

    const handleCommentSection = () => {
      if (!currentUser) return navigate('/login');  // same goes with comment section...
      console.log("clicked...");
    }

  return (
    <>
      {open && <MyModal >
        <button 
          className="w-[32px] h-[32px] rounded-full accent-color absolute z-50 right-3 top-3 md:left-4"
          onClick={closeModal}
        >X</button>
        <div className="img-container w-full md:w-[70%] md:h-screen relative py-5 px-8 bg-white">
            <MySwiper>
              { modalSwiperSlides }
            </MySwiper>
          </div>
          <div className="md:w-[30%] p-7 md:p-5">
            <WebMap height={'300px'} currentData={itemData}/>
            <PostDetails />
          </div>
      </MyModal>
      }
      <div className='posts container bg-gray-100 rounded-lg py-3 px-5 mx-auto my-8 '>
        <div className='post-detail flex justify-between items-center gap-2'>
          <div className="w-[32px] min-w-[32px] h-[32px] rounded-full accent-color"></div>
          <div className='w-full flex flex-col justify-between ml-2 sm:items-center sm:flex-row'>
            <div className="flex flex-col md:ml-4">
              <p className='username font-bold'>{itemData.location}</p>
              <p className='username text-sm'>By ________ someone</p>
            </div>
            <p className='time accent-text-color text-sm max-w-[120px] mt-2 sm:mt-0'>
              {formattedDiffTime} 
            </p>
          </div>
          <FaExpandAlt size={24} onClick={openModal} className='ml-4 cursor-pointer accent-text-color'/>
        </div>

        <hr className="mt-3 rounded border-secondary"/>

        <div className='post-info '>
          {/* <div className='location-img-detail '> */}
            <div className='post-image my-5 bg-black rounded-md overflow-hidden'>
              <MySwiper>
                { swiperSlides }
              </MySwiper>
            </div>
          {/* </div> */}
          <div className='location-discription-map '>
            <div>
              <p className='post-description text-start text-sm py-8 px-2'>
                {itemData.description}
              </p>
            </div>
            <div className='post-details list-item list-inside list-none text-center font-medium'>
              <ul className="flex break-keep flex-wrap gap-4">
                {itemData.lodging && <li className="py-2 px-4 secondary-color rounded-full ">Lodging</li>}
                {itemData.restaurant && <li className="py-2 px-4 secondary-color rounded-full ">Resturants</li>}
                <li className="py-2 px-4 secondary-color rounded-full capitalize">{ itemData.transportation }</li>
              </ul>
            </div>
            <section className="reacts-section flex gap-5 my-5 mx-2">
            <div className='flex'>
              {like ? 
                  <BsHeartFill size={24} className='text-red-500 cursor-pointer'  onClick={handleLike}/> : 
                  <BsHeart size={24} className='text-red-500 cursor-pointer' onClick={handleLike}/>
              }
                <span className="cursor-pointer ml-2">45</span>
              </div>
              <div className="flex" onClick={handleCommentSection}>
                <FaRegComment size={24} className="cursor-pointer"/>
                <span className="ml-2 cursor-pointer">12</span>
              </div>
            </section>
            {/* <div className='map-location'>
              <a href='#'>View map Details</a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default PostItem