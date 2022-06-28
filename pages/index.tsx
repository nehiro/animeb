import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import Image from 'next/image';
import React, { ReactElement, useEffect } from 'react';
import BackGroundGray from '../components/BackGroundGray';
import Button from '../components/Button';
import Card from '../components/card/Card';
import TopTitle from '../components/TopTitle';
import Layout from '../layouts/Layout';
import { useAnime } from '../utils/animeContext';
import { db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';
import useSWR from 'swr';
import { User } from '../types/User';
import { useMediaQuery } from 'react-responsive';
import Timeline from '../components/Timeline';
import UserItem from '../components/UserItem';
import Profile from '../components/Profile';
import Link from 'next/link';
import { RefreshIcon } from '@heroicons/react/outline';
import { Anime, JsonAnime } from '../types/Anime';
import { userReviews } from '../lib/getReviews';
import BackGroundWhite from '../components/BackGroundWhite';
import LatestReview from '../components/LatestReview';
import useSWRInfinite from 'swr/infinite';
import { Site } from '../lib/site';

const Home = () => {
  //アニメ管理
  const { animes } = useAnime();
  // console.log(animes, 'animes');
  // console.log(animes, 'anime.items');

  // const animesMap = animes?.map((item) => (
  //   <li key={item.title}>
  //     <Link href={encodeURI('animes/' + `${item.title}`)}>
  //       <a>{item.title}</a>
  //     </Link>
  //   </li>
  // ));
  // console.log(animesMap, 'animesMap');

  // followとuser管理
  const { user, loading, reviews, lists } = useAuth();

  // console.log(lists, 'lists');
  // console.log(typeof lists, 'type');
  // console.log(reviews, 'reviews');
  // console.log(user, 'user');

  // console.log(Site().origin, 'Site().origin');

  const { data: users } = useSWR('users', async () => {
    const ref = collection(db, 'users');
    const q = query(ref, where('createdAt', '>', 1));
    const snap = await getDocs(q);
    return snap.docs.map((doc) => doc.data() as User);
  });

  const isBigScreen = useMediaQuery({ query: '(min-width: 640px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 639px)' });

  //もっと見る
  const limit = 20;
  const getKey = (pageIndex: number, previousPageData: JsonAnime[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${Site().origin}/api/animes?limit=${limit}&page=${pageIndex + 1}`;
  };
  const { data, size, setSize } = useSWRInfinite(
    getKey,
    (url) =>
      fetch(url, {
        method: 'GET',
      }).then((r) => r.json()),
    {
      initialSize: 1,
    }
  );
  if (!data) return 'loading';
  const newData: JsonAnime[] = data.flat();
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  if (loading) return null;
  // console.log(loading, 'loading');

  // if (!user) {
  //   return null;
  // }

  return (
    <>
      <section className="relative h-0 w-full bg-hero_sp bg-cover bg-center bg-no-repeat pt-50% sm:bg-hero_pc sm:pt-30%">
        <p className="absolute top-1/2 left-8 -translate-y-1/2 rounded-full bg-purple drop-shadow-md sm:left-1/4">
          <Link href="/about">
            <a className="flex items-center justify-center px-4 py-3 sm:px-6 sm:py-3">
              {isBigScreen && (
                <Image
                  src="/images/logo-text.png"
                  width="125"
                  height="25.641 "
                  alt=""
                />
              )}
              {isSmallScreen && (
                <Image
                  src="/images/logo-text.png"
                  width="100"
                  height="20.5128 "
                  alt=""
                />
              )}
              <span className="ml-2 sm:ml-3">について</span>
            </a>
          </Link>
        </p>
      </section>
      {/* <div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h2 className="font-bold">あなたのタイムライン</h2>
            <Timeline />
          </div>
          <div>
            <div className="rounded-md bg-white p-4 shadow">
              <h2 className="font-bold">ユーザー一覧</h2>
              <ul className="divide-y">
                {users
                  ?.filter((targetUser) => targetUser.uid !== user?.uid)
                  .map((user) => (
                    <li key={user.uid} className="py-2">
                      <UserItem user={user} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="rounded-md bg-white p-4 shadow">
              <h2 className="mb-2 font-bold">あなたの情報</h2>
              <Profile />
            </div>
          </div>
        </div>
      </div> */}
      {/* <AllUserTable></AllUserTable> */}

      <BackGroundGray>
        <TopTitle>今期のアニメ（2022年冬）</TopTitle>
        {/* <ul>{animesMap}</ul> */}

        {/* <ul id="animeTitle">{animeMap}</ul> */}
        {/* {animes ? (
          <ul className="mb-8 grid grid-cols-3 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {animes
              ?.filter((anime) => anime.year === 2022 && anime.quarter === 4)
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
        )} */}
        {newData ? (
          <>
            <ul className="mb-8 grid grid-cols-3 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {newData
                ?.filter((anime) => anime.year === 2022 && anime.quarter === 4)
                .map((anime) => (
                  <li
                    key={anime.title}
                    className="flex w-full flex-col justify-between"
                  >
                    <Card anime={anime}></Card>
                  </li>
                ))}
            </ul>
            {!isReachingEnd ? (
              <div className="relative mx-auto block  text-center">
                <button
                  onClick={() => setSize(size + 1)}
                  className="inline-block rounded-full bg-buttonBlack py-3 px-12 text-white"
                >
                  もっと見る
                </button>
              </div>
            ) : // 'すべて読み込みました。'
            null}
          </>
        ) : (
          <p className="flex justify-center">
            <RefreshIcon className="w-10 animate-spin text-gray-700" />
          </p>
        )}
      </BackGroundGray>

      <BackGroundWhite>
        <TopTitle>最近投稿されたレビュー</TopTitle>
        <LatestReview></LatestReview>
      </BackGroundWhite>

      {/* <BackGroundWhite>
        <TopTitle>注目のアニメ</TopTitle>
        <Card></Card>
        <Button>もっと見る</Button>
      </BackGroundWhite>
      <BackGroundGray>
        <TopTitle>注目のタグ</TopTitle>
        <Tag />
        <Button>もっと見る</Button>
      </BackGroundGray>
      <BackGroundWhite>
        <TopTitle>動画配信サービス</TopTitle>
        <StreamingService />
      </BackGroundWhite>
      <BackGroundGray>
        <TopTitle>放送・配信時期</TopTitle>
        <Season />
        <Button>もっと見る</Button>
      </BackGroundGray>
      <BackGroundWhite>
        <TopTitle>アニメ映画</TopTitle>
        <TopTitle>2021年</TopTitle>
        <Card></Card>
        <Button>もっと見る</Button>
      </BackGroundWhite>
      <BackGroundWhite>
        <TopTitle>2020年</TopTitle>
        <Card></Card>
        <Button>もっと見る</Button>
      </BackGroundWhite>
      <BackGroundWhite>
        <TopTitle>2019年</TopTitle>
        <Card></Card>
        <Button>もっと見る</Button>
      </BackGroundWhite>
      <BackGroundGray>
        <TopTitle>最近投稿されたレビュー</TopTitle>
        <Review />
        <Button>もっと見る</Button>
      </BackGroundGray> */}
    </>
  );
};

export default Home;

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
