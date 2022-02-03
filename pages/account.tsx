import { ChevronRightIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/Link';
import React, { ReactElement, useEffect } from 'react';
import BackGroundWhite from '../components/BackGroundWhite';
import Breadcrumbs from '../components/Breadcrumbs';
import SubpageTitle from '../components/SubpageTitle';
import Layout from '../layouts/Layout';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { auth } from '../utils/firebase';
import { useAuth } from '../utils/userContext';

const Account = () => {
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
        <SubpageTitle>アカウント情報</SubpageTitle>
        <h2 className="font-bold mb-8 text-center">非公開情報</h2>
        <ul>
          <li>
            <Link href="/accountSetting">
              <a className="flex items-center justify-between bg-bgGray border rounded py-2 px-4 mb-4">
                メールアドレス
                <div>
                  <span className="mr-4">{user?.email}</span>
                  <ChevronRightIcon className="h-6 w-6 inline-block" />
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/accountSetting">
              <a className="flex items-center justify-between bg-bgGray border rounded py-2 px-4 mb-4">
                性別
                <div>
                  <span className="mr-4">
                    {user?.gender ? user?.gender : '未設定'}
                  </span>
                  <ChevronRightIcon className="h-6 w-6 inline-block" />
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/accountSetting">
              <a className="flex items-center justify-between bg-bgGray border rounded py-2 px-4 mb-12">
                生年月日
                <div>
                  <span className="mr-4">{user?.bd ? user?.bd : '未設定'}</span>
                  <ChevronRightIcon className="h-6 w-6 inline-block" />
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/delete">
              <a className="flex items-center justify-between bg-bgGray border rounded py-2 px-4">
                退会する
                <ChevronRightIcon className="h-6 w-6 inline-block" />
              </a>
            </Link>
          </li>
        </ul>
      </BackGroundWhite>
      <Breadcrumbs />
    </>
  );
};

export default Account;

Account.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
