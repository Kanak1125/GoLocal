import React from "react";
import Logo from "../../public/assets/logo.png";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav>
      <div className='logo'>
        <img src={Logo} alt='logo-img' />
      </div>
      <div className='nav-links'>
        Home <FaHome />
      </div>
      <div className='nav-right'>
        <button className='btn rounded-md'>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
