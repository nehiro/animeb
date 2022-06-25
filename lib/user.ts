import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
// fetch: プロジェクト内に限られるがwatchしてくれる、エラー、ローディングまで一行でかける
import useSWR from 'swr/immutable';
import { db } from '../utils/firebase';
import { User } from '../types/User';

// 1. useUserから渡ってきたidを基に自分の情報を取得
// 2. subscribeFollowerUsersから渡ってきたidを基にフォローしてくれているユーザーを取得
// 3. subscribeFollowUsersから渡ってきたidを基にフォローしているユーザーを取得
export const getUser = async (id: string): Promise<User> => {
  const ref = doc(db, `users/${id}`);
  const snap = await getDoc(ref);

  return snap.data() as User;
};

export const useUser = (id: string): User | undefined => {
  const { data: user } = useSWR(`users/${id}`, () => {
    // console.log(id, 'useUserid');
    return getUser(id);
  });

  return user;
};

// 自分のフォローユーザーを表示する: 自分のサブコレクションから
// 引数でログインユーザーのuidとusersを返すコールバックj関数(setFollowUsers:hooks)
export const subscribeFollowUsers = (
  uid: string,
  callback: (users: User[]) => void
) => {
  // console.log('走った');
  const ref = collection(db, `users/${uid}/follows`);
  return onSnapshot(ref, async (snap) => {
    const tasks = snap.docs.map((doc) => {
      return getUser(doc.id);
    });
    const users = await Promise.all(tasks);
    // console.log(users, 'users');
    callback(users);
  });
};

// 自分をフォローしてくれているユーザーを表示する: 他のユーザーのfollowサブコレクションをcollectionGroupで一気に参照
// 引数でログインユーザーのuidとusersを返すコールバック関数(setFollowerUsers:hooks)
export const subscribeFollowerUsers = (
  uid: string,
  callback: (users: User[]) => void
) => {
  const ref = collectionGroup(db, `follows`);
  const q = query(ref, where('uid', '==', uid));
  return onSnapshot(q, async (snap) => {
    const tasks = snap.docs.map((doc) => {
      // console.log(doc.id, 'doc.id');
      return getUser(doc.ref.parent.parent?.id as string);
    });
    // console.log(tasks, 'tasks');
    const users = await Promise.all(tasks);
    // console.log(users, 'users');
    callback(users);
  });
};

export const subscribeLikes = (
  uid: string,
  callback: (ids: string[]) => void
) => {
  const ref = collection(db, `users/${uid}/likes`);
  return onSnapshot(ref, async (snap) => {
    // console.log(snap.docs, 'usersnap.docs');
    const ids = snap.docs.map((doc) => doc.id);
    callback(ids);
  });
};
