import { MenuAlt1Icon } from '@heroicons/react/solid';
import React, { useState } from 'react';

const ToggleButton = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prevState) => !prevState);
    // console.log(open);
  };
  return (
    <button className="mr-3" onClick={toggle}>
      <MenuAlt1Icon className="h-6 w-6" />
      {open ? 'OPEN' : 'CLOSE'}
    </button>
  );
};

export default ToggleButton;
