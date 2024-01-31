import React from 'react'
import { useParams } from 'react-router-dom'

const PlayMovie = () => {
  const params = useParams();
  const id = params.movieID;
  console.log(id);
  return (
    <div className='text-white'>
      
    </div>
  )
}

export default PlayMovie