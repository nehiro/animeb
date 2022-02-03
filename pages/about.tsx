import React, { ReactElement } from 'react';
import LayoutNoNav from '../layouts/LayoutNoNav';

const About = () => {
  return <div></div>;
};

export default About;
About.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
