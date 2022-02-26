import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { List } from '../types/List';
import { db } from '../utils/firebase';

export const userLists = (uid: string, callback: (lists: List[]) => void) => {
  const ref = collection(db, `users/${uid}/lists`);
  // console.log(ref, 'ref');
  return onSnapshot(ref, async (snap) => {
    // console.log(snap, 'snap');
    const tasks = snap.docs.map((doc) => {
      // console.log(doc.id, 'doc.id');
      return getReviwes(doc.id, uid);
    });
    const lists = await Promise.all(tasks);

    // console.log(animes, 'animes');

    callback(lists);
  });
};

const getReviwes = async (id: string, uid: string): Promise<List> => {
  const ref = doc(db, `users/${uid}/lists/${id}`);
  const snap = await getDoc(ref);
  // console.log(snap, 'snap');
  return snap.data() as List;
};
