import React from "react";
import Logo from "../assets/logo.png";
import { FaHome } from "react-icons/fa";
import Search from "./Search";

const Navbar = () => {
  const [user, setUser] = React.useState(true);
  const [searchInput, setSearchInput] = React.useState("");

  function handleChange(event) {
    const { value } = event.target;
    setSearchInput(value);
  }
  console.log(searchInput);

  return (
    <div className='container max-w-[1400px] my-2 mx-auto'>
      <nav className='nav-container flex justify-around'>
        <div className='logo w-20  m-2 text-white'>
          <img src={Logo} alt='logo-img' />
        </div>
        <div className='nav-links flex items-center'>
          <FaHome />
          <Search searchHandler={handleChange} searchInput={searchInput} />
        </div>
        <div className='nav-right flex items-center'>
          <button className='accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300'>
            {user ? "Logout" : "Sign Up"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
