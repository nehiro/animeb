import { Tab } from '@headlessui/react';
import { ChatAltIcon, HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import {
  collectionGroup,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';
import Button from './Button';

const AnimeReview = (props: { title: string }) => {
  // console.log(props.title);

  const title = props.title;

  const [reviews, setReviews] = useState<ReviewData[]>();

  const subscribeReviews = (callback: (reviews: ReviewData[]) => void) => {
    const ref = collectionGroup(db, `reviews`);
    const animeTitles = query(ref, where('title', '==', title));
    return onSnapshot(animeTitles, async (snap) => {
      const tasks = snap.docs.map((doc) => {
        return doc.data();
      });
      const allReviews = await Promise.all(tasks);
      // console.log(allReviews, 'allReviews');
      callback(allReviews as ReviewData[]);
    });
  };

  useEffect(() => {
    const subscribes: Unsubscribe[] = [];
    subscribes.push(subscribeReviews((reviews) => setReviews(reviews)));
    return () => {
      subscribes.forEach((subscribe) => subscribe());
    };
  }, [title]);

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

  //  {reviews.map((review) => (review.spoiler ? <p>あり</p> : <p>なし</p>))}
  return (
    <div>
      <Tab.Group>
        <Tab.List>
          <ul className="flex items-center justify-between">
            <li className="relative w-1/3 cursor-pointer bg-yellow py-4 text-center">
              <Tab>すべての感想・評価</Tab>
            </li>
            <li className="w-1/3 cursor-pointer bg-lightYellow py-4 text-center">
              <Tab>ネタバレなし</Tab>
            </li>
            <li className="w-1/3 cursor-pointer bg-lightYellow py-4 text-center">
              <Tab>ネタバレあり</Tab>
            </li>
          </ul>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="mb-8 grid grid-cols-1">
              {reviews.map((item) => (
                <div
                  className="container bg-white py-8 even:bg-gray-50"
                  key={item.id}
                >
                  <div className="mb-4 flex">
                    <div className="mr-4 h-12 w-12 rounded-full bg-red-400"></div>
                    <div>
                      <h3>ユーザーネーム</h3>
                      <p>
                        {item.updatedAt
                          ? dateFormat(item.updatedAt)
                          : dateFormat(item.createAt)}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center">
                    <ul className="mr-4 flex items-center">
                      <li>
                        <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                      </li>
                    </ul>
                    <div className="mr-8 text-2xl text-yellow">5.0</div>
                    <div className="border-ts col-span-2 flex items-center">
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
                    </div>
                  </div>
                  {item.review ? (
                    <p className="mb-4 break-words">{item.review}</p>
                  ) : (
                    ''
                  )}
                  {item.tag ? <p className="mb-4">#{item.tag}</p> : ''}
                </div>
              ))}
            </div>
            <Button>もっと見る</Button>
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AnimeReview;
