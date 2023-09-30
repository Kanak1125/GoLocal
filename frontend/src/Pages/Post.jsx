import React, { useState } from "react";
import ToggleSlider from "../Components/ToggleSlider";
import WebMap from "../Components/WebMap";

const Post = () => {
  const [formData, setFormData] = useState({
    location: "",
    transport: "",
    restaurant: "",
    lodging: "",
    description: "",
  });

  const [buttonClicked, setButtonClicked] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setButtonClicked((prevState) => !prevState);
  }

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  return (
    <div className='min-w-[280px] max-w-[444px] min-h-screen flex items-center justify-center w-full my-4 mx-auto'>
      <div className='container'>
        <div className='location-accessbility'>
          <form className='py-4 px-2'>
            <div className='loaction-name'>
              <label htmlFor='location'>
                Location
                <input
                  onChange={handleChange}
                  type='text'
                  placeholder='Add Location'
                  value={formData.location}
                  name='location'
                />
              </label>
              <div className='map'>
                <button
                  onClick={(e) => handleClick(e)}
                  className='accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300'
                >
                  Add location From Map
                </button>
              </div>
            </div>
            <div className='select-access'>
              <label htmlFor='transport'>Transport Available</label>
              <select
                name='transport'
                id='transport'
                className='mb-4'
                value={formData.transport}
                onChange={handleChange}
              >
                <option value='public'>Two Wheeler</option>
                <option value='private'>Four Wheeler</option>
                <option value='any'>Any</option>
              </select>

              <label htmlFor='restaurant'>Restaurant Available</label>
              <select
                name='restaurant'
                id='restaurant'
                className='mb-4'
                value={formData.restaurant}
                onChange={handleChange}
              >
                <option value='available'>Available</option>
                <option value='not-available'>Not Available</option>
              </select>

              <label htmlFor='lodging'>Lodging Available</label>
              <select
                name='lodging'
                id='lodging'
                className='mb-4'
                value={formData.lodging}
                onChange={handleChange}
              >
                <option value='available'>Available</option>
                <option value='only-few'>Only Few</option>
                <option value='Not-Available'>Not Available</option>
              </select>
            </div>
            <div className='discription-field w-full'>
              <textarea
                className='w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500'
                onChange={handleChange}
                value={formData.description}
                placeholder='Description'
                name='description'
              />
            </div>
            <div className='trek-toggle flex items-center w-full'>
              <ToggleSlider />
            </div>
            <input
              type='submit'
              value='Upload'
              className='accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300 my-3 cursor-pointer'
            />
          </form>
        </div>
      </div>
      {buttonClicked && (
        <div>
          <WebMap />
        </div>
      )}
    </div>
  );
};

export default Post;