import { GetStaticPaths, GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import Layout from '../../../../layouts/Layout';
import * as path from 'path';
import * as fs from 'fs';
import { Anime } from '../../../../types/Anime';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import BackGroundGray from '../../../../components/BackGroundGray';
import SubpageTitle from '../../../../components/SubpageTitle';
import { RefreshIcon } from '@heroicons/react/outline';
import Card from '../../../../components/card/Card';
import NoContents from '../../../../components/NoContents';

type Props = {
  datas: Anime[];
  year: number;
  quarter: string;
};
const quarter = (props: Props) => {
  const animes = props.datas;
  // console.log(animes, 'animes');
  const year = props.year;

  const quarter = () => {
    const num = props.quarter;
    switch (num) {
      case '1':
        return '春';
      case '2':
        return '夏';
      case '3':
        return '秋';
      case '4':
        return '冬';
      default:
        break;
    }
  };

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
            href: 'animes/' + String(year),
          },
          {
            name: quarter() as string,
            href: 'animes/' + String(year) + quarter(),
          },
        ]}
      />
      <BackGroundGray>
        <SubpageTitle>
          {year}年{`${quarter()}`}放送・配信アニメ一覧
        </SubpageTitle>
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
    </>
  );
};

export default quarter;

type PathParams = {
  year: string;
  quarter: string;
};
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  return {
    paths: [
      { params: { year: '2022', quarter: `1` } },
      { params: { year: '2022', quarter: `2` } },
      { params: { year: '2022', quarter: `3` } },
      { params: { year: '2022', quarter: `4` } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { year, quarter } = context.params as PathParams;
  const jsonPath = path.join(process.cwd(), 'pages', 'api', 'db.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const animes = JSON.parse(jsonText).items as Anime[];
  const datas = animes.filter((anime) => {
    return anime.year === Number(year) && anime.quarter === Number(quarter);
  });
  return {
    props: { datas, year, quarter },
  };
};
quarter.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
