import React, { ReactElement } from 'react';
import BackGroundGray from '../components/BackGroundGray';
import Breadcrumbs from '../components/Breadcrumbs';
import NoContents from '../components/NoContents';
import SubpageTitle from '../components/SubpageTitle';
import Layout from '../layouts/Layout';

const Film = () => {
  return (
    <>
      <Breadcrumbs
        pages={[
          {
            name: 'アニメ映画',
          },
        ]}
      />
      <BackGroundGray>
        <SubpageTitle>アニメ映画</SubpageTitle>
        <NoContents></NoContents>
      </BackGroundGray>
      <Breadcrumbs
        pages={[
          {
            name: 'アニメ映画',
          },
        ]}
      />
    </>
  );
};

export default Film;
Film.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
