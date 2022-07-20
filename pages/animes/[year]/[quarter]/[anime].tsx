import { BookmarkIcon, EyeIcon, StarIcon } from '@heroicons/react/solid';
import {
  ChatAltIcon,
  HashtagIcon,
  LinkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import AnimeTag from '../../../../components/AnimeTag';
import BackGroundGray from '../../../../components/BackGroundGray';
import BackGroundWhite from '../../../../components/BackGroundWhite';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import StreamingService from '../../../../components/StreamingService';
import AnimeReviewTabs from '../../../../components/AnimeReviewTabs';
import AnotherAnime from '../../../../components/card/AnotherAnime';
import Button from '../../../../components/Button';
import Layout from '../../../../layouts/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useAnime } from '../../../../utils/animeContext';
import Link from 'next/link';
import * as path from 'path';
import * as fs from 'fs';
import { Anime } from '../../../../types/Anime';
import { useAuth } from '../../../../utils/userContext';
import useSWR, { useSWRConfig } from 'swr';
import {
  collection,
  collectionGroup,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../../utils/firebase';
import { listButton, unlistButton } from '../../../../lib/card';
import Score from '../../../../components/Score';
import { addMonths } from 'date-fns';
import { Tab } from '@headlessui/react';
import { userReviews } from '../../../../lib/getReviews';
import { userLists } from '../../../../lib/getList';
import { DbAnime } from '../../../../types/DbAnime';
import toast from 'react-hot-toast';
import { NextSeo } from 'next-seo';

type AnimeName = {
  name: string;
  year: number;
  quarter: number;
};

const AnimeWork = (anime: AnimeName) => {
  const animeTitle = anime.name;
  const animeYear = anime.year;
  const animeQuarter = anime.quarter;
  // console.log(animeTitle, 'animeTitle');
  const { user, reviews, lists } = useAuth();
  const { animes } = useAnime();
  //animesコレクションにあるタイトル

  const [dbAnimes, setDbAnimes] = useState<DbAnime[]>();
  useEffect(() => {
    getDbAnimes();
  }, []);

  const getDbAnimes = async () => {
    const ref = collection(db, 'animes');
    onSnapshot(ref, (snap) => {
      const data = snap.docs.map((doc) => doc.data() as DbAnime);
      setDbAnimes(data);
    });
    // const snap = await getDocs(ref);
  };

  // console.log(dbAnimes);

  const animeId = dbAnimes?.find((dbAnime) => dbAnime.title === animeTitle)
    ?.id as string;

  //レビューのモーダル
  const [reviewModal, setReviewModal] = useState(false);
  const modalOpen = () => {
    if (!user) {
      toast.error('ログインしてください');
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
    if (!animeInfo || !animeInfo.staff) {
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
    if (!animeInfo || !animeInfo.cast) {
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

  //ログインユーザーがreviewしているかどうか
  // const authUserReviewData = userReviews(user?.uid as string);
  const reviewedRef = reviews?.find((review) => review.title === animeTitle);

  //ログインユーザーがlistしているかどうか
  // const authUserListData = userLists(user?.uid as string);
  // console.log(authUseListData);
  const listed = () => {
    return lists?.find((list) => list.title === animeTitle);
  };

  const animeInfoArray = animes?.filter((anime) => anime.title === animeTitle);
  // console.log(animeInfoArray, 'animeInfoArray');
  const animeInfo = animeInfoArray?.find((item) => item.title === animeTitle);
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

  const listCount = dbAnimes?.find(
    (dbAnime) => dbAnime.title === animeTitle
  )?.listCount;
  const reviewCount = dbAnimes?.find((dbAnime) => dbAnime.title === animeTitle)
    ?.reviewCount as number;
  const sumReviewCount = dbAnimes?.find(
    (dbAnime) => dbAnime.title === animeTitle
  )?.sumReviewCount as number;

  //それぞれの平均値
  const reviewStoryScore = dbAnimes?.find(
    (dbAnime) => dbAnime.title === animeTitle
  )?.storyScore as number;
  // console.log(reviewStoryScore);
  const reviewDrawingScore = dbAnimes?.find(
    (dbAnime) => dbAnime.title === animeTitle
  )?.drawingScore as number;
  const reviewVoiceActorScore = dbAnimes?.find(
    (dbAnime) => dbAnime.title === animeTitle
  )?.voiceActorScore as number;
  const reviewMusicScore = dbAnimes?.find(
    (dbAnime) => dbAnime.title === animeTitle
  )?.musicScore as number;
  const reviewCharacterScore = dbAnimes?.find(
    (dbAnime) => dbAnime.title === animeTitle
  )?.characterScore as number;
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
      <NextSeo
        title={
          'アニメ『' +
          animeTitle +
          '』の感想・レビュー[' +
          sumReviewCount +
          '件] | アニメ部！'
        }
        description={
          'レビュー数：' +
          sumReviewCount +
          '件 ／ 平均スコア：' +
          reviewAverage() +
          '点'
        }
        openGraph={{
          url: decodeURI(
            'https://anime-club.online/animes/' +
              animeYear +
              '/' +
              animeQuarter +
              '/' +
              animeTitle
          ),
          title:
            'アニメ『' +
            animeTitle +
            '』の感想・レビュー[' +
            sumReviewCount +
            '件] | アニメ部！',
          description:
            'レビュー数：' +
            sumReviewCount +
            '件 ／ 平均スコア：' +
            reviewAverage() +
            '点',
          images: [
            {
              url:
                'https://raw.githubusercontent.com/nehiro/animeb-public/main/images/' +
                `${animeInfo?.title}` +
                '.jpg',
              width: 60,
              height: 100,
              alt: animeInfo?.title,
            },
          ],
        }}
      />
      <Breadcrumbs
        pages={[
          {
            name: '放送・配信時期',
            href: 'animes',
          },
          {
            name: String(animeYear) + '年アニメ',
            href: 'animes/' + String(animeYear),
          },
          {
            name: quarter() as string,
            href: 'animes/' + String(animeYear) + '/' + String(animeQuarter),
          },
          {
            name: animeTitle,
          },
        ]}
      />
      {animeInfo ? (
        <>
          <BackGroundWhite>
            <h1 className="mb-1 block text-lg font-bold md:hidden">
              {animeInfo?.title}
            </h1>
            <div className="mb-1 block text-sm md:hidden">
              公開時期: {`${animeInfo?.year}年`} {`${quarter()}アニメ`}
            </div>
            <div className="mb-2 flex flex-wrap items-end justify-items-start md:hidden">
              <div className="flex items-end">
                <StarIcon className="h-5 w-5 text-yellow" />
                <span className="mr-4 text-2xl leading-none text-yellow">
                  {reviewAverage()}
                </span>
              </div>
              <ul className="flex flex-wrap items-center justify-start">
                {evaluationItems.map((item) => (
                  <li className="mr-3 text-sm" key={item.heading}>
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
            <div className="flex justify-between sm:justify-start">
              <div className="mr-4 min-w-146 sm:mr-8 sm:min-w-200 sm:max-w-242">
                <div className="relative mb-2 block h-60 leading-none sm:h-72">
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
                            {sumReviewCount ? sumReviewCount : 0}
                          </span>
                        </a>
                      ) : (
                        <a className="inline-block h-full w-full bg-amber-100 bg-no-repeat py-2 text-center">
                          <EyeIcon className="mx-auto h-5 w-5 text-amber-400" />
                          <span className="inline-block h-full w-full text-amber-400">
                            {sumReviewCount ? sumReviewCount : 0}
                          </span>
                        </a>
                      )}
                    </button>
                  </div>
                  <div className="w-full">
                    {listed() ? (
                      <button
                        className="w-full"
                        onClick={() => {
                          unlistButton({
                            anime: animeInfo as Anime,
                            user,
                            lists,
                            dbAnimes,
                          });
                        }}
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
                        onClick={() => {
                          listButton({
                            anime: animeInfo as Anime,
                            user,
                            dbAnimes,
                          });
                        }}
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
                    <a
                      target="_blank"
                      href={animeInfo?.url}
                      className="text-sm"
                    >
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
              <div className="w-full sm:w-auto">
                <h1 className="mb-6 hidden text-2xl font-bold md:block">
                  {animeInfo?.title}
                </h1>
                <div className="mb-1 hidden md:block">
                  公開時期: {`${animeInfo?.year}年`} {`${quarter()}アニメ`}
                </div>
                <div className="mb-6 hidden flex-wrap items-end justify-items-start md:flex">
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
                <div className="mb-3 sm:mb-6">
                  <h3 className="mb-2 text-sm font-bold">スタッフ</h3>
                  <ul className="mb-1 flex flex-col sm:grid sm:grid-cols-4 sm:gap-4">
                    {/* <ul className="mb-1 flex flex-wrap"> */}
                    {animeInfo.staff?.slice(0, loadStaffIndex).map((item) => (
                      <li key={item[0]} className="">
                        <h3 className="mb-1 rounded bg-gray-200 px-2 py-1 text-sm font-bold">
                          {item[0]}
                        </h3>
                        <p className="py-1 px-2 text-sm">{item[1]}</p>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => displayStaffMore()}
                    className="text-sm"
                  >
                    {isStaffEmpty ? (
                      <span className="text-violet-800">
                        <ChevronUpIcon className="inline-block h-4 w-4" />{' '}
                        閉じる
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
                  <div className="mb-3 flex flex-col sm:mb-6 sm:grid sm:grid-cols-4 sm:gap-4">
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
                <div className="sm:mb-6">
                  <h3 className="mb-2 text-sm font-bold">キャスト</h3>
                  <ul className="mb-1  flex flex-col sm:grid sm:grid-cols-4 sm:gap-4">
                    {/* <ul className="mb-1 flex flex-wrap"> */}
                    {animeInfo.cast?.slice(0, loadCastIndex).map((item) => (
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
                        <ChevronUpIcon className="inline-block h-4 w-4" />{' '}
                        閉じる
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
            <h2 className="mb-4 flex items-center justify-center text-lg font-bold sm:mb-8 sm:text-xl">
              あらすじ
            </h2>
            <p className="tracking-wider">{animeInfo?.summary}</p>
          </BackGroundGray>
          {/* {' '} */}
          {/* <BackGroundWhite>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          視聴可能な動画配信サービス
        </h2>
        <StreamingService />
      </BackGroundWhite> */}
          {/* {' '} */}
          {/* <BackGroundGray>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          <HashtagIcon className="mr-2 h-5 w-5" />
          {animeInfo?.title}によく使用されているタグ
        </h2>
        <AnimeTag animeId={animeId} />
      </BackGroundGray> */}
          <BackGroundWhite>
            <h2 className="mb-4 flex items-center justify-center text-lg font-bold sm:mb-8 sm:text-xl">
              <ChatAltIcon className="mr-2 h-10 w-10 sm:h-5 sm:w-5" />
              {animeInfo?.title}
              に投稿された感想・評価
            </h2>
            <AnimeReviewTabs animeId={animeId} />
          </BackGroundWhite>
          {/* <BackGroundGray>
        <h2 className="mb-8 flex items-center justify-center text-xl font-bold">
          2021年春アニメの他作品
        </h2>
        <AnotherAnime />
        <Button>もっと見る</Button>
      </BackGroundGray> */}
        </>
      ) : (
        <p className="flex justify-center">
          <RefreshIcon className="w-10 animate-spin text-gray-700" />
        </p>
      )}
      <Breadcrumbs
        pages={[
          {
            name: '放送・配信時期',
            href: 'animes',
          },
          {
            name: String(animeYear) + '年アニメ',
            href: 'animes/' + String(animeYear),
          },
          {
            name: quarter() as string,
            href: 'animes/' + String(animeYear) + '/' + String(animeQuarter),
          },
          {
            name: animeTitle,
          },
        ]}
      />
      <Score
        anime={animeInfo as Anime}
        setReviewModal={setReviewModal}
        reviewModal={reviewModal}
        dbAnimes={dbAnimes as DbAnime[]}
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
  const paths = animes.map(
    (item) => `/animes/${item.year}/${item.quarter}/${encodeURI(item.title)}`
  );
  // console.log(paths, 'paths');
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log(params, 'params');
  // console.log(params?.anime, 'params');
  const anime = {
    name: params?.anime,
    year: params?.year,
    quarter: params?.quarter,
  };
  // console.log(animeTitle, 'animeTitle');
  return {
    props: anime,
  };
};

AnimeWork.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
