import { BookmarkIcon, EyeIcon, StarIcon } from '@heroicons/react/solid';
import { ChatAltIcon, HashtagIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import AnimeTag from '../../components/AnimeTag';
import BackGroundGray from '../../components/BackGroundGray';
import BackGroundWhite from '../../components/BackGroundWhite';
import Breadcrumbs from '../../components/Breadcrumbs';
import StreamingService from '../../components/StreamingService';
import AnimeReview from '../../components/AnimeReview';
import AnotherAnime from '../../components/card/AnotherAnime';
import Button from '../../components/Button';
import Layout from '../../layouts/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useAnime } from '../../utils/animeContext';
import Link from 'next/link';
import * as path from 'path';
import * as fs from 'fs';
import { Anime } from '../../types/Anime';

type AnimeName = {
  name: string;
};

const AnimeWork = (animeTitle: AnimeName) => {
  const { animes } = useAnime();
  const animeInfoArray = animes?.filter(
    (anime) => anime.title === animeTitle.name
  );
  const animeInfo = animeInfoArray?.find(
    (item) => item.title === animeTitle.name
  );
  const quarter = () => {
    const num = animeInfo?.quarter;
    switch (num) {
      case 1:
        return '春';
      case 2:
        return '夏';
      case 3:
        return '秋';
      case 4:
        return '冬';
      default:
        break;
    }
  };

  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const div = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  console.log(height, 'height');
  console.log(width, 'width');

  return (
    <>
      <Breadcrumbs />
      <BackGroundWhite>
        <div className="block md:hidden">
          <h1 className="text-lg font-bold">僕のヒーローアカデミア</h1>
          <div className="mb-1">放送時期:　2021年　春アニメ</div>
        </div>
        <div className="flex justify-start">
          <div className="mr-4 min-w-200 max-w-242">
            <div className="mb-2" ref={div}>
              <Image
                src={
                  'https://raw.githubusercontent.com/nehiro/animeb-public/main/images/' +
                  `${animeInfo?.title}` +
                  '.jpg'
                }
                height={338}
                width={242}
                alt=""
              />
            </div>
            <div className="grid grid-cols-2 items-center justify-items-center gap-2">
              <div className="w-full">
                <Link href="/">
                  <a className="bg-watch inline-block h-full w-full bg-yellow bg-no-repeat py-1 text-center">
                    <EyeIcon className="mx-auto h-5 w-5" />
                    <span className="inline-block h-full w-full">100</span>
                  </a>
                </Link>
              </div>
              <div className="w-full">
                <Link href="/">
                  <a className="bg-bookMark inline-block h-full w-full bg-yellow bg-no-repeat py-1 text-center">
                    <BookmarkIcon className="mx-auto h-5 w-5" />
                    <span className="inline-block h-full w-full">100</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h1 className="mb-4 hidden text-lg font-bold md:block">
              {animeInfo?.title}
            </h1>
            <div className="mb-1 hidden md:block">
              放送時期:　{`${animeInfo?.year}年`}　{`${quarter()}アニメ`}
            </div>
            <div className="mb-3 flex flex-wrap items-center justify-items-start">
              <ul className="mr-4 flex items-center">
                <li>
                  <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                </li>
                <li>
                  <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                </li>
                <li>
                  <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                </li>
                <li>
                  <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                </li>
                <li>
                  <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                </li>
              </ul>
              <div className="mr-8 text-2xl text-yellow">5.0</div>
              <ul className="flex flex-wrap items-center justify-start">
                <li className="mr-3">
                  物語<span className="ml-1">5.0</span>
                </li>
                <li className="mr-3">
                  作画<span className="ml-1">5.0</span>
                </li>
                <li className="mr-3">
                  声優<span className="ml-1">5.0</span>
                </li>
                <li className="mr-3">
                  音楽<span className="ml-1">5.0</span>
                </li>
                <li>
                  キャラ<span>5.0</span>
                </li>
              </ul>
            </div>
            <div className="mb-3 flex flex-wrap items-center justify-between">
              <div>
                <h3 className="mb-2 font-bold">公式サイト</h3>
                <ul>
                  <li>{animeInfo?.url}</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-bold">制作会社</h3>
                <ul>
                  <li>社名</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-bold">監督</h3>
                <ul>
                  <li>氏名</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-bold">シリーズ構成</h3>
                <ul>
                  <li>氏名</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-bold">キャラクターデザイン</h3>
                <ul>
                  <li>氏名</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-bold">キャスト</h3>
              <ul className="flex flex-wrap items-center justify-between">
                <li>氏名</li>
                <li>氏名</li>
                <li>氏名</li>
                <li>氏名</li>
                <li>氏名</li>
                <li>氏名</li>
              </ul>
            </div>
          </div>
        </div>
      </BackGroundWhite>
      <BackGroundGray>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          あらすじ
        </h2>
        <p>{animeInfo?.summary}</p>
      </BackGroundGray>
      <BackGroundWhite>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          視聴可能な動画配信サービス
        </h2>
        <StreamingService />
      </BackGroundWhite>
      <BackGroundGray>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          <HashtagIcon className="mr-2 h-5 w-5" />
          「僕のヒーローアカデミア」によく使用されているタグ
        </h2>
        <AnimeTag />
      </BackGroundGray>
      <BackGroundWhite>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          <ChatAltIcon className="mr-2 h-5 w-5" />
          「僕のヒーローアカデミア」に投稿された感想・評価
        </h2>
        <AnimeReview />
      </BackGroundWhite>
      <BackGroundGray>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          2021年春アニメの他作品
        </h2>
        <AnotherAnime />
        <Button>もっと見る</Button>
      </BackGroundGray>
    </>
  );
};

export default AnimeWork;

type Paths = { paths: [] };

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  //fetchでJSON読み込む または
  // JSON ファイルを読み込む
  const jsonPath = path.join(process.cwd(), 'pages', 'api', 'db.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const animes = JSON.parse(jsonText).items as Anime[];
  // console.log(animes, 'animes');
  const paths = animes.map((item) => `/animes/${encodeURI(item.title)}`);
  // console.log(paths, 'paths');
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log(params, 'params');
  // console.log(params?.anime, 'params');
  const animeTitle = { name: params?.anime };
  // console.log(animeTitle, 'animeTitle');
  return {
    props: animeTitle,
  };
};

AnimeWork.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
