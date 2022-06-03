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
import toast from 'react-hot-toast';
import Link from 'next/link';

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
      toast.error('ログインしてください');
      return;
    }

    const ref = doc(db, `users/${authUserId}/follows/${targetUserId}`);
    setDoc(ref, {
      uid: user.uid,
      createAt: Date.now(),
    });
    updateCount(authUserId, 'followCount', 1);
    updateCount(user.uid, 'followerCount', 1);
  };

  const unFollow = (authUserId: string | undefined, targetUserId: string) => {
    if (!authUserId) {
      toast.error('ログインしてください');
      return;
    }

    const ref = doc(db, `users/${authUserId}/follows/${targetUserId}`);
    deleteDoc(ref);
    updateCount(authUserId, 'followCount', -1);
    updateCount(user.uid, 'followerCount', -1);
  };

  return (
    <div className="flex items-center justify-between border bg-white p-4">
      <Link href={`/users/${user.uid}`}>
        <a className="flex items-center">
          <div className="relative mr-2 h-10 w-10 overflow-hidden rounded-full">
            <Image src={user.photoURL} alt="" layout="fill" />
          </div>

          <div className="flex-1">
            <p>{user.name}</p>
            {isFollower() && (
              <p className="mt-1 text-sm text-gray-500">フォローされています</p>
            )}
          </div>
        </a>
      </Link>

      {user.uid !== authUser?.uid ? (
        isFollow() ? (
          <button
            onClick={() => unFollow(authUser?.uid, user.uid)}
            className="rounded-full border border-transparent bg-indigo-500 px-2 py-1 text-sm text-white"
          >
            フォロー中
          </button>
        ) : (
          <button
            onClick={() => follow(authUser?.uid, user.uid)}
            className="rounded-full border border-indigo-500 px-2 py-1 text-sm text-indigo-500 hover:bg-indigo-100"
          >
            フォロー
          </button>
        )
      ) : null}
    </div>
  );
};
export default UserItem;
