import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import React, { ReactElement, useEffect } from 'react';
import BackGroundGray from '../components/BackGroundGray';
import BackGroundWhite from '../components/BackGroundWhite';
import Button from '../components/Button';
import Card from '../components/card/Card';
import Review from '../components/Review';
import Season from '../components/Season';
import StreamingService from '../components/StreamingService';
import Tag from '../components/Tag';
import TopTitle from '../components/TopTitle';
import { AllUserTable } from '../components/AllUserTable';
import Layout from '../layouts/Layout';
import { Anime } from '../types/Anime';
import { useAnime } from '../utils/animeContext';
import { db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';
import useSWR from 'swr';
import { User } from '../types/User';
import Timeline from '../components/Timeline';
import UserItem from '../components/UserItem';
import Profile from '../components/Profile';

const Home = () => {
  //アニメ管理
  const { anime } = useAnime();
  const animeMap = anime?.map((item) => <li key={item.title}>{item.title}</li>);

  // followとuser管理
  const { user, loading } = useAuth();
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
      <div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h2 className="font-bold">あなたのタイムライン</h2>
            <Timeline />
          </div>
          <div>
            <div className="shadow rounded-md p-4 bg-white">
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
            <div className="shadow rounded-md p-4 bg-white">
              <h2 className="font-bold mb-2">あなたの情報</h2>
              <Profile />
            </div>
          </div>
        </div>
      </div>
      {/* <AllUserTable></AllUserTable> */}

      <BackGroundGray>
        <TopTitle>今期のアニメ（2022年冬）</TopTitle>
        <ul id="animeTitle">{animeMap}</ul>
        <Card anime={anime}></Card>
        <Button>もっと見る</Button>
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
