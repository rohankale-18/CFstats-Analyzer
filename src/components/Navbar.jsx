import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

export const Navbar = () => {
  return (
      <div className='bg-navbar p-3 grid grid-cols-2 min-w-screen'>
          <div className='flex items-center'>
              Logo
          </div>
          {/* <div className='border border-black flex justify-center items-center'>
              
          </div > */}
          <div className='flex justify-end items-center'> 
            <a href='https://github.com/rohankale-18' target='_blank' rel='noopener noreferrer'>
                <AiFillGithub className='text-4xl ml-1.5 mr-1.5 ' />
            </a>
            <a href='https://www.linkedin.com/in/rohan-kale-rk61003/' target='_blank' rel='noopener noreferrer'>
                <AiFillLinkedin className='text-4xl ml-1.5 mr-1.5' />
            </a>
          </div>
      
    </div>
  );
};
