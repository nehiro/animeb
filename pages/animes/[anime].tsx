import { BookmarkIcon, EyeIcon, StarIcon } from '@heroicons/react/solid';
import {
  ChatAltIcon,
  HashtagIcon,
  LinkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/outline';
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
import { useAuth } from '../../utils/userContext';
import useSWR from 'swr';
import {
  collection,
  collectionGroup,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { listButton, unlistButton } from '../../lib/card';
import Score from '../../components/Score';
import { addMonths } from 'date-fns';
import { Tab } from '@headlessui/react';

type AnimeName = {
  name: string;
};
// type ShowMore = {
//   animeInfo.cast.length
// };

const AnimeWork = (animeTitle: AnimeName) => {
  // console.log(animeTitle, 'animeTitle');
  const { user, reviews, lists } = useAuth();
  const { animes } = useAnime();
  //animesコレクションにあるタイトル
  const dbAnimes = useSWR('animes', async () => {
    const ref = collection(db, 'animes');
    const snap = await getDocs(ref);
    return snap.docs.map((doc) => doc.data());
  });

  const animeId = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === animeTitle.name
  )?.id;
  const reviewDatas = () => {
    const animeRef = collection(db, `animes/${animeId}/reviews`);
    return onSnapshot(animeRef, async (snap) => {
      const datas = snap.docs.map((doc) => doc.data());
      console.log(datas);
    });
  };

  //レビューのモーダル
  const [reviewModal, setReviewModal] = useState(false);
  const modalOpen = () => {
    if (!user) {
      alert('ログインしてください');
      return;
    }
    setReviewModal(true);
  };

  //showMore
  const [loadStaffIndex, setLoadStaffIndex] = useState(4);
  const [isStaffEmpty, setIsStaffEmpty] = useState(false);
  const [loadCastIndex, setLoadCastIndex] = useState(4);
  const [isCastEmpty, setIsCastEmpty] = useState(false);
  const displayStaffMore = () => {
    if (!animeInfo) {
      return null;
    }
    if (loadStaffIndex > animeInfo.staff.length) {
      setIsStaffEmpty(false);
      setLoadStaffIndex(4);
    } else {
      setIsStaffEmpty(true);
      setLoadStaffIndex(loadStaffIndex + animeInfo.staff.length);
    }
  };
  const displayCastMore = () => {
    if (!animeInfo) {
      return null;
    }
    if (loadCastIndex > animeInfo.cast.length) {
      setIsCastEmpty(false);
      setLoadCastIndex(4);
    } else {
      setIsCastEmpty(true);
      setLoadCastIndex(loadCastIndex + animeInfo.cast.length);
    }
  };

  const reviewedRef = reviews?.find(
    (review) => review.title === animeTitle.name
  );
  const listed = () => {
    return lists?.find((list) => list.title === animeTitle.name);
  };
  const animeInfoArray = animes?.filter(
    (anime) => anime.title === animeTitle.name
  );
  // console.log(animeInfoArray, 'animeInfoArray');
  const animeInfo = animeInfoArray?.find(
    (item) => item.title === animeTitle.name
  );
  if (!animes || !animeInfo) {
    return null;
  }

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

  // const [height, setHeight] = useState(null);
  // const [width, setWidth] = useState(null);
  // const div = useCallback((node) => {
  //   if (node !== null) {
  //     setHeight(node.getBoundingClientRect().height);
  //     setWidth(node.getBoundingClientRect().width);
  //   }
  // }, []);
  // console.log(height, 'height');
  // console.log(width, 'width');

  const listCount = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === animeTitle.name
  )?.listCount;
  const reviewCount = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === animeTitle.name
  )?.reviewCount;
  const unScoreReviewCount = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === animeTitle.name
  )?.unScoreReviewCount;
  const reviewedCount = () => {
    if (reviewCount === undefined) {
      if (unScoreReviewCount === undefined) {
        return 0;
      } else {
        return unScoreReviewCount;
      }
    } else {
      if (unScoreReviewCount === undefined) {
        return reviewCount;
      } else {
        return reviewCount + unScoreReviewCount;
      }
    }
  };
  //それぞれの平均値
  const reviewStoryScore = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === animeTitle.name
  )?.storyScore;
  // console.log(reviewStoryScore);
  const reviewDrawingScore = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === animeTitle.name
  )?.drawingScore;
  const reviewVoiceActorScore = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === animeTitle.name
  )?.voiceActorScore;
  const reviewMusicScore = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === animeTitle.name
  )?.musicScore;
  const reviewCharacterScore = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === animeTitle.name
  )?.characterScore;
  const reviewSum =
    reviewStoryScore +
    reviewDrawingScore +
    reviewVoiceActorScore +
    reviewMusicScore +
    reviewCharacterScore;
  // console.log(typeof reviewSum);
  const reviewAverage = () => {
    if (
      (reviewStoryScore ||
        reviewDrawingScore ||
        reviewVoiceActorScore ||
        reviewMusicScore ||
        reviewCharacterScore) === undefined ||
      (reviewStoryScore ||
        reviewDrawingScore ||
        reviewVoiceActorScore ||
        reviewMusicScore ||
        reviewCharacterScore) === 0
    ) {
      return '-';
    } else {
      return (reviewSum / 5 / reviewCount).toFixed(1);
    }
  };

  const evaluationItems = [
    {
      heading: '物語',
      value: reviewStoryScore,
    },
    {
      heading: '作画',
      value: reviewDrawingScore,
    },
    {
      heading: '声優',
      value: reviewVoiceActorScore,
    },
    {
      heading: '音楽',
      value: reviewMusicScore,
    },
    {
      heading: 'キャラ',
      value: reviewCharacterScore,
    },
  ];

  return (
    <>
      <Breadcrumbs />
      <BackGroundWhite>
        <div className="flex justify-start">
          <div className="mr-8 min-w-200 max-w-242">
            <div className="relative mb-2 block h-40 leading-none sm:h-48 md:h-56 lg:h-64 xl:h-72">
              <Image
                src={
                  'https://raw.githubusercontent.com/nehiro/animeb-public/main/images/' +
                  `${animeInfo?.title}` +
                  '.jpg'
                }
                layout="fill"
                className="object-cover"
                alt=""
              />
            </div>
            <div className="mb-2 grid grid-cols-2 items-center justify-items-center gap-2">
              <div className="w-full">
                <button className="w-full" onClick={modalOpen}>
                  {reviewedRef ? (
                    <a className="inline-block h-full w-full bg-yellow bg-no-repeat py-2 text-center">
                      <EyeIcon className="mx-auto h-5 w-5" />
                      <span className="inline-block h-full w-full">
                        {reviewedCount()}
                      </span>
                    </a>
                  ) : (
                    <a className="inline-block h-full w-full bg-amber-100 bg-no-repeat py-2 text-center">
                      <EyeIcon className="mx-auto h-5 w-5 text-amber-400" />
                      <span className="inline-block h-full w-full text-amber-400">
                        {reviewedCount()}
                      </span>
                    </a>
                  )}
                </button>
              </div>
              <div className="w-full">
                {listed() ? (
                  <button
                    className="w-full"
                    onClick={() =>
                      unlistButton({
                        anime: animeInfo as Anime,
                        user,
                        lists,
                        dbAnimes,
                      })
                    }
                  >
                    <span className="inline-block h-full w-full bg-yellow bg-no-repeat py-2 text-center">
                      <BookmarkIcon className="mx-auto h-5 w-5" />
                      <span className="inline-block h-full w-full">
                        {!listCount ? 0 : listCount}
                      </span>
                    </span>
                  </button>
                ) : (
                  <button
                    className="w-full"
                    onClick={() =>
                      listButton({ anime: animeInfo as Anime, user, dbAnimes })
                    }
                  >
                    <span className="inline-block h-full w-full bg-amber-100 bg-no-repeat py-2 text-center">
                      <BookmarkIcon className="mx-auto h-5 w-5 text-amber-400" />
                      <span className="inline-block h-full w-full text-amber-400">
                        {!listCount ? 0 : listCount}
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </div>
            {animeInfo?.url ? (
              <div className="mb-1 flex items-center justify-start">
                <LinkIcon className="h-4 w-4" />
                <a target="_blank" href={animeInfo?.url} className="text-sm">
                  公式サイト
                </a>
              </div>
            ) : (
              ''
            )}
            {animeInfo?.pv ? (
              <div className="flex items-center justify-start">
                <LinkIcon className="h-4 w-4" />
                <a target="_blank" href={animeInfo?.pv} className="text-sm">
                  PV
                </a>
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            <h1 className="mb-6 hidden text-2xl font-bold md:block">
              {animeInfo?.title}
            </h1>
            <div className="mb-1 hidden md:block">
              公開時期: {`${animeInfo?.year}年`} {`${quarter()}アニメ`}
            </div>
            <div className="mb-6 flex flex-wrap items-end justify-items-start">
              <div className="flex items-end">
                <StarIcon className="h-6 w-6 text-yellow" />
                <span className="mr-4 text-3xl leading-none text-yellow">
                  {reviewAverage()}
                </span>
              </div>
              <ul className="flex flex-wrap items-center justify-start">
                {evaluationItems.map((item) => (
                  <li className="mr-3" key={item.heading}>
                    {item.heading}
                    <span className="ml-2">
                      {item.value === undefined || item.value === 0
                        ? '-'
                        : (item.value / reviewCount).toFixed(1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold">スタッフ</h3>
              <ul className="mb-1 grid grid-cols-4 gap-4">
                {/* <ul className="mb-1 flex flex-wrap"> */}
                {animeInfo.staff.slice(0, loadStaffIndex).map((item) => (
                  <li key={item[0]} className="">
                    <h3 className="mb-1 rounded bg-gray-200 px-2 py-1 text-sm font-bold">
                      {item[0]}
                    </h3>
                    <p className="py-1 px-2 text-sm">{item[1]}</p>
                  </li>
                ))}
              </ul>
              <button onClick={() => displayStaffMore()} className="text-sm">
                {isStaffEmpty ? (
                  <span className="text-violet-800">
                    <ChevronUpIcon className="inline-block h-4 w-4" /> 閉じる
                  </span>
                ) : (
                  <span className="text-violet-800">
                    <ChevronDownIcon className="inline-block h-4 w-4" />{' '}
                    さらに表示
                  </span>
                )}
              </button>
            </div>
            {animeInfo.op || animeInfo.ed ? (
              // <div className="mb-6 flex flex-wrap">
              <div className="mb-6 grid grid-cols-4 gap-4">
                {animeInfo.op ? (
                  <div className="">
                    <h3 className="mb-1 rounded bg-gray-200 px-2 py-1 text-sm font-bold">
                      OP
                    </h3>
                    <p className="px-2 py-1 text-sm">
                      {animeInfo.op[0] + ' 『' + animeInfo.op[1] + '』'}
                    </p>
                  </div>
                ) : (
                  ''
                )}
                {animeInfo.ed ? (
                  <div>
                    <h3 className="rounded bg-gray-200 px-2 py-1 text-sm font-bold">
                      ED
                    </h3>
                    <p className="px-2 py-1 text-sm">
                      {animeInfo.ed[0] + ' 『' + animeInfo.ed[1] + '』'}
                    </p>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold">キャスト</h3>
              <ul className="mb-1 grid grid-cols-4 gap-4">
                {/* <ul className="mb-1 flex flex-wrap"> */}
                {animeInfo.cast.slice(0, loadCastIndex).map((item) => (
                  <li key={item[0]} className="">
                    <h3 className="mb-1 rounded bg-gray-200 px-2 py-1 text-sm font-bold">
                      {item[0]}
                    </h3>
                    <p className=" px-2 py-1 text-sm">{item[1]}</p>
                  </li>
                ))}
              </ul>
              <button onClick={() => displayCastMore()} className="text-sm">
                {isCastEmpty ? (
                  <span className="text-violet-800">
                    <ChevronUpIcon className="inline-block h-4 w-4" /> 閉じる
                  </span>
                ) : (
                  <span className="text-violet-800">
                    <ChevronDownIcon className="inline-block h-4 w-4" />{' '}
                    さらに表示
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </BackGroundWhite>
      <BackGroundGray>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          あらすじ
        </h2>
        <p className="tracking-wider">{animeInfo?.summary}</p>
      </BackGroundGray>
      <BackGroundWhite>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          視聴可能な動画配信サービス
        </h2>
        {/* <StreamingService /> */}
      </BackGroundWhite>
      <BackGroundGray>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          <HashtagIcon className="mr-2 h-5 w-5" />
          {animeInfo?.title}によく使用されているタグ
        </h2>
        <AnimeTag title={animeTitle.name} />
      </BackGroundGray>
      <BackGroundWhite>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          <ChatAltIcon className="mr-2 h-5 w-5" />
          {animeInfo?.title}
          に投稿された感想・評価
        </h2>
        <AnimeReview title={animeTitle.name} />
      </BackGroundWhite>
      {/* <BackGroundGray>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          2021年春アニメの他作品
        </h2>
        <AnotherAnime />
        <Button>もっと見る</Button>
      </BackGroundGray> */}
      <Score
        anime={animeInfo as Anime}
        setReviewModal={setReviewModal}
        reviewModal={reviewModal}
      ></Score>
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
