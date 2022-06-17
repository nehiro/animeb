import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Follow } from '../types/Follow';
import { User } from '../types/User';
import { db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';
import UserItem from './UserItem';

const Following = (props: { otherUserId: string }) => {
  const { user, followUsers, followerUsers } = useAuth();
  const otherUserId = props.otherUserId;
  // console.log(otherUserId);
  // console.log(user?.uid);
  const [otherUserFollowUsers, setOtherUserFollowUsers] = useState<User[]>();
  useEffect(() => {
    if (otherUserId !== user?.uid) {
      // console.log('走った');
      (async () => {
        const ref = query(
          collection(db, `users/${otherUserId}/follows`),
          orderBy('createAt', 'desc')
        );
        const snap = await getDocs(ref);
        // console.log(snap.docs, 'snap.docs');
        const data = snap.docs.map((item) => {
          // console.log(item.ref.parent.parent?.id);
          // console.log(item.data().uid);
          return getUser(item.data().uid as string);
        });
        // console.log(data, 'data');
        const lists = await Promise.all(data);
        // console.log(lists, 'lists');
        setOtherUserFollowUsers(lists);
      })();
    }
  }, [otherUserId]);

  const getUser = async (uid: string) => {
    const ref = doc(db, `users/${uid}`);
    const snap = await getDoc(ref);
    const data = snap.data();
    return data as User;
    // console.log(data, 'data');
  };

  // console.log(otherUserFollowUsers);

  if (!user) {
    return null;
  }
  return (
    <>
      {otherUserId
        ? otherUserFollowUsers?.map((user) => (
            <UserItem key={user.uid} user={user} />
          ))
        : followUsers?.map((user) => <UserItem key={user.uid} user={user} />)}
    </>
  );
};

export default Following;
