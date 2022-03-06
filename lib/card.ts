import { User } from '../types/User';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Anime } from '../types/Anime';
import { List } from '../types/List';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';
import useSWR from 'swr';

type ListButton = {
  anime: Anime;
  user: User | null | undefined;
  listAnimes: any;
};

type UnlistButton = {
  anime: Anime;
  user: User | null | undefined;
  lists: List[] | undefined;
};
type DeleteReviweButton = {
  anime: Anime;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null | undefined;
  reviews: ReviewData[] | undefined;
};
//リストに登録する
export const listButton = async (props: ListButton) => {
  const user = props.user;
  const anime = props.anime;
  const dbLists = props.listAnimes.data;
  if (!user) {
    alert('ログインしてください');
    return;
  }
  const idRef = doc(collection(db, `users/${user?.uid}/reviews`));
  const id = idRef.id;
  const ref = doc(db, `users/${user?.uid}/lists/${id}`);
  await setDoc(ref, {
    id: id,
    title: anime?.title,
    createAt: Date.now(),
  }).then(() => {
    alert(`${anime?.title}を観たいリストに登録しました`);
  });

  //listsの中にタイトルあるか
  if (
    dbLists.find((dbList: { title: string }) => dbList.title === anime?.title)
  ) {
    const id = dbLists.find(
      (dbList: { title: string }) => dbList.title === anime?.title
    ).id;
    // console.log(id, 'id');
    // console.log('カウントアップ');
    const animesIDRef = doc(db, `animes/${id}`);
    await updateDoc(animesIDRef, {
      listCount: increment(1),
    });
    // console.log(anime);
  } else {
    const animesIDRef = doc(collection(db, 'animes'));
    const animesID = animesIDRef.id;
    const animesRef = doc(db, `animes/${animesID}`);
    await setDoc(animesRef, {
      id: animesRef.id,
      title: anime?.title,
      createAt: Date.now(),
      reviewCount: 0,
      listCount: 1,
    });
  }
};
//リストから外す
export const unlistButton = (props: UnlistButton) => {
  const user = props.user;
  const anime = props.anime;
  const lists = props.lists;
  if (!user) {
    alert('ログインしてください');
    return;
  }
  const id = lists?.find((listTitle) => listTitle.title === anime?.title)?.id;
  // console.log(id);
  const ref = doc(db, `users/${user?.uid}/lists/${id}`);
  deleteDoc(ref).then(() => {
    alert(`${anime?.title}を観たいリストから外しました`);
  });
};
//reviewを消す
export const deleteReviweButton = (props: DeleteReviweButton) => {
  const user = props.user;
  const anime = props.anime;
  const reviews = props.reviews;
  const setReviewModal = props.setReviewModal;
  if (!user) {
    alert('ログインしてください');
    return;
  }
  const id = reviews?.find((review) => review.title === anime?.title)?.id;
  // console.log(id);
  const ref = doc(db, `users/${user?.uid}/reviews/${id}`);
  deleteDoc(ref).then(() => {
    // reset();
    alert(`${anime?.title}のレビューを削除しました`);
    setReviewModal(false);
  });
};

const updateCount = (
  uid: string,
  key: 'followCount' | 'followerCount',
  num: number
) => {
  const ref = doc(db, `animes/${uid}`);
  return updateDoc(ref, {
    // ユニオン型の指定の仕方
    [key]: increment(num),
  });
};
