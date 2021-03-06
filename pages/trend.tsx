import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import React, { ReactElement } from 'react';
import useSWR from 'swr';
import BackGroundGray from '../components/BackGroundGray';
import Breadcrumbs from '../components/Breadcrumbs';
import NoContents from '../components/NoContents';
import SubpageTitle from '../components/SubpageTitle';
import Layout from '../layouts/Layout';
import { Anime } from '../types/Anime';
import { db } from '../utils/firebase';
import { ReviewData } from '../types/ReviewData';
import LatestReview from '../components/LatestReview';
import MostLike from '../components/MostLike';
import MostReview from '../components/MostReview';
import { NextSeo } from 'next-seo';
import BackGroundWhite from '../components/BackGroundWhite';

const Trend = () => {
  //24時間以内によく投稿されたタイトル

  return (
    <>
      <NextSeo
        title="注目のアニメ | アニメ部！"
        description="レビュー数、ブックマーク数が多いアニメをチェックしよう！"
        openGraph={{
          url: 'https://anime-club.online/trend',
          title: '注目のアニメ | アニメ部！',
          description:
            'レビュー数、ブックマーク数が多いアニメをチェックしよう！',
        }}
      />
      <Breadcrumbs
        pages={[
          {
            name: '注目のアニメ',
          },
        ]}
      />
      <BackGroundGray>
        <SubpageTitle>注目のアニメ</SubpageTitle>
        {/* 最もレビューが多いアニメ */}
        <SubpageTitle>レビューされている数が多い作品</SubpageTitle>
        <MostReview></MostReview>
      </BackGroundGray>
      <BackGroundWhite>
        <SubpageTitle>ブックマークされている数が多い作品</SubpageTitle>
        <MostLike></MostLike>
      </BackGroundWhite>
      <BackGroundGray>
        <SubpageTitle>最近投稿されたレビュー</SubpageTitle>
        <LatestReview></LatestReview>
      </BackGroundGray>
      <Breadcrumbs
        pages={[
          {
            name: '注目のアニメ',
          },
        ]}
      />
    </>
  );
};

export default Trend;

Trend.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
