import React, { ReactElement } from 'react';
import BackGroundGray from '../components/BackGroundGray';
import Breadcrumbs from '../components/Breadcrumbs';
import NoContents from '../components/NoContents';
import SubpageTitle from '../components/SubpageTitle';
import Layout from '../layouts/Layout';

const Trend = () => {
  return (
    <>
      <Breadcrumbs></Breadcrumbs>
      <BackGroundGray>
        <SubpageTitle>注目のアニメ</SubpageTitle>
        <NoContents></NoContents>
      </BackGroundGray>
    </>
  );
};

export default Trend;

Trend.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
