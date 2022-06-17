import { User } from '../types/User';
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';
import UserItem from './UserItem';

const Following = (props: { otherUserId: string }) => {
  const { user, followUsers, followerUsers } = useAuth();
  // console.log(followerUsers);
  // console.log(followUsers);
  const otherUserId = props.otherUserId;
  // console.log(otherUserId);
  // console.log(user?.uid);
  const [otherUserFollower, setOtherUserFollower] = useState<User[]>();
  useEffect(() => {
    if (otherUserId !== user?.uid) {
      (async () => {
        const followerRef = query(
          collectionGroup(db, 'follows'),
          where('uid', '==', `${otherUserId}`),
          orderBy('createAt', 'desc')
        );
        const snap = await getDocs(followerRef);
        const snapData = snap.docs.map((item) => {
          return getLists(item.ref.parent.parent?.id as string);
        });
        const lists = await Promise.all(snapData);
        setOtherUserFollower(lists);
      })();
    }
  }, [otherUserId]);

  // console.log(otherUserFollower, 'otherUserFollower');

  const getLists = async (id: string): Promise<any> => {
    const userRef = doc(db, `users/${id}`);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    // console.log(userData, 'userData');
    return userData as any;
  };

  if (!user) {
    return null;
  }
  return (
    <>
      {otherUserId
        ? otherUserFollower?.map((user) => (
            // console.log(user)
            <UserItem key={user.uid} user={user} />
          ))
        : followerUsers?.map((user) => <UserItem key={user.uid} user={user} />)}
    </>
  );
};

export default Following;
