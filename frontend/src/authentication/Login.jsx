import React from 'react'

const Login = () => {
  return (
    <>
      <form className='border-2 border-white-400 rounded flex flex-col px-4 py-5 my-4 w-[80%] md:max-w-[444px]'>
        <h2 className='text-3xl font-medium text-center my-2'>Log In</h2>
        <label htmlFor="email" className='mt-5 mb-2'>Email: </label>
        <input type="email" className='border-2 border-white-400 rounded outline-none px-2 py-1'/>
        <label htmlFor="password" className='mt-5 mb-2'>Password: </label>
        <input type="password" className='border-2 border-white-400 rounded outline-none px-2 py-1'/>
        <input type="button" value="Log in" className='bg-amber-600 text-white rounded text-sm py-2 my-5 cursor-pointer'/>
        <a href="" className='text-center text-sm text-amber-600'>Forgot Password?</a>
      </form>
      <div>Need an account? <a href="" className='text-amber-600'>Sign Up</a></div>
    </>
  )
}

export default Login