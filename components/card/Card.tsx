import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EyeIcon, BookmarkIcon, StarIcon } from '@heroicons/react/solid';
import { Anime } from '../../types/Anime';
import 'rc-slider/assets/index.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useAuth } from '../../utils/userContext';
import { listButton, unlistButton } from '../../lib/card';
import useSWR from 'swr';
import Score from '../Score';

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
  const { user, reviews, lists } = useAuth();
  //ログインユーザーがreviewしているかどうか
  const reviewedRef = reviews?.find((review) => review.title === anime?.title);
  // console.log(reviewedRef, 'reviewedRef');
  //ログインユーザーがlistしているかどうか
  const listed = () => {
    return lists?.find((list) => list.title === anime?.title);
  };

  //animesコレクションにあるタイトル
  const dbAnimes = useSWR('animes', async () => {
    const ref = collection(db, 'animes');
    const snap = await getDocs(ref);
    return snap.docs.map((doc) => doc.data());
  });

  // console.log(dbAnimes.data, 'dbAnimes');

  //listCount取得
  const listCount = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.listCount;
  // console.log(listCount);
  //reviweCount取得
  const reviewCount = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.reviewCount;
  // console.log(typeof reviewCount);

  //unScoreReviweCount取得
  const unScoreReviewCount = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.unScoreReviewCount;
  // console.log(typeof unScoreReviewCount);

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
    (dbAnime) => dbAnime.title === anime.title
  )?.storyScore;
  // console.log(typeof reviewStoryScore);
  const reviewDrawingScore = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.drawingScore;
  const reviewVoiceActorScore = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.voiceActorScore;
  const reviewMusicScore = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.musicScore;
  const reviewCharacterScore = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === anime.title
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

  //レビューのモーダル
  const [reviewModal, setReviewModal] = useState(false);
  const modalOpen = () => {
    if (!user) {
      alert('ログインしてください');
      return;
    }
    setReviewModal(true);
  };

  return (
    <>
      <div className="mb-2">
        <Link href={`/animes/${anime?.title}`}>
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
        <Link href={`/animes/${anime?.title}`}>
          <a>{anime?.title}</a>
        </Link>
      </h3>
      <div className="grid grid-cols-3 items-center justify-items-center gap-2">
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
              onClick={() => unlistButton({ anime, user, lists, dbAnimes })}
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
              onClick={() => listButton({ anime, user, dbAnimes })}
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
        <div className="w-full">
          <span className="inline-block h-full w-full bg-buttonBlack bg-no-repeat py-2 text-center text-yellow">
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
      ></Score>
    </>
  );
};

export default Card;
