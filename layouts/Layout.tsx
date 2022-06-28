import Footer from './Footer';
import Header from './Header';
import { ReactNode, useEffect, useState } from 'react';
import Nav from './Nav';
import { useWindowSize } from '../lib/useWindowSize';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [width, height] = useWindowSize();

  const [open, setOpen] = useState<boolean>(true);
  useEffect(() => {
    if (width < 1024) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [width]);

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <Header toggleSideNav={toggle} />
      {width ? <Nav open={open} toggle={toggle} /> : null}
      <main
        className={`z-20 mt-14 transition-all duration-500 ease-in-out sm:duration-700 ${
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
