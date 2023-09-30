import React, { useRef } from 'react'
import CenteredContainer from './CenteredContainer'
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { login, error } = useAuthContext();
  const navigate = useNavigate();

  async function handleForm(e) {
    e.preventDefault();
    
    login(usernameRef.current.value, passwordRef.current.value);

    if (error === "") {
      return navigate('/login');
    } else {
      return navigate('/');
    }
  }

  return (
    <CenteredContainer>
      <form 
        className='border-2 border-white-400 rounded flex flex-col px-4 py-5 w-[80%] md:max-w-[444px]'
        onSubmit={(e) => handleForm(e)}  
      >
        {error && <p>{error}</p>}
        <h2 className='text-3xl font-medium text-center my-2'>Log In</h2>
        <label htmlFor="username" className='mt-5 mb-2'>Username: </label>
        <input 
          type="text" 
          className='border-2 border-white-400 rounded outline-none px-2 py-1'
          ref={usernameRef}
          required
        />
        <label htmlFor="password" className='mt-5 mb-2'>Password: </label>
        <input 
          type="password" 
          className='border-2 border-white-400 rounded outline-none px-2 py-1'
          ref={passwordRef}  
          required
        />
        <input type="submit" value="Log in" className='accent-color text-white rounded text-sm py-2 my-5 cursor-pointer'/>
        <a href="/forgot-password" className='text-center text-sm accent-text-color'>Forgot Password?</a>
      </form>
      <div>Need an account? <a href="/signup" className='accent-text-color'>Sign Up</a></div>
    </CenteredContainer>
  )
}

export default Login