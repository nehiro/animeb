import React, { ReactElement } from 'react';
import BackGroundGray from '../components/BackGroundGray';
import Breadcrumbs from '../components/Breadcrumbs';
import NoContents from '../components/NoContents';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';

const About = () => {
  return (
    <>
      <Breadcrumbs></Breadcrumbs>
      <BackGroundGray>
        <SubpageTitle>アニメ部！について</SubpageTitle>
        <NoContents></NoContents>
      </BackGroundGray>
    </>
  );
};

export default About;
About.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
