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
// import { listData } from '../types/listData';
import { List } from '../types/List';
import { ListData } from '../types/ListData';
import { db } from '../utils/firebase';

export const userLists = (userId: string) => {
  const { data } = useSWR(userId && `lists`, async () => {
    const ref = query(
      collectionGroup(db, 'lists'),
      where('uid', '==', `${userId}`)
    );
    // console.log(userId, 'userId');
    // console.log(ref, '0');
    const snap = await getDocs(ref);
    // console.log(snap.empty, '1');

    const datas = snap.docs.map((item) => {
      // console.log(item.ref.parent.parent?.id, '2');
      return getLists(item.ref.parent.parent?.id as string);
    });
    // console.log(datas, '6');

    const lists = await Promise.all(datas);
    // console.log(lists, '7');

    return lists;
  });

  const getLists = async (id: string): Promise<ListData> => {
    const animeRef = doc(db, `animes/${id}`);
    const animeSnap = await getDoc(animeRef);
    const newId = animeSnap.data()?.id as string;
    const newTitle = animeSnap.data()?.title as string;
    // console.log(newId, newTitle, '3');

    const animeData = { id: newId, title: newTitle };
    const listRef = doc(db, `animes/${id}/lists/${userId}`);
    const listSnap = await getDoc(listRef);
    const uidOnly = listSnap.data()?.uid as string;
    const addId = {
      uid: uidOnly,
      id: id,
    };
    // console.log(addId, '4');

    const newData = {
      ...animeData,
      ...addId,
    };
    // console.log(newData, '5');

    return newData as ListData;
  };

  // console.log(data, '8');

  return data as ListData[];
};

// export const userLists = (uid: string, callback: (lists: List[]) => void) => {
//   const ref = query(collectionGroup(db, 'lists'), where('uid', '==', `${uid}`));
//   // console.log(ref, 'ref');
//   return onSnapshot(ref, async (snap) => {
//     // console.log(snap, 'snap');
//     const tasks = snap.docs.map((doc) => {
//       // console.log(doc.id, 'doc.id');
//       return getLists(doc.ref.parent.parent?.id as string, uid as string);
//     });
//     const lists = await Promise.all(tasks);

//     // console.log(animes, 'animes');

//     callback(lists);
//   });
// };

const getLists = async (id: string, uid: string): Promise<List> => {
  //親のコンテンツ取得
  const animeRef = doc(db, `animes/${id}`);
  const animeSnap = await getDoc(animeRef);
  console.log(animeSnap, `animeSnap ${id}`);
  return animeSnap.data() as List;
};
