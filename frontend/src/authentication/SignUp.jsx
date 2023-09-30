import {useState, useRef } from 'react'
import CenteredContainer from './CenteredContainer';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const userNameRef = useRef();
    const [error, setError] = useState();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

       if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        setError("Passwords doesn't match");
        return;
       }

       axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/user-create/',
        data: {
          username: userNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          first_name: firstNameRef.current.value,
          last_name: lastNameRef.current.value,
        }
       })
       .then(() => {
        console.log("Signup successful");
        navigate("/login");
       })
       .catch((err) => console.log(`Error: ${err}`));
    }
  return (
    <CenteredContainer>
      <form className='border-2 border-white-400 rounded flex flex-col px-4 py-5 my-4 w-[80%] md:max-w-[444px]' onSubmit={(e) => handleSubmit(e)}>
        {error && <Alert variant='danger'>{error}</Alert>}
        <h2 className='text-3xl font-medium text-center my-2'>Sign Up</h2>
        <div className='md:flex md:gap-2'>
          <div className='flex flex-col'>  
            <label htmlFor="firstName" className='mt-5 mb-2'>First Name: </label>
            <input 
              type="text" 
              id='firstName'
              className='border-2 border-white-400 rounded outline-none px-2 py-1'
              ref={firstNameRef}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="lastName" className='mt-5 mb-2'>Last Name: </label>
            <input 
              type="text" 
              id='lastName'
              className='border-2 border-white-400 rounded outline-none px-2 py-1'
              ref={lastNameRef}
              required
            />
          </div>
        </div>
        <label htmlFor="userName" className='mt-3 mb-2'>Username: </label>
        <input 
          type="text" 
          id='userName'
          className='border-2 border-white-400 rounded outline-none px-2 py-1'
          ref={userNameRef}
          required
        />
        <label htmlFor="email" className='mt-5 mb-2'>Email: </label>
        <input 
          type="email" 
          id='email'
          className='border-2 border-white-400 rounded outline-none px-2 py-1'
          ref={emailRef}
          required
        />
        <label htmlFor="password" className='mt-5 mb-2'>Password: </label>
        <input 
          type="password"
          id='password'
          className='border-2 border-white-400 rounded outline-none px-2 py-1' 
          ref={passwordRef}
          required
        />
        <label htmlFor="confirmPassword" className='mt-5 mb-2'>Confirm Password: </label>
        <input 
          type="password" 
          id='confirmPassword'
          className='border-2 border-white-400 rounded outline-none px-2 py-1' 
          ref={confirmPasswordRef}
          required
        />
        <input type="submit" value="Sign Up" className='accent-color text-white rounded text-sm py-2 my-5 cursor-pointer'/>
        <a href="/forgot-password" className='text-center text-sm accent-text-color'>Forgot Password?</a>
      </form>
      <div>Already has an account? <a href="/login" className='accent-text-color'>Log In</a></div>
    </CenteredContainer>
  )
}

export default Signup