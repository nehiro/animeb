import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EyeIcon, BookmarkIcon, StarIcon } from '@heroicons/react/solid';
import { Anime } from '../../types/Anime';
import 'rc-slider/assets/index.css';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useAuth } from '../../utils/userContext';
import { listButton, unlistButton } from '../../lib/card';
import useSWR, { useSWRConfig } from 'swr';
import Score from '../Score';
import { userReviews } from '../../lib/getReviews';
import { userLists } from '../../lib/getList';
import toast from 'react-hot-toast';
import { DbAnime } from '../../types/DbAnime';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Card = {
  title: string;
  isScore: boolean;
  storyScore: number;
  drawingScore: number;
  voiceActorScore: number;
  musicScore: number;
  characterScore: number;
  review: string;
  spoiler: boolean;
  tag: string;
};

const Card = ({ anime }: { anime: Anime }) => {
  // console.log(anime, 'card anime');
  const { user, lists, reviews } = useAuth();
  // console.log(user, 'user');
  // console.log(anime, 'anime');

  const { mutate } = useSWRConfig();

  //レビューのモーダル
  const [reviewModal, setReviewModal] = useState(false);
  const modalOpen = () => {
    if (!user) {
      toast.error('ログインしてください');
      return;
    }
    setReviewModal(true);
  };

  //ログインユーザーがlistしているかどうか
  // const authUserListData = userLists(user?.uid as string);
  // console.log(authUseListData);
  // const listed = () => {
  //   return authUserListData?.find((list) => list.title === anime?.title);
  // };
  // console.log(lists, 'Card lists');
  // console.log(lists, 'lists');
  const listed = () => {
    return lists?.find((list) => list.title === anime?.title);
  };

  //ログインユーザーがreviewしているかどうか
  // const authUserReviewData = userReviews(user?.uid as string);
  const reviewed = () => {
    return reviews?.find((review) => review.title === anime?.title);
  };

  //animesコレクションにあるタイトル
  // const dbAnimes = useSWR('animes', async () => {
  //   const ref = collection(db, 'animes');
  //   const snap = await getDocs(ref);
  //   return snap.docs.map((doc) => doc.data());
  // });

  const [dbAnimes, setDbAnimes] = useState<DbAnime[]>();
  // console.log(dbAnimes, 'dbAnimes');
  useEffect(() => {
    const ref = collection(db, 'animes');
    onSnapshot(ref, async (snap) => {
      // console.log(
      //   snap.docs.map((doc) => doc.data()),
      //   'data'
      // );

      const data = snap.docs.map((doc) => doc.data());
      // console.log(data);
      setDbAnimes(data as any);
      // return snap.docs.map((doc) => doc.data());
    });
  }, [user]);

  // console.log(dbAnimes, 'dbAnimes');
  // console.log(dbAnimes(), 'dbAnimes');

  // listCount取得;
  const listCount = dbAnimes?.find((dbAnime) => dbAnime.title === anime.title)
    ?.listCount as number;
  // console.log(listCount);
  //reviweCount取得
  // const reviewCount = dbAnimes?.find((dbAnime) => dbAnime.title === anime.title)
  //   ?.reviewCount as number;
  const reviewCount = dbAnimes?.find((dbAnime) => dbAnime.title === anime.title)
    ?.reviewCount as number;
  const sumReviewCount = dbAnimes?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.sumReviewCount as number;
  // console.log(typeof reviewCount);

  //unScoreReviweCount取得
  // const unScoreReviewCount = dbAnimes?.find(
  //   (dbAnime) => dbAnime.title === anime.title
  // )?.unScoreReviewCount;
  // console.log(typeof unScoreReviewCount);

  // const reviewedCount = () => {
  //   if (reviewCount === undefined) {
  //     if (unScoreReviewCount === undefined) {
  //       return 0;
  //     } else {
  //       return unScoreReviewCount;
  //     }
  //   } else {
  //     if (unScoreReviewCount === undefined) {
  //       return reviewCount;
  //     } else {
  //       return reviewCount + unScoreReviewCount;
  //     }
  //   }
  // };

  //それぞれの平均値
  const reviewStoryScore = dbAnimes?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.storyScore as number;
  // console.log(typeof reviewStoryScore);
  const reviewDrawingScore = dbAnimes?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.drawingScore as number;
  const reviewVoiceActorScore = dbAnimes?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.voiceActorScore as number;
  const reviewMusicScore = dbAnimes?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.musicScore as number;
  const reviewCharacterScore = dbAnimes?.find(
    (dbAnime) => dbAnime.title === anime.title
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

  return (
    <>
      <div className="mb-2">
        <Link href={`/animes/${anime.year}/${anime.quarter}/${anime?.title}`}>
          <a className="relative block h-40 leading-none sm:h-48 md:h-56 lg:h-64 xl:h-72">
            <Image
              src={
                'https://raw.githubusercontent.com/nehiro/animeb-public/main/images/' +
                `${anime?.title}` +
                '.jpg'
              }
              layout="fill"
              className="object-cover"
              alt=""
            />
          </a>
        </Link>
      </div>
      <h3 className="mb-2 text-center font-bold">
        <Link href={`/animes/${anime.year}/${anime.quarter}/${anime?.title}`}>
          <a>{anime?.title}</a>
        </Link>
      </h3>
      <div className="grid grid-cols-3 items-center justify-items-center gap-1 sm:gap-2">
        <div className="w-full">
          <button className="w-full" onClick={modalOpen}>
            {reviewed() ? (
              <a className="inline-block h-full w-full bg-yellow bg-no-repeat py-1 text-center sm:py-2">
                <EyeIcon className="mx-auto h-5 w-5" />
                <span className="inline-block h-full w-full">
                  {sumReviewCount ? sumReviewCount : 0}
                </span>
              </a>
            ) : (
              <a className="inline-block h-full w-full bg-amber-100 bg-no-repeat py-1 text-center sm:py-2">
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
                unlistButton({ anime, user, lists, dbAnimes });
                // mutate(user?.uid && `lists`);
              }}
            >
              <span className="inline-block h-full w-full bg-yellow bg-no-repeat py-1 text-center sm:py-2">
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
                listButton({ anime, user, dbAnimes });
                // mutate(user?.uid && `lists`);
              }}
            >
              <span className="inline-block h-full w-full bg-amber-100 bg-no-repeat py-1 text-center sm:py-2">
                <BookmarkIcon className="mx-auto h-5 w-5 text-amber-400" />
                <span className="inline-block h-full w-full text-amber-400">
                  {!listCount ? 0 : listCount}
                </span>
              </span>
            </button>
          )}
        </div>
        <div className="w-full">
          <span className="inline-block h-full w-full bg-buttonBlack bg-no-repeat py-1 text-center text-yellow sm:py-2">
            <StarIcon className="mx-auto h-5 w-5 text-yellow" />
            <span className="inline-block h-full w-full select-none">
              {reviewAverage()}
            </span>
          </span>
        </div>
      </div>
      <Score
        anime={anime}
        setReviewModal={setReviewModal}
        reviewModal={reviewModal}
        dbAnimes={dbAnimes as DbAnime[]}
      ></Score>
    </>
  );
};

export default Card;
