import React from 'react'

const MyModal = ({ children }) => {
  return (
    <div className='fixed inset-0 bg-white md:flex justify-center z-40 overflow-y-scroll md:overflow-hidden'>
        { children }
    </div>
  )
}

export default MyModal