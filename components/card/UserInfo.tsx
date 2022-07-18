import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import { User } from '../../types/User';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../utils/userContext';
import toast from 'react-hot-toast';

const UserInfo = (props: { uid: string }) => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User>();
  const uid = props.uid;
  useEffect(() => {
    const ref = doc(db, `users/${uid}`);
    return onSnapshot(ref, async (snap) => {
      const data = snap.data() as User;
      // if (!data.deleted || data.deleted !== true) {
      setUser(data);
      // }
    });
  }, []);

  // console.log(user);
  if (!user) {
    return null;
  }
  return (
    <div className="mb-2 flex items-center space-x-2">
      <Link href={`users/${user.uid}`}>
        <a className={authUser ? undefined : 'pointer-events-none'}>
          <div className="relative mr-2 h-10 w-10 overflow-hidden rounded-full">
            <Image src={user.photoURL} alt="" layout="fill" />
          </div>
        </a>
      </Link>
      <Link href={`users/${user.uid}`}>
        <a
          className={
            authUser ? 'font-semibold' : 'pointer-events-none font-semibold'
          }
        >
          {user.name}
        </a>
      </Link>
    </div>
  );
};

export default UserInfo;
