import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';

export const subscribeAllReviews = async (
  id: string,
  setReviews: any,
  setLastVisible: any
) => {
  const ref = collection(db, `animes/${id}/reviews`);
  const reviews = query(ref, orderBy('createAt', 'desc'), limit(2));
  const data = await getDocs(reviews);
  // console.log(data);
  // console.log(data.docs);

  //表示されているレビューの最も最後
  const lastReview = data.docs[data.docs.length - 1];

  setLastVisible(lastReview as any);

  //指定された件数分の後ろからのレビュー
  const getReviews = data.docs.map((item) => {
    return item.data();
  });

  // setNextReviews(getReviews as ReviewData[]);

  //現在表示されているレビュー
  return onSnapshot(reviews, async (snap) => {
    const tasks = snap.docs.map((doc) => {
      return doc.data();
    });
    const allReviews = await Promise.all(tasks);
    // console.log(allReviews, 'allReviews');
    setReviews(allReviews as ReviewData[]);
  });
};

export const getNextSubscribeAllReviews = async (
  id: string,
  setReviews: any,
  reviews: any,
  setLastVisible: any,
  lastVisible: any
) => {
  const ref = collection(db, `animes/${id}/reviews`);
  const next = query(
    ref,
    orderBy('createAt', 'desc'),
    startAfter(lastVisible),
    limit(2)
  );

  //最後から指定された件数分のレビュー
  const nextContents = await getDocs(next);
  // console.log(nextContents, 'nextContents');

  //クリックされて表示されたものの最も最後のレビュー
  const lastReview = nextContents.docs[nextContents.docs.length - 1];

  setLastVisible(lastReview as any);

  const getNextReviews: ReviewData[] = nextContents.docs.map((item) => {
    return item.data() as ReviewData;
  });

  if (reviews) {
    setReviews([...reviews, ...getNextReviews]);
  }

  // 後ろから指定された件数分のレビュー
  // return onSnapshot(next, async (snap) => {
  //   const tasks = snap.docs.map((doc) => {
  //     return doc.data();
  //   });
  //   const nextAllReviews = await Promise.all(tasks);
  //   // console.log(nextAllReviews, 'nextAllReviews');
  //   setNextReviews(nextAllReviews as ReviewData[]);
  // });
};
export const subscribeSpoilerTrueReviews = async (
  id: string,
  setReviews: any,
  setLastVisible: any
) => {
  const ref = collection(db, `animes/${id}/reviews`);
  const reviews = query(
    ref,
    where('spoiler', '==', true),
    orderBy('createAt', 'desc'),
    limit(2)
  );
  const data = await getDocs(reviews);
  const lastReview = data.docs[data.docs.length - 1];

  setLastVisible(lastReview as any);

  const getReviews = data.docs.map((item) => {
    return item.data();
  });

  return onSnapshot(reviews, async (snap) => {
    const tasks = snap.docs.map((doc) => {
      return doc.data();
    });
    const allReviews = await Promise.all(tasks);
    setReviews(allReviews as ReviewData[]);
  });
};

export const getNextSubscribeSpoilerTrueReviews = async (
  id: string,
  setReviews: any,
  reviews: any,
  setLastVisible: any,
  lastVisible: any
) => {
  const ref = collection(db, `animes/${id}/reviews`);
  const next = query(
    ref,
    where('spoiler', '==', true),
    orderBy('createAt', 'desc'),
    startAfter(lastVisible),
    limit(2)
  );
  const nextContents = await getDocs(next);
  const lastReview = nextContents.docs[nextContents.docs.length - 1];

  setLastVisible(lastReview as any);

  const getNextReviews: ReviewData[] = nextContents.docs.map((item) => {
    return item.data() as ReviewData;
  });

  if (reviews) {
    setReviews([...reviews, ...getNextReviews]);
  }
};
export const subscribeSpoilerFalseReviews = async (
  id: string,
  setReviews: any,
  setLastVisible: any
) => {
  const ref = collection(db, `animes/${id}/reviews`);
  const reviews = query(
    ref,
    where('spoiler', '==', false),
    orderBy('createAt', 'desc'),
    limit(2)
  );
  const data = await getDocs(reviews);
  const lastReview = data.docs[data.docs.length - 1];

  setLastVisible(lastReview as any);

  const getReviews = data.docs.map((item) => {
    return item.data();
  });
  return onSnapshot(reviews, async (snap) => {
    const tasks = snap.docs.map((doc) => {
      return doc.data();
    });
    const allReviews = await Promise.all(tasks);
    setReviews(allReviews as ReviewData[]);
  });
};

export const getNextSubscribeSpoilerFalseReviews = async (
  id: string,
  setReviews: any,
  reviews: any,
  setLastVisible: any,
  lastVisible: any
) => {
  const ref = collection(db, `animes/${id}/reviews`);
  const next = query(
    ref,
    where('spoiler', '==', false),
    orderBy('createAt', 'desc'),
    startAfter(lastVisible),
    limit(2)
  );
  const nextContents = await getDocs(next);
  const lastReview = nextContents.docs[nextContents.docs.length - 1];

  setLastVisible(lastReview as any);

  const getNextReviews: ReviewData[] = nextContents.docs.map((item) => {
    return item.data() as ReviewData;
  });

  if (reviews) {
    setReviews([...reviews, ...getNextReviews]);
  }
};
