import React from "react";
import Logo from "../assets/logo.png";
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
