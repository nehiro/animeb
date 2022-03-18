import {
  collectionGroup,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';

const AnimeTag = (props: { title: string }) => {
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

  const tags = reviews?.map((review) => review.tag);
  // const tags2 = [...new Set(tags)];
  // console.log(...(tags as string[]), 'tags');
  // console.log(tags2);

  if (!reviews || !tags) {
    return null;
  }
  return (
    <ul className="grid-cols-gridResponsive list-none grid list-inside list-decimal justify-items-start gap-4">
      {/* <li>{...tags}</li> */}
    </ul>
  );
};

export default AnimeTag;
