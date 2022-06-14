import React, { ReactElement } from 'react';
import BackGroundGray from '../components/BackGroundGray';
import Breadcrumbs from '../components/Breadcrumbs';
import NoContents from '../components/NoContents';
import SubpageTitle from '../components/SubpageTitle';
import Layout from '../layouts/Layout';

const ReleaseDate = () => {
  return (
    <>
      <Breadcrumbs></Breadcrumbs>
      <BackGroundGray>
        <SubpageTitle>今期のアニメ</SubpageTitle>
        <NoContents></NoContents>
      </BackGroundGray>
    </>
  );
};

export default ReleaseDate;

ReleaseDate.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
