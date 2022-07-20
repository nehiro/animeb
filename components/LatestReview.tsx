import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { db } from '../utils/firebase';
import { ReviewData } from '../types/ReviewData';
import UserInfo from './card/UserInfo';
import { DbAnime } from '../types/DbAnime';
import WorkPicture from './card/WorkPicture';
import WorkTitle from './card/WorkTitle';
import { formatDistanceToNow } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { StarIcon } from '@heroicons/react/solid';
import ShowMoreText from 'react-show-more-text';

const LatestReview = () => {
  //最新から1０件
  useEffect(() => {
    getLatestReview();
  }, []);

  const [latestReview, setLatestReview] = useState<ReviewData[]>();
  const getLatestReview = () => {
    const ref = collectionGroup(db, 'reviews');
    const snap = query(ref, orderBy('createAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(snap, async (snap) => {
      // const snap = await getDocs(q);
      const reviewData = snap.docs.map((doc) => ({
        ...(doc.data() as ReviewData),
        id: doc.ref.parent.parent?.id as string,
      }));
      // console.log(reviewData, 'reviewData');
      setLatestReview(reviewData);
    });
    return () => {
      unsubscribe();
    };
  };

  // console.log(latestReview, 'latestReview');

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {latestReview?.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 border p-5">
            <div className="space-y-1">
              <UserInfo uid={item.uid}></UserInfo>
              <p className="text-sm">
                {formatDistanceToNow(item.createAt, {
                  locale: ja,
                  addSuffix: true,
                })}
              </p>
              <div>
                <WorkTitle id={item.id}></WorkTitle>
              </div>
              <p className="flex items-end text-2xl text-yellow ">
                <StarIcon className="h-7 w-7 text-yellow" />
                {item.isScore
                  ? (
                      (item.storyScore +
                        item.characterScore +
                        item.drawingScore +
                        item.voiceActorScore +
                        item.musicScore) /
                      5
                    ).toFixed(1)
                  : '-'}
              </p>
              {item.spoiler ? (
                <p className="text-red-500">ネタバレあり</p>
              ) : null}
              {item.review ? (
                <ShowMoreText
                  width={500}
                  more="もっとみる"
                  less="閉じる"
                  anchorClass="text-purple"
                  className="text-sm"
                >
                  <p className="text-sm">{item.review}</p>
                </ShowMoreText>
              ) : null}
              {item.tag ? <p className="text-sm">#{item.tag}</p> : null}
            </div>
            <WorkPicture id={item.id}></WorkPicture>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestReview;
