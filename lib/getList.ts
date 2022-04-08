import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { List } from '../types/List';
import { db } from '../utils/firebase';

export const userLists = (uid: string, callback: (lists: List[]) => void) => {
  const ref = query(collectionGroup(db, 'lists'), where('uid', '==', `${uid}`));
  // console.log(ref, 'ref');
  return onSnapshot(ref, async (snap) => {
    // console.log(snap, 'snap');
    const tasks = snap.docs.map((doc) => {
      // console.log(doc.id, 'doc.id');
      return getLists(doc.ref.parent.parent?.id as string, uid as string);
    });
    const lists = await Promise.all(tasks);

    // console.log(animes, 'animes');

    callback(lists);
  });
};

const getLists = async (id: string, uid: string): Promise<List> => {
  //親のコンテンツ取得
  const animeRef = doc(db, `animes/${id}`);
  const animeSnap = await getDoc(animeRef);
  console.log(animeSnap, `animeSnap ${id}`);
  return animeSnap.data() as List;
};
