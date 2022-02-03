import Footer from './Footer';
import Header from './Header';
import { ReactNode, useState } from 'react';
import Nav from './Nav';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [open, setOpen] = useState(true);
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <Header toggleSideNav={toggle} />
      <Nav open={open} toggle={toggle} />
      <main
        className={`mt-14 transition-all ease-in-out duration-500 sm:duration-700 z-20 ${
          open ? ' lg:ml-52' : ''
        }`}
      >
        {children}
      </main>
      <Footer open={open} toggle={toggle} />
    </>
  );
};

export default Layout;
