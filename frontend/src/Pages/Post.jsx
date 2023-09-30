import React, { useState, useEffect } from "react";
import ToggleSlider from "../Components/ToggleSlider";
import WebMap from "../Components/WebMap";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const Post = () => {
  const { currentUser } = useAuthContext();
  const [formData, setFormData] = useState({
    location: "",
    transport: "",
    restaurant: "",
    lodging: "",
    description: "",
  });
  const [isChecked, setIsChecked] = React.useState(false);
  const [diffcult, setDiffcult] = React.useState("easy");
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const [images, setImages] = useState([]);

  function handleChangediff(event) {
    const { value } = event.target;
    console.log(value);
    setDiffcult(value);
  }
  console.log(diffcult);

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
  const imageChange = (event) => {
    if (event.target.files && event.target.files) {
      setImages(
        [...event.target.files].map((file) => {
          return URL.createObjectURL(file);
        })
      );
    }
    console.log(event.target.files);
  };
  console.log(images);

  function getApi() {
    console.log("------Starting uploading----------");

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/post-create-list/",
      data: {
        user: currentUser.user_id,
        name: formData.location,
        description: formData.description,
        transportation: formData.transport,
        restaurant: formData.restaurant,
        lodging: formData.lodging,
        trek: isChecked,
        difficulty: null,
        location: null,
        images: images,

        // id: 1,
        // user: 1,
        // name: null,
        // transportation: null,
        // restaurant: null,
        // lodging: null,
        // trek: false,
        // difficulty: null,
        // description: "High",
        // location: null,
        // upload_date: null,
        // images: ["a", "b"],
      },
    })
      .then(() => console.log("Post successfully posted..."))
      .catch((err) => console.error(`ERROR: ${err}`));
  }

  function submitData(event) {
    event.preventDefault();
    getApi();
  }

  return (
    <div className='min-w-[280px] max-w-[444px] min-h-screen flex items-center justify-center w-full my-4 mx-auto'>
      <div className='container'>
        <div className='location-accessbility'>
          <form className='py-4 px-2' onSubmit={submitData}>
            <div className='loaction-name'>
              <label htmlFor='location'>
                Location
                <input
                  onChange={handleChange}
                  type='text'
                  placeholder='Add Location'
                  value={formData.location}
                  name='location'
                  required
                />
              </label>
              <div className='map mt-3'>
                <button
                  onClick={(e) => handleClick(e)}
                  className='accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300'
                >
                  Add location From Map
                </button>
                {buttonClicked && (
                  <div className='my-4 rounded-md w-full'>
                    <WebMap />
                  </div>
                )}
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
                <option value='none' selected disabled hidden>
                  Select a Option
                </option>
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
                <option value='Resturant '>Available</option>
                <option value=''>Not Available</option>
              </select>

              <label htmlFor='lodging'>Lodging Available</label>
              <select
                name='lodging'
                id='lodging'
                className='mb-4'
                value={formData.lodging}
                onChange={handleChange}
              >
                <option value='Lodging available'>Available</option>
                <option value='only-few'>Only Few</option>
                <option value=''>Not Available</option>
              </select>
            </div>

            <label
              htmlFor='upload-img'
              className='accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300 mb-4 cursor-pointer align-start'
            >
              Upload image
            </label>
            <input
              required
              onChange={imageChange}
              type='file'
              name='image'
              id='upload-img'
              className='hidden'
              multiple
            />

            <div className='discription-field w-full'>
              <textarea
                className='w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500'
                onChange={handleChange}
                value={formData.description}
                placeholder='Description'
                name='description'
              />
            </div>
            <div className='trek-toggle flex flex-col w-full font-bold mt-2'>
              <label>Trek / Hike?</label>
              <ToggleSlider
                check={isChecked}
                difficulty={diffcult}
                toggleFunction={handleToggle}
                changeDiff={handleChangediff}
              />
            </div>
            <input
              type='submit'
              value='Upload'
              className='accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300 mt-5 cursor-pointer'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
