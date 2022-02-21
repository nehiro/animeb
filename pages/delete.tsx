import { deleteDoc, doc } from '@firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useEffect } from 'react';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { auth, db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';

const Delete = () => {
  const { user } = useAuth();
  //ログインしているかどうか
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user === null && router.replace('/');
    });
  }, []);
  //user削除
  const DeleteUserData = async () => {
    await deleteDoc(doc(db, `users/${user?.uid}`)).then(() => {
      alert('ユーザー情報を削除しました。');
    });
  };
  return (
    <>
      <Breadcrumbs />
      <BackGroundWhite>
        <SubpageTitle>退会</SubpageTitle>
        <p className="mb-8 text-center">
          アニメ部！を退会してもよろしいですか？
          <br />
          これまでの記録はすべて削除されてしまいます。
        </p>
        <p className="text-center">
          <button
            onClick={DeleteUserData}
            className="relative mx-auto inline-block rounded-full bg-buttonBlack py-3 px-12 text-white"
          >
            退会する
          </button>
        </p>
      </BackGroundWhite>
      <Breadcrumbs />
    </>
  );
};

export default Delete;
Delete.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
