import { RefreshIcon } from '@heroicons/react/outline';
import {
  collection,
  limit,
  onSnapshot,
  onSnapshotsInSync,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Anime } from '../types/Anime';
import { DbAnime } from '../types/DbAnime';
import { ReviewData } from '../types/ReviewData';
import { useAnime } from '../utils/animeContext';
import { db } from '../utils/firebase';
import Card from './card/Card';

export type NewAnime = {
  id?: string | undefined;
  doing: boolean;
  media: string;
  firstTime: boolean;
  season: number;
  title: string;
  ruby: string;
  url: string;
  pv: string;
  year: number;
  quarter: number;
  staff: string[][];
  op: string[];
  ed: string[];
  summary: string;
  cast: string[][];
  subTitle: string[];
  onair: string[][];
  streaming: string[];
  storyScore: number;
  drawingScore: number;
  voiceActorScore: number;
  musicScore: number;
  characterScore: number;
  createAt: number;
  reviewCount: number;
  sumReviewCount: number;
  unScoreReviewCount: number;
  listCount: number;
};

const MostLike = () => {
  const { animes } = useAnime();

  useEffect(() => {
    getMostLike();
  }, []);

  const [mostLike, setMostLike] = useState<DbAnime[]>();
  const getMostLike = () => {
    const ref = collection(db, 'animes');
    const snap = query(ref, orderBy('listCount', 'desc'), limit(10));
    return onSnapshot(snap, async (snap) => {
      const reviewData = snap.docs.map((doc) => doc.data() as DbAnime);
      setMostLike(reviewData);
    });
  };
  // console.log(mostLike, 'mostLike');

  const filterLikes = mostLike?.map((like) => {
    const sameTitleItem = animes?.find((anime) => anime.title === like.title);
    if (sameTitleItem) {
      return {
        ...like,
        ...sameTitleItem,
      };
    }
  });

  // console.log(filterLikes, 'likeFilter');
  return (
    <>
      {filterLikes ? (
        <ul className="mb-8 grid grid-cols-3 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filterLikes.map((filterLike) => (
            <li
              key={filterLike?.title}
              className="flex w-full flex-col justify-between"
            >
              <Card anime={filterLike as NewAnime}></Card>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex justify-center">
          <RefreshIcon className="w-10 animate-spin text-gray-700" />
        </p>
      )}
    </>
  );
};

export default MostLike;
