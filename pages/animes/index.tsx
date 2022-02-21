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

const Index = ({ paths }: { paths: Anime[] }) => {
  //アニメ管理
  const { animes } = useAnime();
  // console.log(animes, 'animes');
  // console.log(animes, 'anime.items');

  const animesMap = animes?.map((item) => (
    <li key={item.title}>
      <Link href={`/animes/${encodeURI(item.title)}`}>
        <a>{item.title}</a>
      </Link>
    </li>
  ));
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark-dimmed.min.css"
        ></link>
      </Head>
      <ul>{animesMap}</ul>
    </>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const jsonPath = path.join(process.cwd(), 'pages', 'api', 'db.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const animes = JSON.parse(jsonText).items as Anime[];
  // console.log(animes, 'animes');
  const paths = animes.map((path) => {
    return { slug: path.title };
  });
  console.log(paths, 'paths');
  return {
    props: { paths },
  };
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
