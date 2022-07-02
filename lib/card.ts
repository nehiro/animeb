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
import { ListData } from '../types/ListData';
import toast, { Toaster } from 'react-hot-toast';

type ListButton = {
  anime: Anime;
  user: User | null | undefined;
  dbAnimes: any;
};
type UnlistButton = {
  anime: Anime;
  user: User | null | undefined;
  lists: List[] | undefined;
  dbAnimes: any;
};
type DeleteReviweButton = {
  anime: Anime;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null | undefined;
  reviews: ReviewData[] | undefined;
  dbAnimes: any;
};
//リストに登録する
export const listButton = async (props: ListButton) => {
  const user = props.user;
  const anime = props.anime;
  const dbAnimes = props.dbAnimes;
  // console.log(dbAnimes, 'dbAnimes List');
  if (!user) {
    // alert('ログインしてください');
    toast.error('ログインしてください');
    return;
  }
  // animes/animeid/lists/uid
  //ここがいらない
  // const idRef = doc(collection(db, `animes/${user?.uid}/lists/${user?.uid}`));
  // const id = idRef.id;
  // const ref = doc(db, `users/${user?.uid}/lists/${id}`);
  // await setDoc(ref, {
  //   id: id,
  //   title: anime?.title,
  //   createAt: Date.now(),
  // }).then(() => {
  //   alert(`${anime?.title}を観たいリストに登録しました`);
  // });

  //animesの処理：listsの中にタイトルあるか
  if (
    dbAnimes !== undefined &&
    dbAnimes.find((dbList: { title: string }) => dbList.title === anime?.title)
  ) {
    //id　を取得
    const id = dbAnimes.find(
      (dbList: { title: string }) => dbList.title === anime?.title
    ).id;
    // console.log(id, 'id');
    // console.log('カウントアップ');
    const animesIDRef = doc(db, `animes/${id}`);
    await updateDoc(animesIDRef, {
      listCount: increment(1),
    });
    //lists の処理
    const animesListsRef = doc(db, `animes/${id}/lists/${user?.uid}`);
    await setDoc(animesListsRef, {
      uid: user?.uid,
      createAt: Date.now(),
    }).then(() => {
      toast.success(`${anime?.title}を観たいリストに登録しました`);
    });
    // console.log(anime);
  } else {
    //されていなかったら
    const animesIDRef = doc(collection(db, 'animes'));
    const animesID = animesIDRef.id;
    const animesRef = doc(db, `animes/${animesID}`);
    await setDoc(animesRef, {
      id: animesRef.id,
      title: anime?.title,
      createAt: Date.now(),
      reviewCount: 0,
      unScoreReviewCount: 0,
      sumReviewCount: 0,
      listCount: 1,
      storyScore: 0,
      drawingScore: 0,
      voiceActorScore: 0,
      musicScore: 0,
      characterScore: 0,
    });
    const animesListsRef = doc(db, `animes/${animesID}/lists/${user?.uid}`);
    await setDoc(animesListsRef, {
      uid: user?.uid,
      createAt: Date.now(),
    }).then(() => {
      toast.success(`${anime?.title}を観たいリストに登録しました`);
    });
  }
};
//リストから外す
export const unlistButton = async (props: UnlistButton) => {
  const user = props.user;
  const anime = props.anime;
  const lists = props.lists;
  const dbAnimes = props.dbAnimes;
  // console.log(dbAnimes, 'dbAnimes UnList');
  if (!user) {
    toast.error('ログインしてください');
    return;
  }
  //なんで上手く行くのか
  const id = lists?.find((listTitle) => listTitle.title === anime?.title)?.id;
  // console.log(id);
  const ref = doc(db, `animes/${id}/lists/${user?.uid}`);
  // console.log(ref, 'card ref');
  deleteDoc(ref).then(() => {
    toast.success(`${anime?.title}を観たいリストから外しました`);
  });

  // console.log(dbAnimes, 'card dbAnimes');
  const dbId = dbAnimes.find(
    (dbList: { title: string }) => dbList.title === anime?.title
  ).id;
  // console.log(id, 'id');
  // console.log('カウントダウン');
  const animesIDRef = doc(db, `animes/${dbId}`);
  await updateDoc(animesIDRef, {
    listCount: increment(-1),
  });
};
//reviewを消す
export const deleteReviweButton = async (props: DeleteReviweButton) => {
  // console.log('走った');
  const user = props.user;
  const anime = props.anime;
  const reviews = props.reviews;
  const setReviewModal = props.setReviewModal;
  const dbLists = props.dbAnimes;
  // console.log(dbLists, 'dbLists');
  if (!user) {
    toast.error('ログインしてください');
    return;
  }

  //animesコレクションの処理
  const dbId = dbLists.find(
    (dbList: { title: string }) => dbList.title === anime?.title
  ).id;

  const userReviewsRef = reviews?.find(
    (review) => review.title === anime?.title
  );
  const userStoryScore = userReviewsRef?.storyScore;
  const userDrawingScore = userReviewsRef?.drawingScore;
  const userVoiceActorScore = userReviewsRef?.voiceActorScore;
  const userMusicScore = userReviewsRef?.musicScore;
  const userCharacterScore = userReviewsRef?.characterScore;
  const userIsScore = userReviewsRef?.isScore;
  // console.log(id, 'id');
  // console.log('カウントダウン');
  const animesIDRef = doc(db, `animes/${dbId}`);
  const animesReviewsIDRef = doc(db, `animes/${dbId}/reviews/${user.uid}`);
  if (userIsScore === true) {
    await updateDoc(animesIDRef, {
      storyScore: increment(-(userStoryScore as number)),
      drawingScore: increment(-(userDrawingScore as number)),
      voiceActorScore: increment(-(userVoiceActorScore as number)),
      musicScore: increment(-(userMusicScore as number)),
      characterScore: increment(-(userCharacterScore as number)),
      reviewCount: increment(-1),
      sumReviewCount: increment(-1),
    });
    await deleteDoc(animesReviewsIDRef).then(() => {
      toast.success(`${anime?.title}のレビューを削除しました`);
      setReviewModal(false);
    });
  } else {
    await updateDoc(animesIDRef, {
      unScoreReviewCount: increment(-1),
      sumReviewCount: increment(-1),
    });
    await deleteDoc(animesReviewsIDRef).then(() => {
      toast.success(`${anime?.title}のレビューを削除しました`);
      setReviewModal(false);
    });
  }
};
