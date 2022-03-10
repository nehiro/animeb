import Footer from './Footer';
import Header from './Header';
import { ReactNode, useState } from 'react';
import Nav from './Nav';

type Props = {
  children: ReactNode;
};

const LayoutNoNav = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <Header toggleSideNav={toggle} />
      <Nav open={open} toggle={toggle} />
      <main
        className={`mt-14 transition-all duration-500 ease-in-out sm:duration-700 ${
          open ? ' ml-52' : ''
        }`}
      >
        {children}
      </main>
      <Footer open={open} toggle={toggle} />
    </>
  );
};

export default LayoutNoNav;
