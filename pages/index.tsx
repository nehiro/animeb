import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
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
import Timeline from '../components/Timeline';
import UserItem from '../components/UserItem';
import Profile from '../components/Profile';
import Link from 'next/link';
import { Anime } from '../types/Anime';

const Home = () => {
  //アニメ管理
  const { animes } = useAnime();
  // console.log(animes, 'animes');
  // console.log(animes, 'anime.items');

  const animesMap = animes?.map((item) => (
    <li key={item.title}>
      <Link href={encodeURI('animes/' + `${item.title}`)}>
        <a>{item.title}</a>
      </Link>
    </li>
  ));
  // console.log(animesMap, 'animesMap');

  // followとuser管理
  const { user, loading, reviews } = useAuth();
  const { data: users } = useSWR('users', async () => {
    const ref = collection(db, 'users');
    const snap = await getDocs(ref);
    return snap.docs.map((doc) => doc.data() as User);
  });

  if (loading) return null;

  if (user === undefined) {
    return null;
  }

  return (
    <>
      <section className="relative h-80">
        <Image
          src="/images/hero.png"
          layout="fill"
          objectFit="cover"
          alt=""
          priority
        />
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

        {/* <Button>もっと見る</Button> */}
      </BackGroundGray>
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
