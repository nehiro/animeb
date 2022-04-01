import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import useSWR from 'swr';
import { User } from '../types/User';
import { db } from '../utils/firebase';

const ReviewUserName = (props: { uid: string }) => {
  const uid = props.uid;
  //全user
  const { data: users } = useSWR('users', async () => {
    const ref = collection(db, 'users');
    const snap = await getDocs(ref);
    return snap.docs.map((doc) => doc.data() as User);
  });
  if (!users) {
    return null;
  }
  const userName = users.find((user) => user.uid === uid)?.name;
  return <>{userName}</>;
};

export default ReviewUserName;
