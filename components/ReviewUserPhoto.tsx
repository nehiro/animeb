import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import useSWR from 'swr';
import { User } from '../types/User';
import Image from 'next/image';
import { db } from '../utils/firebase';

const ReviewUserPhoto = (props: { uid: string }) => {
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
  const userPhoto = users.find((user) => user.uid === uid)?.photoURL;

  return <Image src={userPhoto as string} layout="fill" />;
};

export default ReviewUserPhoto;
