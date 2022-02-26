import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { RevieData } from '../types/ReviewData';
import { db } from '../utils/firebase';

export const userReviews = (
  uid: string,
  callback: (reviews: RevieData[]) => void
) => {
  const ref = collection(db, `users/${uid}/reviews`);
  // console.log(ref, 'ref');
  return onSnapshot(ref, async (snap) => {
    // console.log(snap, 'snap');
    const tasks = snap.docs.map((doc) => {
      // console.log(doc.id, 'doc.id');
      return getReviwes(doc.id, uid);
    });
    const reviews = await Promise.all(tasks);

    // console.log(animes, 'animes');

    callback(reviews);
  });
};

const getReviwes = async (id: string, uid: string): Promise<RevieData> => {
  const ref = doc(db, `users/${uid}/reviews/${id}`);
  const snap = await getDoc(ref);
  // console.log(snap, 'snap');
  return snap.data() as RevieData;
};
