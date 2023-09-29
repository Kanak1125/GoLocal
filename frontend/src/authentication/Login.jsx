import React from 'react'
import CenteredContainer from './CenteredContainer'

const Login = () => {
  return (
    <CenteredContainer>
      <form className='border-2 border-white-400 rounded flex flex-col px-4 py-5 w-[80%] md:max-w-[444px]'>
        <h2 className='text-3xl font-medium text-center my-2'>Log In</h2>
        <label htmlFor="email" className='mt-5 mb-2'>Email: </label>
        <input type="email" className='border-2 border-white-400 rounded outline-none px-2 py-1'/>
        <label htmlFor="password" className='mt-5 mb-2'>Password: </label>
        <input type="password" className='border-2 border-white-400 rounded outline-none px-2 py-1'/>
        <input type="button" value="Log in" className='accent-color text-white rounded text-sm py-2 my-5 cursor-pointer'/>
        <a href="/forgot-password" className='text-center text-sm accent-text-color'>Forgot Password?</a>
      </form>
      <div>Need an account? <a href="/signup" className='accent-text-color'>Sign Up</a></div>
    </CenteredContainer>
  )
}

export default Login