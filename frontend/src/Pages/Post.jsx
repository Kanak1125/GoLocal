import React, { useState } from "react";
import ToggleSlider from "../Components/ToggleSlider";

const Post = () => {
  return (
    <div className=' min-h-screen flex items-center justify-center w-full'>
      <div className='container'>
        <h3>Post</h3>
        <div className='location-accessbility'>
          <form>
            <div className='loaction-name'>
              <label htmlFor='location'>
                Location
                <input type='text' placeholder='Add Location' name='location' />
              </label>
            </div>
            <div className='select-access'>
              <label htmlFor='transport'>Transport Available</label>
              <select name='' id='transport'>
                <option value='public'>Two Wheeler</option>
                <option value='private'>Four Wheeler</option>
                <option value='any'>Any</option>
              </select>

              <label htmlFor='restaurant'>Restaurant Available</label>
              <select name='' id='restaurant'>
                <option value='available'>Available</option>
                <option value='not-available'>Not Available</option>
              </select>

              <label htmlFor='lodging'>Lodging Available</label>
              <select name='' id='lodging'>
                <option value='available'>Available</option>
                <option value='only-few'>Only Few</option>
                <option value='Not-Available'>Not Available</option>
              </select>
            </div>
          </form>
        </div>
        <div className='trek-toggle min-h-screen flex items-center w-full'>
          <ToggleSlider />
        </div>
      </div>
    </div>
  );
};

export default Post;
