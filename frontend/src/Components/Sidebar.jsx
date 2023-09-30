import React from "react";
import Posts from "./Posts";

const Sidebar = () => {
  return (
    <div className='sidebar bg-gray-100 py-4 px-3 rounded-lg'>
      <div className='explore-container flex items-center bg-white p-4 rounded-md'>
        <div className='circle w-[40px] min-w-[40px] h-[40px] rounded-full accent-color overflow-hidden'>
          <img
            src='https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png'
            alt=''
            className='w-full h-full '
          />
        </div>
        <div className='explore-right flex flex-col gap-3 ml-4'>
          <div className='explore-text'>
            <p>Explore many more destinations near your location</p>
          </div>
          <div className='explore'>
            <button className='btn accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300'>
              Explore
            </button>
          </div>
        </div>
      </div>

      <div className='recent-posts-container my-3'>
        <h2 className='text-xl font-bold'>Recent posts</h2>
        {/* <div className='recent-posts flex items-center p-4 rounded-md'>
          <div className='title'>
            <div className='circle w-[32px] h-[32px] rounded-full accent-color overflow-hidden'>
              <img
                src='https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png'
                alt=''
                className='w-full h-full '
              />
            </div>
            <div className='post-title'></div>
          </div>
          <div className='post-date'>
            <p>Yesterday 12 PM</p>
          </div>
          <div className='title'>
            <div className='circle w-[32px] h-[32px] rounded-full accent-color overflow-hidden'>
              <img
                src='https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png'
                alt=''
                className='w-full h-full '
              />
            </div>
            <div className='post-title'></div>
          </div>
          <div className='post-date'>
            <p>Yesterday 12 PM</p>
          </div>
        </div> */}
        <div className='my-3 bg-white p-4 rounded-md'>
          <div className='recent-post flex'>
            <div className='title flex items-center'>
              <div className='circle w-[32px] h-[32px] rounded-full accent-color overflow-hidden'>
                <img
                  src='https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png'
                  alt=''
                  className='w-full h-full '
                />
              </div>
              <div className='post-title ml-5'>Title 1</div>
            </div>
          </div>
          <div className='post-date block mt-2 text-sm'>
            <p>Yesterday 12 PM</p>
          </div>
        </div>
        <div className='my-3 bg-white p-4 rounded-md'>
          <div className='recent-post flex'>
            <div className='title flex items-center'>
              <div className='circle w-[32px] h-[32px] rounded-full accent-color overflow-hidden'>
                <img
                  src='https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png'
                  alt=''
                  className='w-full h-full '
                />
              </div>
              <div className='post-title ml-5'>Title 1</div>
            </div>
          </div>
          <div className='post-date block mt-2 text-sm'>
            <p>Yesterday 12 PM</p>
          </div>
        </div>
        <div className='my-3 bg-white p-4 rounded-md'>
          <div className='recent-post flex'>
            <div className='title flex items-center'>
              <div className='circle w-[32px] h-[32px] rounded-full accent-color overflow-hidden'>
                <img
                  src='https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png'
                  alt=''
                  className='w-full h-full '
                />
              </div>
              <div className='post-title ml-5'>Title 1</div>
            </div>
          </div>
          <div className='post-date block mt-2 text-sm'>
            <p>Yesterday 12 PM</p>
          </div>
        </div>
      </div>
      <div className='more accent-color text-white text-center font-bold py-2 px-4 rounded-full transition-all duration-300'>
        Load More
      </div>
    </div>
  );
};

export default Sidebar;
