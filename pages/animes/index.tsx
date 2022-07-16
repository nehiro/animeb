import Head from 'next/head';
import React, { ReactElement } from 'react';
import { adminDB } from '../../firebase/server';
import Layout from '../../layouts/Layout';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { News } from '../../types/News';
import * as path from 'path';
import * as fs from 'fs';
import { Anime } from '../../types/Anime';
import { useAnime } from '../../utils/animeContext';
import Breadcrumbs from '../../components/Breadcrumbs';
import BackGroundGray from '../../components/BackGroundGray';
import SubpageTitle from '../../components/SubpageTitle';

const Index = ({ paths }: { paths: Anime[] }) => {
  //アニメ管理
  const { animes } = useAnime();
  // console.log(animes, 'animes');
  // console.log(animes, 'anime.items');
  const contents = [
    {
      year: '2008',
      quarter1: '春アニメ',
      // quarter2: '夏アニメ',
      // quarter3: '秋アニメ',
      // quarter4: '冬アニメ',
    },
    {
      year: '2017',
      // quarter1: '春アニメ',
      // quarter2: '夏アニメ',
      // quarter3: '秋アニメ',
      quarter4: '冬アニメ',
    },
    {
      year: '2019',
      // quarter1: '春アニメ',
      // quarter2: '夏アニメ',
      quarter3: '秋アニメ',
      quarter4: '冬アニメ',
    },
    {
      year: '2020',
      // quarter1: '春アニメ',
      quarter2: '夏アニメ',
      quarter3: '秋アニメ',
      // quarter4: '冬アニメ',
    },
    {
      year: '2021',
      // quarter1: '春アニメ',
      // quarter2: '夏アニメ',
      quarter3: '秋アニメ',
      quarter4: '冬アニメ',
    },
    {
      year: '2022',
      quarter1: '春アニメ',
      quarter2: '夏アニメ',
      quarter3: '秋アニメ',
      quarter4: '冬アニメ',
    },
  ];
  return (
    <>
      <Breadcrumbs
        pages={[
          {
            name: '放送・配信時期',
          },
        ]}
      />
      <BackGroundGray>
        <SubpageTitle>放送・配信時期</SubpageTitle>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="-mx-4 mt-8 overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0">
            <table className="min-w-full divide-y divide-gray-300">
              <tbody className="divide-y divide-gray-200 bg-white">
                {contents.map((content) => (
                  <tr
                    key={content.year}
                    className="grid grid-cols-5 items-center py-4 text-center"
                  >
                    <td className="text-sm font-medium text-gray-900">
                      <Link href={`/animes/${content.year}`}>
                        <a>{content.year}</a>
                      </Link>
                    </td>
                    <td className="text-xs text-gray-500 sm:text-sm">
                      <Link href={`/animes/${content.year}/4`}>
                        <a>{content.quarter4}</a>
                      </Link>
                    </td>
                    <td className="text-xs text-gray-500 sm:text-sm">
                      <Link href={`/animes/${content.year}/1`}>
                        <a>{content.quarter1}</a>
                      </Link>
                    </td>
                    <td className="text-xs text-gray-500 sm:text-sm">
                      <Link href={`/animes/${content.year}/2`}>
                        <a>{content.quarter2}</a>
                      </Link>
                    </td>
                    <td className="text-xs text-gray-500 sm:text-sm">
                      <Link href={`/animes/${content.year}/3`}>
                        <a>{content.quarter3}</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </BackGroundGray>
      <Breadcrumbs
        pages={[
          {
            name: '放送・配信時期',
          },
        ]}
      />
    </>
  );
};

export default Index;

// export const getStaticProps: GetStaticProps = async () => {
//   const jsonPath = path.join(process.cwd(), 'pages', 'api', 'db.json');
//   const jsonText = fs.readFileSync(jsonPath, 'utf-8');
//   const animes = JSON.parse(jsonText).items as Anime[];
//   // console.log(animes, 'animes');
//   const paths = animes.map((path) => {
//     return { slug: path.title };
//   });
//   // console.log(paths, 'paths');
//   return {
//     props: { paths },
//   };
// };

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
