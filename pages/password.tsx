import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useEffect } from 'react';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import SubpageTitle from '../components/SubpageTitle';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { auth } from '../utils/firebase';
import { useAuth } from '../utils/userContext';

const Password = () => {
  //user管理
  const { user } = useAuth();
  //ログインしているかどうか
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user === null && router.replace('/');
    });
  }, []);
  return (
    <>
      <Breadcrumbs />
      <BackGroundWhite>
        <SubpageTitle>パスワード設定</SubpageTitle>
        <form action="">
          <ul className="mb-8">
            <li className=" mb-4">
              <label htmlFor="" className="block font-bold">
                現在のパスワード
                <span className="inline-block bg-red-600 text-white px-2 ml-2 mb-2">
                  必須
                </span>
              </label>
              <input
                type="text"
                className="border rounded w-full box-border h-10 p-2"
                placeholder="パスワードを入力してください"
              />
            </li>
            <li className="mb-4">
              <label htmlFor="" className="block font-bold">
                新しいパスワード
                <span className="inline-block bg-red-600 text-white px-2 ml-2 mb-2">
                  必須
                </span>
              </label>
              <input
                type="text"
                className="border rounded w-full box-border h-10 p-2"
                placeholder="パスワードを入力してください"
              />
            </li>
            <li>
              <label htmlFor="" className="block font-bold">
                新しいパスワードを再入力
                <span className="inline-block bg-red-600 text-white px-2 ml-2 mb-2">
                  必須
                </span>
              </label>
              <input
                type="text"
                className="border rounded w-full box-border h-10 p-2"
                placeholder="パスワードを入力してください"
              />
            </li>
          </ul>

          <Button>保存する</Button>
        </form>
      </BackGroundWhite>
      <Breadcrumbs />
    </>
  );
};

export default Password;
Password.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
