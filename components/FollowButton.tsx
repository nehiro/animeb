import React from 'react';
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

type Props = {
  user: User;
};
const FollowButton = ({ user }: Props) => {
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
    <div>
      {/* <div className="flex-1">
        <p>{user.name}</p>
        {isFollower() && (
          <p className="mt-1 text-sm text-gray-500">フォローされています</p>
        )}
      </div> */}
      {isFollow() ? (
        <button
          onClick={() => unFollow(authUser?.uid, user.uid)}
          className="rounded-full border border-transparent bg-purple px-2 py-1 text-sm text-white"
        >
          フォロー中
        </button>
      ) : (
        <button
          onClick={() => follow(authUser?.uid, user.uid)}
          className="rounded-full border border-[#7F80F3] px-2 py-1 text-sm text-[#7F80F3] hover:bg-purple hover:text-white"
        >
          フォロー
        </button>
      )}
    </div>
  );
};

export default FollowButton;
