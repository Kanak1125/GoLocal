import React, { useState, useEffect } from "react";
import ToggleSlider from "../Components/ToggleSlider";
import WebMap from "../Components/WebMap";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFeedContext } from "../context/FeedContext";

const Post = () => {
  const { currentUser } = useAuthContext();
  const [formData, setFormData] = useState({
    location: "",
    lat: 0, // initialized to zero if not set by the user...
    lng: 0,
    transport: "",
    restaurant: "",
    lodging: "",
    description: "",
    image_file: [],
  });

  // const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const { setFeedData } = useFeedContext();
  console.log(formData);
  const [isChecked, setIsChecked] = React.useState(false); // state for trek/hike checkbox toggle...
  const [diffcult, setDiffcult] = React.useState("");
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  function handleChangediff(event) {
    const { checked } = event.target;

    setDiffcult((level) => {
      level = checked;
    });
  }

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
        [name]: type === "checkbox" ? 
          checked
        : value,
      };
    });
  }

  const handleImageChange = (event) => {
    if (event.target.files) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          image_file: [...event.target.files],
        }
      })
    }
    console.log(event.target.files);
  };
  // console.log(images);

  function resetFormData() {
    setFormData({
      location: "",
      lat: null,
      lng: null,
      transport: "",
      restaurant: "",
      lodging: "",
      description: "",
      image_file: [],
    })
  }

  const submitData = async (event) => {
    event.preventDefault();
    
    const formPayload = new FormData();
    // formPayload.append("uploader", currentUser.name);  // TODO: should be added to db schema...
    formPayload.append("location", formData.location);
    // formPayload.append("lat", formData.lat);
    // formPayload.append("lng", formData.lng);
    formPayload.append("lon", formData.lng);
    formPayload.append("lat", formData.lat);  // storing the coordinates as lon, and lat separately in db...
    formPayload.append("restaurant", formData.restaurant === "RestaurantAvailable" ? true : false);
    formPayload.append("lodging", formData.lodging === "HotelsAvailable" ? true : false);
    formPayload.append("difficuty", diffcult);
    formPayload.append("description", formData.description);
    formPayload.append("transportation", formData.transport);
    for (const image of formData.image_file) {
      formPayload.append("uploaded_images", image);
    }

  axios.post('http://127.0.0.1:8000/api/post-create-list/', formPayload, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
  }).then(res => {
    console.log("Successfully posted...");
    console.log(res);
    navigate('/');
    setFeedData((prevData) => [...prevData, res.data]);
  }).catch(err => {
    console.log(err);
  });

  resetFormData();
}

  return (
    <div className='min-w-[280px] max-w-[444px] min-h-screen flex items-center justify-center w-full mx-auto md:my-4'>
      <div className='container'>
        <div className='flex flex-col justify-center items-center mx-0 w-full max-w-[555px] h-full py-3 px-5 rounded-md __box__shadow my-4'>
          <form className='flex flex-col justify-center items-center w-full h-full py-4 px-2 gap-2' encType="multipart/form-data" onSubmit={submitData}>
            <div className='loaction-name w-full h-full mb-2'>
              <div className="flex flex-col md:flex-row md:items-center">
                <label htmlFor='location' className = "mb-2 me-4 text-xl font-medium __color__333">
                  Location:
                </label>
                  <input
                    onChange={handleChange}
                    type='text'
                    placeholder='Add Location'
                    value={formData.location}
                    name='location'
                    id='location'
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring focus:ring-teal-400 focus:border-teal-500 outline-none"
                    required
                  />
              </div>
              <div className='map mt-3 '>
                <button
                  onClick={(e) => handleClick(e)}
                  className='accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300 '
                >
                  Add location From Map
                </button>
                {buttonClicked && (
                  <div className='my-4 rounded-md w-full'>
                    <WebMap
                      height={'300px'}
                      setFormData={setFormData}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className='select-access self-start'>
                <div className="transport-access mb-4 flex flex-col justify-between">
                  <h3 className="mr-2 text-xl font-semibold">Transport:</h3>
                  <div className="">
                    <input
                      type="radio"
                      id="two-wheeler"
                      name="transport"
                      value="Two-Wheeler"
                      checked={formData.transport === "Two-Wheeler"}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    <label htmlFor="two-wheeler" className="cursor-pointer me-10">Two-Wheeler</label>

                    <input
                      type="radio"
                      id="any"
                      name="transport"
                      value="Any"
                      checked={formData.transport === "Any"}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    <label htmlFor="any" className="cursor-pointer">Any</label>
                  </div>
                  </div>

                <div className="restaurant-access flex flex-col justify-between mb-4 ">
                  <h3 className="mr-2 text-xl font-semibold">Restaurant:</h3>
                  <div className="">  
                    <input
                      type="radio"
                      id="restaurant-available"
                      name="restaurant"
                      value="RestaurantAvailable"
                      checked={formData.restaurant === "RestaurantAvailable"}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    <label htmlFor="restaurant-available" className="mr-4 cursor-pointer">Available</label>

                    <input
                      type="radio"
                      id="restaurant-not-available"
                      name="restaurant"
                      value="RestaurantNotAvailable"
                      checked={formData.restaurant === "RestaurantNotAvailable"}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    <label htmlFor="restaurant-not-available" className="cursor-pointer">Not Available</label>
                  </div>
                </div>

                <div className="stay-access flex flex-col">
                <h3 className="mr-2 text-xl font-semibold">Hotels:</h3>
                <div>
                    <input
                      type="radio"
                      id="hotels-available"
                      name="lodging"
                      value="HotelsAvailable"
                      checked={formData.lodging === "HotelsAvailable"}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    <label htmlFor="hotels-available" className="mr-4 cursor-pointer">Available</label>

                    <input
                      type="radio"
                      id="hotels-not-available"
                      name="lodging"
                      value="HotelsNotAvailable"
                      checked={formData.lodging === "HotelsNotAvailable"}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    <label htmlFor="hotels-not-available" className="cursor-pointer">Not Available</label>
                  </div>
                </div>
              </div>

            <label
              htmlFor='upload-img'
              className='accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300 mb-4 cursor-pointer self-start mt-4 '
            >
              Upload image
            </label>
            <input
              required
              onChange={handleImageChange}
              type='file'
              name='image'
              id='upload-img'
              className='hidden'
              accept="image/jpeg,image/png,image/gif"
              multiple
            />

            <div className='discription-field w-full'>
              <textarea
                className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring focus:ring-teal-400 focus:border-teal-500 outline-none'
                onChange={handleChange}
                value={formData.description}
                placeholder='Description'
                name='description'
              />
            </div>
            <div className='trek-toggle flex flex-col w-full font-bold mt-2'>
              <label className="text-xl font-semibold">Trek / Hike?</label>
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
              className='w-full accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300 mt-5 cursor-pointer self-start'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;