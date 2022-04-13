import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import useSWR from 'swr';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';

export const userReviews = (userId: string) => {
  const { data } = useSWR(userId && `reviews`, async () => {
    const ref = query(
      collectionGroup(db, 'reviews'),
      where('uid', '==', `${userId}`)
    );
    // console.log(userId, 'userId');
    // console.log(ref, '0');
    const snap = await getDocs(ref);
    // console.log(snap.empty, '1');

    const datas = snap.docs.map((item) => {
      // console.log(item.ref.parent.parent?.id, '2');
      return getReviews(item.ref.parent.parent?.id as string);
    });
    // console.log(datas, '6');

    const reviews = await Promise.all(datas);
    // console.log(reviews, '7');

    return reviews;
  });

  const getReviews = async (id: string): Promise<ReviewData> => {
    const animeRef = doc(db, `animes/${id}`);
    const animeSnap = await getDoc(animeRef);
    const newId = animeSnap.data()?.id as string;
    const newTitle = animeSnap.data()?.title as string;
    // console.log(newId, newTitle, '3');

    const animeData = { id: newId, title: newTitle };
    const reviewRef = doc(db, `animes/${id}/reviews/${userId}`);
    const reviewSnap = await getDoc(reviewRef);
    const addId = {
      ...(reviewSnap.data() as ReviewData),
      id: id,
    };
    // console.log(addId, '4');

    const newData = {
      ...animeData,
      ...addId,
    };
    // console.log(newData, '5');

    return newData as ReviewData;
  };

  // console.log(data, '8');

  return data as ReviewData[];
};

// export const userReviews = (
//   uid: string,
//   callback: (reviews: ReviewData[]) => void
// ) => {
//   const ref = query(
//     collectionGroup(db, 'reviews'),
//     where('uid', '==', `${uid}`)
//   );
//   return onSnapshot(ref, async (snap) => {
//     const tasks = snap.docs.map((doc) => {
//       // const id = doc.ref.parent.parent?.id;
//       // console.log(id, 'id');
//       // return doc.data();
//       return getReviews(doc.ref.parent.parent?.id as string, uid as string);
//     });
//     const reviews = await Promise.all(tasks);

//     // console.log(
//     //   reviews.map((review) => review),
//     //   'review'
//     // );
//     const reviewTitles = reviews.map((review) => review);

//     // console.log(reviewTitles, 'reviewTitles');
//     // console.log(reviews, 'reviews');
//     callback(reviewTitles as ReviewData[]);
//   });
// };

// const getReviews = async (id: string, uid: string): Promise<ReviewData> => {
//   const animeRef = doc(db, `animes/${id}`);
//   const animeSnap = await getDoc(animeRef);
//   // console.log(animeSnap.data(), 'animeSnap.data()');

//   const newId = animeSnap.data()?.id as string;
//   const newTitle = animeSnap.data()?.title as string;

//   // console.log(newTitle, 'title');
//   // console.log(newId, 'id');

//   const animeData = { id: newId, title: newTitle };

//   // console.log(newData);

//   const reviewRef = doc(db, `animes/${id}/reviews/${uid}`);
//   const reviewSnap = await getDoc(reviewRef);
//   // console.log(data, 'data');
//   const addId = {
//     ...(reviewSnap.data() as ReviewData),
//     id: id,
//   };
//   // console.log(addId, 'addId');

//   const newData = {
//     ...animeData,
//     ...addId,
//   };
//   // console.log(newData, newTitle);

//   return newData as ReviewData;
// };
