import React from 'react';

const LoadingItem = () => {
  return (
    <li className='w-full mb-12 transition-all duration-[400ms]'>
      <div className='relative w-full aspect-[2/3] bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide rounded-lg'></div>
      <span className='inline-block w-full h-[24px] mt-2 bg-gradient-to-r from-gray-800 from-[20%] via-gray-500 via-[50%] to-gray-800 to-[80%] bg-size-200 animate-slide rounded-lg'></span>
    </li>
  )
}

export default LoadingItem;
