import { doc, getDoc } from 'firebase/firestore';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { db } from '../../utils/firebase';
import { DbAnime } from '../../types/DbAnime';
import Image from 'next/image';
import Link from 'next/link';
import { useAnime } from '../../utils/animeContext';
import { EyeIcon, BookmarkIcon, StarIcon } from '@heroicons/react/solid';
import { useAuth } from '../../utils/userContext';
import toast from 'react-hot-toast';
import { listButton, unlistButton } from '../../lib/card';
import Score from '../Score';

type DbAnimePlus = {
  id: string;
  title: string;
  storyScore: number;
  drawingScore: number;
  voiceActorScore: number;
  musicScore: number;
  characterScore: number;
  createAt: number;
  reviewCount: number;
  unScoreReviewCount: number;
  listCount: number;
  year: number;
  quarter: number;
};

const WorkTitle = (props: { id: string }) => {
  const { animes } = useAnime();
  // console.log(animes, 'animes');
  const id = props.id;

  const [workData, setWorkData] = useState<DbAnimePlus>();
  useEffect(() => {
    (async () => {
      const ref = doc(db, `animes/${id}`);
      const snap = await getDoc(ref);
      const data = snap.data() as DbAnime;
      // console.log(data, 'data');
      const newData = animes?.filter((anime) => anime.title === data.title);
      // console.log(newData, 'newData');
      newData?.map((anime) => {
        setWorkData({
          year: anime.year,
          quarter: anime.quarter,
          ...data,
        });
      });
    })();
  }, [id]);
  // console.log(workData, 'workData');
  if (!workData) {
    return null;
  }
  return (
    <>
      <div>
        <Link
          href={`/animes/${workData.year}/${workData.quarter}/${workData?.title}`}
        >
          <a className="font-semibold">
            {workData.title}
            <span className="text-sm"> ({workData.year}製作)</span>
          </a>
        </Link>
      </div>
    </>
  );
};

export default WorkTitle;
