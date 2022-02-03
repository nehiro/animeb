import { ChevronUpIcon } from '@heroicons/react/outline';
import React from 'react';
import { SideMenuProps } from './Layout';

const Footer = ({ open, toggle }: SideMenuProps) => {
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
      className={`bg-yellow h-14 w-auto flex justify-center transition-all ease-in-out duration-500 sm:duration-700 z-20 ${
        open ? ' lg:ml-52' : ''
      }`}
    >
      <button onClick={returnTop}>
        <ChevronUpIcon className="h-6 w-6 mx-auto " />
      </button>
    </footer>
  );
};

export default Footer;
