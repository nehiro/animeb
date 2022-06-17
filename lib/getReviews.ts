import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import useSWR from 'swr';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';

export const userReviews = (
  userId: string,
  callback: (reviews: ReviewData[]) => void
) => {
  const ref = query(
    collectionGroup(db, 'reviews'),
    where('uid', '==', `${userId}`),
    orderBy('createAt', 'desc')
  );

  return onSnapshot(ref, async (snap) => {
    // const snap = await getDocs(ref);
    const datas = snap.docs.map((item) => {
      return getReviews(item.ref.parent.parent?.id as string, userId as string);
    });

    const reviews = await Promise.all(datas);
    // console.log(reviews, 'reviews');
    callback(reviews);
  });

  // return data as ReviewData[];
};

const getReviews = async (id: string, userId: string): Promise<ReviewData> => {
  const animeRef = doc(db, `animes/${id}`);
  const animeSnap = await getDoc(animeRef);
  const newId = animeSnap.data()?.id as string;
  const newTitle = animeSnap.data()?.title as string;

  const animeData = { id: newId, title: newTitle };
  const reviewRef = doc(db, `animes/${id}/reviews/${userId}`);
  const reviewSnap = await getDoc(reviewRef);
  const addId = {
    ...(reviewSnap.data() as ReviewData),
    id: id,
  };

  const newData = {
    ...animeData,
    ...addId,
  };

  return newData as ReviewData;
};
