import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import useSWR from 'swr';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';

const Test = (userId: string) => {
  const { data } = useSWR('reviews', async () => {
    const ref = query(
      collectionGroup(db, 'reviews'),
      where('uid', '==', `${userId}`)
    );
    console.log(ref, '0');
    const snap = await getDocs(ref);
    console.log(snap, '1');

    const datas = snap.docs.map((item) => {
      console.log(item.ref.parent.parent?.id, '2');
      return getReviews(item.ref.parent.parent?.id as string);
    });
    console.log(datas, '6');

    const reviews = await Promise.all(datas);
    console.log(reviews, '7');

    return reviews;
  });

  const getReviews = async (id: string): Promise<ReviewData> => {
    const animeRef = doc(db, `animes/${id}`);
    const animeSnap = await getDoc(animeRef);
    const newId = animeSnap.data()?.id as string;
    const newTitle = animeSnap.data()?.title as string;
    console.log(newId, newTitle, '3');

    const animeData = { id: newId, title: newTitle };
    const reviewRef = doc(db, `animes/${id}/reviews/${userId}`);
    const reviewSnap = await getDoc(reviewRef);
    const addId = {
      ...(reviewSnap.data() as ReviewData),
      id: id,
    };
    console.log(addId, '4');

    const newData = {
      ...animeData,
      ...addId,
    };
    console.log(newData, '5');

    return newData as ReviewData;
  };

  console.log(data, '8');

  return data as ReviewData[];
};

export default Test;
