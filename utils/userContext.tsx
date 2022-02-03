import { onAuthStateChanged } from '@firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  Unsubscribe,
  onSnapshot,
} from '@firebase/firestore';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import {
  subscribeFollowerUsers,
  subscribeFollowUsers,
  subscribeLikes,
} from '../lib/user';
import { User } from '../types/User';
import { auth, db } from './firebase';

//初期値の箱
type AuthContextProps = {
  user: User | null | undefined;
  followerUsers?: User[];
  followUsers?: User[];
  likeIds?: string[];
  loading: boolean;
};

//箱を定義
const AuthContext = createContext<AuthContextProps>({
  //createContextに渡す初期値
  user: undefined,
  loading: true,
  followUsers: undefined,
  followerUsers: undefined,
  likeIds: undefined,
});
//箱の中を詰める
export const AuthProvider: FC = ({ children }) => {
  //それぞれstateで保持
  //自分→User
  const [user, setUser] = useState<User | null>();
  //フォローしているユーザーたち→User[]
  const [followerUsers, setFollowerUsers] = useState<User[]>();
  //フォローしてくれているユーザーたち→User[]
  const [followUsers, setFollowUsers] = useState<User[]>();
  //いいねしているIDたち→string[]
  const [likeIds, setLikeIds] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(true);

  //呼び出されたら一度だけレンダリング
  useEffect(() => {
    //ログインユーザー監視
    let unsubscribeUser: Unsubscribe;
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const userDoc = doc(db, `users/${authUser.uid}`);
        //参照idが無かったらnewUserを登録
        unsubscribeUser = onSnapshot(userDoc, (snap) => {
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

            setDoc(userDoc, newUser);
            setUser(newUser);
          } else {
            setUser(snap.data() as User);
            setLoading(false);
          }
        });
      } else {
        //authUserがあればログイン
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribeUser?.();
      unsubscribeAuth();
    };
  }, []);

  //userが変わるたびにレンダリング
  useEffect(() => {
    if (user) {
      const unsubscribes: Unsubscribe[] = [];

      unsubscribes.push(
        subscribeFollowUsers(user.uid, (users) => setFollowUsers(users))
      );
      unsubscribes.push(
        subscribeFollowerUsers(user.uid, (users) => setFollowerUsers(users))
      );
      unsubscribes.push(subscribeLikes(user.uid, (ids) => setLikeIds(ids)));

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
