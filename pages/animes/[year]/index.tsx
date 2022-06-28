import { GetStaticPaths, GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import Layout from '../../../layouts/Layout';
import * as path from 'path';
import * as fs from 'fs';
import { Anime } from '../../../types/Anime';
import Link from 'next/link';
import Card from '../../../components/card/Card';
import { RefreshIcon } from '@heroicons/react/outline';
import Breadcrumbs from '../../../components/Breadcrumbs';
import BackGroundGray from '../../../components/BackGroundGray';
import SubpageTitle from '../../../components/SubpageTitle';
import NoContents from '../../../components/NoContents';

type Props = {
  datas: Anime[];
  year: number;
};
const year = (props: Props) => {
  // console.log(props);
  const animes = props.datas;
  const year = props.year;
  // console.log(animes);
  return (
    <>
      <Breadcrumbs
        pages={[
          {
            name: '放送・配信時期',
            href: 'animes',
          },
          {
            name: String(year) + '年アニメ',
          },
        ]}
      />
      <BackGroundGray>
        <SubpageTitle>{year}年放送・配信アニメ一覧</SubpageTitle>
        {animes.length ? (
          <ul className="mb-8 grid grid-cols-3 justify-items-center gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {animes.map((anime) => (
              <li
                key={anime.title}
                className="flex w-full flex-col justify-between"
              >
                <Card anime={anime}></Card>
              </li>
            ))}
          </ul>
        ) : (
          <NoContents></NoContents>
        )}
      </BackGroundGray>
      <Breadcrumbs
        pages={[
          {
            name: '放送・配信時期',
            href: 'animes',
          },
          {
            name: String(year) + '年アニメ',
          },
        ]}
      />
    </>
  );
};

export default year;
type PathParams = {
  year: string;
};
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  // const paths = years.map((year) => `/animes/${year}`);
  // console.log(paths, 'paths');
  return {
    paths: [
      { params: { year: '2023' } },
      { params: { year: '2022' } },
      { params: { year: '2021' } },
      { params: { year: '2020' } },
      { params: { year: '2019' } },
      { params: { year: '2018' } },
    ],
    fallback: false,
  };
};

year.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export const getStaticProps: GetStaticProps = async (context) => {
  const year = Number(context.params?.year);
  // console.log(typeof year);
  // console.log(context.params?.year);
  const jsonPath = path.join(process.cwd(), 'pages', 'api', 'db.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const animes = JSON.parse(jsonText).items as Anime[];
  // console.log(animes, 'animes');
  const datas = animes.filter((anime) => {
    // console.log(anime);
    return anime.year === year;
  });
  // console.log(datas, 'datas');
  return {
    props: { datas, year },
  };
};
