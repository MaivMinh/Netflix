import React from 'react'
import axios from 'axios'

const Account = () => {
  return (
    <div className='absolute sm:mt-[120px] mt-[150px]'>
      <button className='text-3xl text-red-500' onClick={handleClick}>Get Accounts</button>  
    </div>
  )
}

export default Account