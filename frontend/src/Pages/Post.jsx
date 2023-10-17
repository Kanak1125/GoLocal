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
  console.log(formData.transport);
  const [isChecked, setIsChecked] = React.useState(false);
  const [diffcult, setDiffcult] = React.useState("");
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const [images, setImages] = useState([]);

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
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  useEffect(() => {
    console.log(images);
  }, [images])

  const imageChange = (event) => {
    if (event.target.files && event.target.files) {
      setImages(
        [...event.target.files].map((file) => {
          // return URL.createObjectURL(file);
          return file;
        })
      );
    }
    console.log(event.target.files);
  };
  console.log(images);

  function submitData(event) {
    event.preventDefault();
    const formPayload = new FormData();
    formPayload.append("location", formData.location);
    formPayload.append("restaurant", formData.restaurant);
    formPayload.append("lodging", formData.lodging);
    formPayload.append("difficuty", diffcult);
    formPayload.append("description", formData.description);
    formPayload.append("transport", formData.transport);
    formPayload.append("image", images);
  //   axios({
  //     method: 'post',
  //     url: 'http://127.0.0.1:8000/api/post-create-list/',
  //     formData,
  //     headers :{
  //       "Content-Type": "multipart/form-data"
  //     },
  //   })
  //     .then(() => console.log("Post successfully posted..."))
  //     .catch((err) => console.error(`ERROR: ${err}`));
  axios.post('http://127.0.0.1:8000/api/post-create-list/', formData, {
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
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
                    <WebMap height={'300px'}/>
                  </div>
                )}
              </div>
            </div>
            <div className='select-access'>
                <div className="transport-access flex items-center mb-4">
                  <p className="mr-2">Transport</p>
                  <input
                    type="radio"
                    id="two-wheeler"
                    name="transport"
                    value="Two-Wheeler"
                    checked={formData.transport === "Two-Wheeler"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  <label htmlFor="two-wheeler" className="mr-4 cursor-pointer">Two-Wheeler</label>

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

                <div className="restaurant-access flex items-center mb-4">
                  <p className="mr-2">Restaurant</p>
                  <input
                    type="radio"
                    id="restaurant-available"
                    name="restaurant"
                    value="RestaurantAvailable"
                    checked={formData.restaurant === "RestaurantAvailable"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  <label htmlFor="restaurant-available" className="mr-4 cursor-pointer">Restaurant Available</label>

                  <input
                    type="radio"
                    id="restaurant-not-available"
                    name="restaurant"
                    value="RestaurantNotAvailable"
                    checked={formData.restaurant === "RestaurantNotAvailable"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  <label htmlFor="restaurant-not-available" className="cursor-pointer">Restaurant Not Available</label>
                </div>

                <div className="stay-access flex items-center">
                  <p className="mr-2">Hotels</p>
                  <input
                    type="radio"
                    id="hotels-available"
                    name="lodging"
                    value="HotelsAvailable"
                    checked={formData.lodging === "HotelsAvailable"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  <label htmlFor="hotels-available" className="mr-4 cursor-pointer">Hotels Available</label>

                  <input
                    type="radio"
                    id="hotels-not-available"
                    name="lodging"
                    value="HotelsNotAvailable"
                    checked={formData.lodging === "HotelsNotAvailable"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  <label htmlFor="hotels-not-available" className="cursor-pointer">Hotels Not Available</label>
                </div>
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
