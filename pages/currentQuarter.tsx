import { RefreshIcon } from '@heroicons/react/outline';
import React, { ReactElement } from 'react';
import BackGroundGray from '../components/BackGroundGray';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import Card from '../components/card/Card';
import NoContents from '../components/NoContents';
import SubpageTitle from '../components/SubpageTitle';
import Layout from '../layouts/Layout';
import { useAnime } from '../utils/animeContext';

const currentQuarter = () => {
  const { animes } = useAnime();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const quarter = () => {
    switch (month) {
      case 1:
        return 4;
      case 2:
        return 4;
      case 3:
        return 4;
      case 4:
        return 1;
      case 5:
        return 1;
      case 6:
        return 1;
      case 7:
        return 2;
      case 8:
        return 2;
      case 9:
        return 2;
      case 10:
        return 3;
      case 11:
        return 3;
      case 12:
        return 3;
      default:
        console.log(`Sorry, we are out of ${month}.`);
    }
  };

  return (
    <>
      <Breadcrumbs
        pages={[
          {
            name: '今期のアニメ',
          },
        ]}
      />
      <BackGroundGray>
        <SubpageTitle>今期のアニメ</SubpageTitle>
        {animes ? (
          <ul className="mb-8 grid grid-cols-3 justify-items-center gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {animes
              ?.filter(
                (anime) => anime.year === year && anime.quarter === quarter()
              )
              .map((anime) => (
                <li
                  key={anime.title}
                  className="flex w-full flex-col justify-between"
                >
                  <Card anime={anime}></Card>
                </li>
              ))}
          </ul>
        ) : (
          <p className="flex justify-center">
            <RefreshIcon className="w-10 animate-spin text-gray-700" />
          </p>
        )}
      </BackGroundGray>
      <BackGroundWhite>
        <SubpageTitle>再放送</SubpageTitle>
        {animes ? (
          <ul className="mb-8 grid grid-cols-3 justify-items-center gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {animes
              ?.filter(
                (anime) =>
                  anime.doing === true &&
                  anime.media === 'tv' &&
                  anime.year !== year
              )
              .map((anime) => (
                <li
                  key={anime.title}
                  className="flex w-full flex-col justify-between"
                >
                  <Card anime={anime}></Card>
                </li>
              ))}
          </ul>
        ) : (
          <p className="flex justify-center">
            <RefreshIcon className="w-10 animate-spin text-gray-700" />
          </p>
        )}
      </BackGroundWhite>
      <Breadcrumbs
        pages={[
          {
            name: '今期のアニメ',
          },
        ]}
      />
    </>
  );
};

export default currentQuarter;

currentQuarter.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
