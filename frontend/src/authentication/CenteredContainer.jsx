import React from 'react'

const CenteredContainer = ({ children }) => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col'>
        { children }
    </div>
  )
}

export default CenteredContainer