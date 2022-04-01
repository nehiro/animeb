import {
  collection,
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';

const AnimeTag = (props: { animeId: string }) => {
  const id = props.animeId;

  const [reviews, setReviews] = useState<ReviewData[]>();

  const subscribeReviews = (callback: (reviews: ReviewData[]) => void) => {
    const ref = collection(db, `animes/${id}/reviews`);
    const reviews = query(ref, orderBy('createAt', 'desc'));
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

  const tags = reviews?.map((review) => review.tag);
  // console.log(tags);
  if (!reviews || !tags) {
    return null;
  }

  return (
    <>
      <ul className="grid-cols-gridResponsive list-none grid list-inside list-decimal justify-items-start gap-4">
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </>
  );
};

export default AnimeTag;
