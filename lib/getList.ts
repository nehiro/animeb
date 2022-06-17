import {
  collectionGroup,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { List } from '../types/List';
import { db } from '../utils/firebase';

export const userLists = (
  userId: string,
  callback: (lists: List[]) => void
) => {
  const ref = query(
    collectionGroup(db, 'lists'),
    where('uid', '==', `${userId}`),
    orderBy('createAt', 'desc')
  );

  return onSnapshot(ref, async (snap) => {
    // const snap = await getDocs(ref);

    const datas = snap.docs.map((item) => {
      return getLists(item.ref.parent.parent?.id as string, userId);
    });

    const lists = await Promise.all(datas);

    // console.log(lists, lists);

    callback(lists);
  });

  // return data as ListData[];
};

const getLists = async (id: string, userId: string): Promise<List> => {
  const animeRef = doc(db, `animes/${id}`);
  const animeSnap = await getDoc(animeRef);
  const newId = animeSnap.data()?.id as string;
  const newTitle = animeSnap.data()?.title as string;
  const animeData = { id: newId, title: newTitle };

  const listRef = doc(db, `animes/${id}/lists/${userId}`);
  const listSnap = await getDoc(listRef);
  const uidOnly = listSnap.data()?.uid as string;
  const addId = {
    uid: uidOnly,
    id: id,
  };

  const newData = {
    ...animeData,
    ...addId,
  };
  // console.log(newData, '5');

  return newData as List;
};
