import React from "react";
import Logo from "../assets/logo.png";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = React.useState(true);

  return (
    <div className='container max-w-[1400px] my-2'>
      <nav className='nav-container flex justify-around'>
        <div className='logo w-20 h-20 m-2 text-white'>
          <img src={Logo} alt='logo-img' />
        </div>
        <div className='nav-links flex '>
          <FaHome />
        </div>
        <div className='nav-right'>
          <button className='btn rounded-md'>
            {user ? "Logout" : "Sign Up"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
