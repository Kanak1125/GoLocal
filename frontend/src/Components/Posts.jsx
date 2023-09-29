import React from "react";

const Post = () => {
  return (
    <div className='posts container bg-white max-w-[1400px]'>
      <div className='post-detail'>
        <p className='username text'>Ace</p>
        <p className='time text'>
          <span>Yesterday at 12PM</span>
        </p>
      </div>
      <div className='post-info flex'>
        <div className='location-img-detail flex flex-col'>
          <div className='post-image'>
            <img src='/' alt='Post-img' />
          </div>
          <div className='post-details list-item list-inside list-disc'>
            <li>Resturants Available</li>
            <li>Lodging not Available</li>
          </div>
        </div>
        <div className='location-discription-map flex flex-col'>
          <div>
            <p className='post-description text-start text-lg text-gray-400'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              laborum quisquam recusandae, itaque ipsa cupiditate eligendi fuga
              id fugit, obcaecat.
            </p>
          </div>
          <div className='map-location'>
            <a href='#'>View map Details</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
