import React from "react";
import Logo from "../assets/logo.png";
import PP from "../assets/pp.png";

import { FaHome } from "react-icons/fa";
import Search from "./Search";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const [user, setUser] = React.useState(true);
  const { currentUser, logout } = useAuthContext();
  const [searchInput, setSearchInput] = React.useState("");

  function handleChange(event) {
    const { value } = event.target;
    setSearchInput(value);
  }
  console.log(searchInput);

  function signout() {
    if (!currentUser) return;

    logout();
  }
  return (
    <div className='container max-w-[1400px] py-2 mx-auto bg-white'>
      <nav className='nav-container flex justify-around '>
        <div className="nav-left flex items-center">
           <Link to='/' className='logo w-20  m-2 text-white hidden md:block'>
          <img src={Logo} alt='logo-img' />
           </Link>
          <Search searchHandler={handleChange} searchInput={searchInput} />

        </div>
        <div className='nav-links flex items-center'>
          <Link to={'/'} className="hidden md:block">
            <FaHome size={24} />
          </Link>
        </div>
        <div className='nav-right flex items-center'>
          <div className="profile circle w-[40px] min-w-[40px] h-[40px] rounded-full accent-color overflow-hidden mr-5">

            <img src={PP} alt="profile-img" className="w-full h-full" />
            
          </div>
          <Link 
            className='accent-color text-white font-bold py-2 px-4 rounded-full transition-all duration-300'
            to={`${currentUser ? '/login' : 'signup'}`} 
            onClick={() => signout()} 
          >
            {currentUser ? "Logout" : "Sign Up"}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
