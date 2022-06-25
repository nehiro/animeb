import { ChevronUpIcon } from '@heroicons/react/outline';
import React from 'react';
import { SideMenu } from '../types/SideMenu';

const Footer = ({ open, toggle }: SideMenu) => {
  // console.log(open);
  // console.log(toggle);
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      className={`z-20 flex h-14 w-auto justify-center bg-yellow transition-all duration-500 ease-in-out sm:duration-700 ${
        open ? ' lg:ml-52' : ''
      }`}
    >
      <button onClick={returnTop}>
        <ChevronUpIcon className="mx-auto h-6 w-6 " />
      </button>
    </footer>
  );
};

export default Footer;
