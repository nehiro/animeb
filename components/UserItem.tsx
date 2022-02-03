import {
  deleteDoc,
  doc,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '../utils/userContext';
import { db } from '../utils/firebase';
import Image from 'next/image';
import { User } from '../types/User';

type Props = {
  user: User;
};

const UserItem = ({ user }: Props) => {
  const { user: authUser, followUsers, followerUsers } = useAuth();

  const isFollow = () => {
    return followUsers?.find((listUser) => listUser.uid === user.uid);
  };

  const isFollower = () => {
    return followerUsers?.find((listUser) => listUser.uid === user.uid);
  };

  const updateCount = (
    uid: string,
    key: 'followCount' | 'followerCount',
    num: number
  ) => {
    const ref = doc(db, `users/${uid}`);
    return updateDoc(ref, {
      // ユニオン型の指定の仕方
      [key]: increment(num),
    });
  };

  const follow = (authUserId: string | undefined, targetUserId: string) => {
    if (!authUserId) {
      alert('ログインしてください');
      return;
    }

    const ref = doc(db, `users/${authUserId}/follows/${targetUserId}`);
    setDoc(ref, {
      id: user.uid,
      createAt: Date.now(),
    });
    updateCount(authUserId, 'followCount', 1);
    updateCount(user.uid, 'followerCount', 1);
  };

  const unFollow = (authUserId: string | undefined, targetUserId: string) => {
    if (!authUserId) {
      alert('ログインしてください');
      return;
    }

    const ref = doc(db, `users/${authUserId}/follows/${targetUserId}`);
    deleteDoc(ref);
    updateCount(authUserId, 'followCount', -1);
    updateCount(user.uid, 'followerCount', -1);
  };

  return (
    <div className="flex items-center border bg-white p-4">
      <div className="w-10 h-10 rounded-full mr-2 relative overflow-hidden">
        <Image src={user.photoURL} alt="" layout="fill" />
      </div>

      <div className="flex-1">
        <p>{user.name}</p>
        {isFollower() && (
          <p className="text-gray-500 mt-1 text-sm">フォローされています</p>
        )}
      </div>
      {isFollow() ? (
        <button
          onClick={() => unFollow(authUser?.uid, user.uid)}
          className="text-sm border border-transparent bg-indigo-500 text-white px-2 py-1 rounded-full"
        >
          フォロー中
        </button>
      ) : (
        <button
          onClick={() => follow(authUser?.uid, user.uid)}
          className="text-sm border border-indigo-500 text-indigo-500 px-2 py-1 rounded-full hover:bg-indigo-100"
        >
          フォロー
        </button>
      )}
    </div>
  );
};
export default UserItem;
