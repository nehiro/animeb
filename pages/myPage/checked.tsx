import {
  BookmarkIcon,
  EyeIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { ReactElement, useEffect } from 'react';
import Layout from '../../layouts/Layout';
import MyPageSubHeader from '../../layouts/MyPageSubHeader';
import { auth } from '../../utils/firebase';
import { useAuth } from '../../utils/userContext';

const MyPage = () => {
  //user管理
  const { user } = useAuth();
  //ログインしているかどうか
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user === null && router.replace('/');
    });
  }, []);
  const tabs = [
    { name: 'watched', href: '/myPage', icon: EyeIcon, current: false },
    {
      name: 'checked',
      href: '/myPage/checked',
      icon: BookmarkIcon,
      current: true,
    },
    {
      name: 'following',
      href: '/myPage/following',
      icon: UsersIcon,
      current: false,
    },
    {
      name: 'followers',
      href: '/myPage/followers',
      icon: UserGroupIcon,
      current: false,
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <MyPageSubHeader />
      <section>
        <div className="container">
          <div className="sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <Link href={tab.href}>
                    <a
                      key={tab.name}
                      className={classNames(
                        tab.current
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                      )}
                      aria-current={tab.current ? 'page' : undefined}
                    >
                      <tab.icon
                        className={classNames(
                          tab.current
                            ? 'text-indigo-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          '-ml-0.5 mr-2 h-5 w-5'
                        )}
                        aria-hidden="true"
                      />
                      <span>{tab.name}</span>
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPage;

MyPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
