import { User } from '../types/User';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Anime } from '../types/Anime';
import { List } from '../types/List';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';

type ListButton = {
  anime: Anime;
  user: User | null | undefined;
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
export const listButton = (props: ListButton) => {
  const user = props.user;
  const anime = props.anime;
  if (!user) {
    alert('ログインしてください');
    return;
  }
  const idRef = doc(collection(db, `users/${user?.uid}/reviews`));
  const id = idRef.id;
  const ref = doc(db, `users/${user?.uid}/lists/${id}`);
  setDoc(ref, {
    id: id,
    title: anime?.title,
    createAt: Date.now(),
  }).then(() => {
    alert(`${anime?.title}を観たいリストに登録しました`);
  });
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
