import { onAuthStateChanged } from '@firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  Unsubscribe,
  onSnapshot,
} from '@firebase/firestore';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { userLists } from '../lib/getList';
import { userReviews } from '../lib/getReviews';
import {
  subscribeFollowerUsers,
  subscribeFollowUsers,
  subscribeLikes,
} from '../lib/user';
import { List } from '../types/List';
import { ReviewData } from '../types/ReviewData';
import { User } from '../types/User';
import { auth, db } from './firebase';

//初期値の箱
type AuthContextProps = {
  user: User | null | undefined;
  followerUsers?: User[] | null;
  followUsers?: User[] | null;
  likeIds?: string[];
  loading: boolean;
  reviews?: ReviewData[] | null;
  lists?: List[] | null;
};

//箱を定義
const AuthContext = createContext<AuthContextProps>({
  //createContextに渡す初期値
  user: undefined,
  loading: true,
  followUsers: undefined,
  followerUsers: undefined,
  likeIds: undefined,
  reviews: undefined,
  lists: undefined,
});
//箱の中を詰める
export const AuthProvider: FC = ({ children }) => {
  //それぞれstateで保持
  //自分→User
  const [user, setUser] = useState<User | null>();
  // console.log(user, 'user');
  //フォローしているユーザーたち→User[]
  const [followerUsers, setFollowerUsers] = useState<User[] | null>();
  //フォローしてくれているユーザーたち→User[]
  const [followUsers, setFollowUsers] = useState<User[] | null>();
  //いいねしているIDたち→string[]
  const [likeIds, setLikeIds] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const [reviews, setReviews] = useState<ReviewData[] | null>();
  const [lists, setLists] = useState<List[] | null>();

  //呼び出されたら一度だけレンダリング
  useEffect(() => {
    //ログインユーザー監視
    let unsubscribeUser: Unsubscribe;
    // ログアウトしたときraviews listなどを空に設定
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      //Q:ここで何をしているか
      unsubscribeUser?.();
      // console.log(unsubscribeUser?.(), 'unsubscribeUser');
      if (authUser) {
        const userDoc = doc(db, `users/${authUser.uid}`);
        // console.log(authUser, 'authUser');
        //参照idが無かったらnewUserを登録
        unsubscribeUser = onSnapshot(userDoc, (snap) => {
          // console.log(snap, 'snap');
          if (!snap.exists()) {
            //データ同期
            const newUser: User = {
              bd: '',
              email: authUser.email as string,
              gender: null,
              name: authUser.displayName as string,
              uid: authUser.uid,
              photoURL: authUser.photoURL as string,
              intro: '',
              followCount: 0,
              followerCount: 0,
              createdAt: Date.now(),
              ranking: [],
            };
            // console.log('データが無かったらこっち、ユーザー作る');
            // console.log('create user');
            setDoc(userDoc, newUser);
            setUser(newUser);
          } else {
            // console.log('アドレスあった');
            // console.log(snap.data(), 'data');
            if (snap.data().deleted === true) {
              // console.log('deleted user');
              return null;
            } else {
              // console.log('dont create user');
              setUser(snap.data() as User);
              setLoading(false);
            }
          }
        });
      } else {
        console.log('ログアウトした');
        //authUserがあればログイン
        // console.log(authUser, 'authUser');
        console.log('ログインしてない');
        setFollowerUsers(null);
        setFollowUsers(null);
        setReviews(null);
        setLists(null);
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      //Q:ここで何をしているか
      // console.log(unsubscribeUser?.(), 'unsubscribeUser');
      // console.log(unsubscribeAuth?.(), 'unsubscribeAuth');
      unsubscribeUser?.();
      unsubscribeAuth();
    };
  }, []);

  //userが変わるたびにレンダリング
  useEffect(() => {
    // console.log('走った');
    // console.log(user, 'user');
    if (user) {
      const unsubscribes: Unsubscribe[] = [];
      unsubscribes.push(
        subscribeFollowUsers(user.uid, (users) => setFollowUsers(users))
      );
      unsubscribes.push(
        subscribeFollowerUsers(user.uid, (users) => setFollowerUsers(users))
      );
      unsubscribes.push(subscribeLikes(user.uid, (ids) => setLikeIds(ids)));

      unsubscribes.push(
        userReviews(user.uid, (reviews) => setReviews(reviews))
      );
      // console.log(reviews, 'reviews');

      unsubscribes.push(userLists(user.uid, (lists) => setLists(lists)));

      //Q:ここで何をしているか
      return () => {
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      };
    }
  }, [user]);

  return (
    //中身を詰めて、箱を配る人を用意する
    <AuthContext.Provider
      value={{
        user,
        loading,
        followUsers,
        likeIds,
        followerUsers,
        reviews,
        lists,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//箱を開ける作業
export const useAuth = () => {
  return useContext<AuthContextProps>(AuthContext);
};
