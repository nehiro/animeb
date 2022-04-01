import { Tab } from '@headlessui/react';
import { ChatAltIcon, HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  Unsubscribe,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';
import Button from './Button';
import ReviewUserName from './ReviewUserName';
import ReviewUserPhoto from './ReviewUserPhoto';

const AnimeReview = (props: { animeId: string }) => {
  const id = props.animeId;

  const [reviews, setReviews] = useState<ReviewData[]>();
  const [nextReviews, setNextReviews] = useState<ReviewData[]>();

  const subscribeReviews = (callback: (reviews: ReviewData[]) => void) => {
    const ref = collection(db, `animes/${id}/reviews`);
    const reviews = query(ref, orderBy('createAt', 'desc'), limit(2));
    return onSnapshot(reviews, async (snap) => {
      const tasks = snap.docs.map((doc) => {
        return doc.data();
      });
      const allReviews = await Promise.all(tasks);
      callback(allReviews as ReviewData[]);
    });
  };

  useEffect(() => {
    const subscribes: Unsubscribe[] = [];
    subscribes.push(subscribeReviews((reviews) => setReviews(reviews)));
    return () => {
      subscribes.forEach((subscribe) => subscribe());
    };
  }, [id]);

  const nextSubscribeReviews = async (
    callback: (nextReviews: ReviewData[]) => void
  ) => {
    const ref = collection(db, `animes/${id}/reviews`);
    const first = query(ref, orderBy('createAt', 'desc'), limit(2));
    const data = await getDocs(first);
    // console.log(data, 'data');
    const lastVisible = data.docs[data.docs.length - 1];
    // console.log(lastVisible, 'lastVisible');
    const next = query(
      ref,
      orderBy('createAt', 'desc'),
      startAfter(lastVisible),
      limit(2)
    );
    // console.log(next, 'next');
    // const nextData = await getDocs(next);
    // console.log(nextData, 'nextData');
    return onSnapshot(next, async (snap) => {
      const tasks = snap.docs.map((doc) => {
        return doc.data();
      });
      const nextAllReviews = await Promise.all(tasks);
      // console.log(allReviews);
      // setNextReviews(nextAllReviews as ReviewData[]);
      callback(nextAllReviews as ReviewData[]);
    });
  };
  console.log(nextReviews, 'nextReviews');

  useEffect(() => {
    const nextSubscribes: Unsubscribe[] = [];
    async () => {
      nextSubscribes.push(
        await nextSubscribeReviews((nextReviews) => setNextReviews(nextReviews))
      );
    };
    return () => {
      nextSubscribes.forEach((nextSubscribe) => nextSubscribe());
    };
  }, [nextReviews]);

  if (!reviews) {
    return null;
  }

  //日付表示フォーマット
  const dateFormat = (time: number) => {
    const dt = new Date(time);
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth() + 1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return y + '-' + m + '-' + d;
  };

  const tabNames = [
    { name: 'すべての感想・評価' },
    { name: 'ネタバレなし' },
    { name: 'ネタバレあり' },
  ];

  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex items-center justify-between">
          {tabNames.map((tabName) => {
            return (
              <Tab
                className={({ selected }) =>
                  selected
                    ? 'w-1/3 cursor-pointer bg-yellow py-4 text-center'
                    : 'w-1/3 cursor-pointer bg-lightYellow py-4 text-center'
                }
                key={tabName.name}
              >
                {tabName.name}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="mb-8 grid grid-cols-1">
              {reviews.map((item) => (
                <div
                  className="container bg-white py-8 even:bg-gray-50"
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
                      <p>{dateFormat(item.createAt)}</p>
                    </div>
                    {item.spoiler ? (
                      <div className="bg-red-600 py-1 px-3 text-white">
                        ネタバレ
                      </div>
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
              {nextReviews !== undefined
                ? nextReviews.map((item) => (
                    <div
                      className="container bg-white py-8 even:bg-gray-50"
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
                          <p>{dateFormat(item.createAt)}</p>
                        </div>
                        {item.spoiler ? (
                          <div className="bg-red-600 py-1 px-3 text-white">
                            ネタバレ
                          </div>
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
                      </div>
                      {item.review ? (
                        <p className="mb-4 break-words">{item.review}</p>
                      ) : (
                        ''
                      )}
                      {item.tag ? <p>#{item.tag}</p> : ''}
                    </div>
                  ))
                : ''}
            </div>
            <button
              onClick={() =>
                nextSubscribeReviews(() => setNextReviews(nextReviews))
              }
              className="bg-gray-300"
            >
              もっと見る
            </button>
          </Tab.Panel>
          <Tab.Panel>
            {/* {reviews.map((item) => (
              <>
                {!item.spoiler ? (
                  <div
                    key={item.uid}
                    className="container bg-white py-8 even:bg-gray-50"
                  >
                    <div className="mb-4 flex items-center">
                      <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                        <ReviewUserPhoto uid={item.uid} />
                      </div>
                      <div className="mr-4">
                        <h3>
                          <ReviewUserName uid={item.uid} />
                        </h3>
                        <p>{dateFormat(item.createAt)}</p>
                      </div>
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
                    </div>
                    {item.review ? (
                      <p className="mb-4 break-words">{item.review}</p>
                    ) : (
                      ''
                    )}
                    {item.tag ? <p>#{item.tag}</p> : ''}
                  </div>
                ) : (
                  ''
                )}
              </>
            ))} */}
          </Tab.Panel>
          <Tab.Panel>
            {/* {reviews.map((item) => (
              <>
                {item.spoiler ? (
                  <div
                    className="container bg-white py-8 even:bg-gray-50"
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
                        <p>{dateFormat(item.createAt)}</p>
                      </div>
                      <div className="bg-red-600 py-1 px-3 text-white">
                        ネタバレ
                      </div>
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
                    </div>
                    {item.review ? (
                      <p className="mb-4 break-words">{item.review}</p>
                    ) : (
                      ''
                    )}
                    {item.tag ? <p>#{item.tag}</p> : ''}
                  </div>
                ) : (
                  ''
                )}
              </>
            ))} */}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AnimeReview;
