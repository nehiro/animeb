import { BookmarkIcon, EyeIcon, StarIcon } from '@heroicons/react/solid';
import { ChatAltIcon, HashtagIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/Link';
import React, { ReactElement } from 'react';
import AnimeTag from '../components/AnimeTag';
import BackGroundGray from '../components/BackGroundGray';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import StreamingService from '../components/StreamingService';
import AnimeReview from '../components/AnimeReview';
import AnotherAnime from '../components/card/AnotherAnime';
import Button from '../components/Button';
import Layout from '../layouts/Layout';

const Anime = () => {
  return (
    <>
      <Breadcrumbs />
      <BackGroundWhite>
        <div className="block md:hidden">
          <h1 className="text-lg font-bold">僕のヒーローアカデミア</h1>
          <div className="mb-1">放送時期:　2021年　春アニメ</div>
        </div>
        <div className="flex justify-start">
          <div className="min-w-200 max-w-242 mr-4">
            <div className="mb-2">
              <Link href="/">
                <a className="block leading-none">
                  <Image
                    src="/images/hiroaka.png"
                    height={338}
                    width={242}
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 justify-items-center items-center">
              <div className="w-full">
                <Link href="/">
                  <a className="bg-watch bg-no-repeat h-full w-full inline-block text-center bg-yellow py-1">
                    <EyeIcon className="h-5 w-5 mx-auto" />
                    <span className="inline-block w-full h-full">100</span>
                  </a>
                </Link>
              </div>
              <div className="w-full">
                <Link href="/">
                  <a className="bg-bookMark bg-no-repeat h-full w-full inline-block text-center bg-yellow py-1">
                    <BookmarkIcon className="h-5 w-5 mx-auto" />
                    <span className="inline-block w-full h-full">100</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold mb-4 hidden md:block">
              僕のヒーローアカデミア
            </h1>
            <div className="mb-1 hidden md:block">
              放送時期:　2021年　春アニメ
            </div>
            <div className="flex items-center mb-3 flex-wrap justify-items-start">
              <ul className="flex items-center mr-4">
                <li>
                  <StarIcon className="h-5 w-5 mx-auto text-yellow" />
                </li>
                <li>
                  <StarIcon className="h-5 w-5 mx-auto text-yellow" />
                </li>
                <li>
                  <StarIcon className="h-5 w-5 mx-auto text-yellow" />
                </li>
                <li>
                  <StarIcon className="h-5 w-5 mx-auto text-yellow" />
                </li>
                <li>
                  <StarIcon className="h-5 w-5 mx-auto text-yellow" />
                </li>
              </ul>
              <div className="text-yellow text-2xl mr-8">5.0</div>
              <ul className="flex items-center justify-start flex-wrap">
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
            {/* <div className="mb-3">
              <h3 className="font-bold mb-2">あらすじ</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime illo dolore molestias! Quasi animi praesentium assumenda architecto aut unde dolore? Harum praesentium minima ipsam veritatis molestias iste ea natus deserunt.</p>
            </div> */}
            <div className="flex items-center mb-3 justify-between flex-wrap">
              <div>
                <h3 className="font-bold mb-2">制作会社</h3>
                <ul>
                  <li>社名</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">公式サイト</h3>
                <ul>
                  <li>aaaa.jp/</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">監督</h3>
                <ul>
                  <li>氏名</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">シリーズ構成</h3>
                <ul>
                  <li>氏名</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">キャラクターデザイン</h3>
                <ul>
                  <li>氏名</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">キャスト</h3>
              <ul className="flex items-center justify-between flex-wrap">
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
        <h2 className="text-xl font-bold mb-8 flex items-center justify-center">
          あらすじ
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime illo
          dolore molestias! Quasi animi praesentium assumenda architecto aut
          unde dolore? Harum praesentium minima ipsam veritatis molestias iste
          ea natus deserunt.
        </p>
      </BackGroundGray>
      <BackGroundWhite>
        <h2 className="text-xl font-bold mb-8 flex items-center justify-center">
          視聴可能な動画配信サービス
        </h2>
        <StreamingService />
      </BackGroundWhite>
      <BackGroundGray>
        <h2 className="text-xl font-bold mb-8 flex items-center justify-center">
          <HashtagIcon className="h-5 w-5 mr-2" />
          「僕のヒーローアカデミア」によく使用されているタグ
        </h2>
        <AnimeTag />
      </BackGroundGray>
      <BackGroundWhite>
        <h2 className="text-xl font-bold mb-8 flex items-center justify-center">
          <ChatAltIcon className="h-5 w-5 mr-2" />
          「僕のヒーローアカデミア」に投稿された感想・評価
        </h2>
        <AnimeReview />
      </BackGroundWhite>
      <BackGroundGray>
        <h2 className="text-xl font-bold mb-8 flex items-center justify-center">
          2021年春アニメの他作品
        </h2>
        <AnotherAnime />
        <Button>もっと見る</Button>
      </BackGroundGray>
    </>
  );
};

export default Anime;
Anime.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
