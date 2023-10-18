import React, { useState } from 'react'
import MySwiper from "./MySwiper";
import { FaRegComment, FaExpandAlt  } from "react-icons/fa";
import { BsHeart, BsHeartFill} from "react-icons/bs";
import { useAuthContext } from '../context/AuthContext';
import formatTimeAgo from '../modules/timeAgo';

const PostItem = (props) => {
    const {open, openModal, closeModal, itemData} = props;
    const { currentUser } = useAuthContext();
    const [like, setLike] = useState(false);

    const currentDate = new Date(itemData.upload_date);
    // console.log(formatTimeAgo(currentDate));
    const formattedDiffTime = formatTimeAgo(currentDate);
  
  return (
    <div className='posts container bg-gray-100 rounded-lg py-3 px-5 mx-auto my-8 '>
      <div className='post-detail flex justify-between items-center gap-2'>
        <div className="w-[32px] min-w-[32px] h-[32px] rounded-full accent-color"></div>
        <div className='w-full flex flex-col justify-between ml-2 sm:items-center sm:flex-row'>
          <div className="flex flex-col md:ml-4">
            <p className='username font-bold'>{itemData.name}</p>
            <p className='username text-sm'>{itemData.name}</p>
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
            <MySwiper images={itemData.images}/>
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
              <li className="py-2 px-4 secondary-color rounded-full ">Lodging</li>
              <li className="py-2 px-4 secondary-color rounded-full ">Resturants</li>
            </ul>
          </div>
          <section className="reacts-section flex gap-5 my-5 mx-2">
          <div className='flex'>
            {like ? 
                <BsHeartFill size={24} className='text-red-500 cursor-pointer'  onClick={() => setLike(prevStatus => !prevStatus)}/> : 
                <BsHeart size={24} className='text-red-500 cursor-pointer' onClick={() => setLike(prevStatus => !prevStatus)}/>
            }
              <span className="cursor-pointer ml-2">45</span>
            </div>
            <div className="flex">
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
  )
}

export default PostItem