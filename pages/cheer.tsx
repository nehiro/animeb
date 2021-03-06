import { NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import CheerCheeredList from '../components/CheerCheeredList';
import CheerProductList from '../components/CheerProductList';
import SubpageTitle from '../components/SubpageTitle';
import Layout from '../layouts/Layout';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { useAuth } from '../utils/userContext';

const cheer = () => {
  const { user } = useAuth();
  return (
    <>
      <NextSeo noindex={true} />
      <Breadcrumbs
        pages={[
          {
            name: '応援する',
          },
        ]}
      />
      <BackGroundWhite>
        <SubpageTitle>応援する</SubpageTitle>
        {user && <CheerProductList />}
        {user && <CheerCheeredList />}
      </BackGroundWhite>
      <Breadcrumbs
        pages={[
          {
            name: '応援する',
          },
        ]}
      />
    </>
  );
};

export default cheer;
cheer.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
