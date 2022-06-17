import { StarIcon } from '@heroicons/react/solid';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import useSWR from 'swr';
import {
  getNextSubscribeSpoilerTrueReviews,
  subscribeSpoilerTrueReviews,
} from '../lib/animeReview';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';
import ReviewUserName from './ReviewUserName';
import ReviewUserPhoto from './ReviewUserPhoto';

const AnimeReviewSpoilerTrue = ({ id }: { id: string }) => {
  //現在表示されているレビュー
  const [reviews, setReviews] = useState<ReviewData[]>();
  //後ろから指定された件数分のレビュー
  // const [nextReviews, setNextReviews] = useState<ReviewData[]>();
  //表示されているレビューの最も最後
  const [lastVisible, setLastVisible] = useState<any>();
  // subscribeAllReviews(id, setReviews, setLastVisible);

  useEffect(() => {
    subscribeSpoilerTrueReviews(id, setReviews, setLastVisible);
  }, [id]);

  const getReviewLength = useSWR(`animes/${id}/reviews`, async () => {
    const ref = collection(db, `animes/${id}/reviews`);
    const snap = await getDocs(ref);
    const snapData = snap.docs.map((doc) => doc.data());
    return snapData.length;
  });

  const reviewLength = getReviewLength.data;
  if (!reviews || !reviewLength) {
    return null;
  }
  return (
    <>
      <div className="mb-8 grid grid-cols-1">
        {reviews.map((item) => (
          <div
            className="container bg-white py-4 even:bg-gray-50 sm:py-8"
            key={item.uid}
          >
            <div className="mb-4 flex items-center">
              <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                <ReviewUserPhoto uid={item.uid} />
              </div>
              <div className="mr-4">
                <h3>
                  <ReviewUserName uid={item.uid} />
                </h3>
                <p>{format(item.createAt, 'yyyy/MM/dd')}</p>
              </div>
              {item.spoiler ? (
                <div className="bg-red-600 py-1 px-3 text-white">ネタバレ</div>
              ) : (
                ''
              )}
            </div>
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex items-end">
                <StarIcon className="mx-auto h-7 w-7 text-yellow" />
                <div className="mr-8 text-2xl text-yellow">
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
                </div>
              </div>
              {/* <div className="border-ts col-span-2 flex items-end">
                      <Link href="/">
                        <a className="mr-4 flex items-center">
                          <HeartIcon className="mr-2 h-5 w-5" />
                          <span className="mr-2">いいね！</span>
                          <span>100</span>
                        </a>
                      </Link>
                      <Link href="/">
                        <a className="flex items-center">
                          <ChatAltIcon className="mr-2 h-5 w-5" />
                          <span className="mr-2">コメント</span>
                          <span>100</span>
                        </a>
                      </Link>
                    </div> */}
            </div>
            {item.review ? (
              <p className="mb-4 break-words">{item.review}</p>
            ) : (
              ''
            )}
            {item.tag ? <p>#{item.tag}</p> : ''}
          </div>
        ))}
      </div>
      {reviewLength > 2 ? (
        <div className="text-center">
          <button
            onClick={() =>
              getNextSubscribeSpoilerTrueReviews(
                id,
                setReviews,
                reviews,
                setLastVisible,
                lastVisible
              )
            }
            className="rounded-full bg-buttonBlack py-3 px-12 text-white"
            disabled={lastVisible === undefined}
          >
            もっと見る
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default AnimeReviewSpoilerTrue;
