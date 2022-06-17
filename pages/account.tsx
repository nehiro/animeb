import { ChevronRightIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
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
      <Breadcrumbs
        pages={[
          {
            name: 'アカウント情報',
          },
        ]}
      />
      <BackGroundWhite>
        <SubpageTitle>アカウント情報</SubpageTitle>
        <h2 className="mb-8 text-center font-bold">非公開情報</h2>
        <ul>
          <li>
            <Link href="/accountSetting">
              <a className="mb-4 flex items-center justify-between rounded border bg-gray-50 py-2 px-4">
                メールアドレス
                <div>
                  <span className="mr-4">{user?.email}</span>
                  <ChevronRightIcon className="inline-block h-6 w-6" />
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/accountSetting">
              <a className="mb-4 flex items-center justify-between rounded border bg-gray-50 py-2 px-4">
                性別
                <div>
                  <span className="mr-4">
                    {user?.gender ? user?.gender : '未設定'}
                  </span>
                  <ChevronRightIcon className="inline-block h-6 w-6" />
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/accountSetting">
              <a className="mb-12 flex items-center justify-between rounded border bg-gray-50 py-2 px-4">
                生年月日
                <div>
                  <span className="mr-4">{user?.bd ? user?.bd : '未設定'}</span>
                  <ChevronRightIcon className="inline-block h-6 w-6" />
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/delete">
              <a className="flex items-center justify-between rounded border bg-gray-50 py-2 px-4">
                退会する
                <ChevronRightIcon className="inline-block h-6 w-6" />
              </a>
            </Link>
          </li>
        </ul>
      </BackGroundWhite>
      <Breadcrumbs
        pages={[
          {
            name: 'アカウント情報',
          },
        ]}
      />
    </>
  );
};

export default Account;

Account.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
