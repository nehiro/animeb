import {
  BookmarkIcon,
  EyeIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
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
    { name: 'watched', href: '/myPage/watched', icon: EyeIcon, current: true },
    {
      name: 'checked',
      href: '/myPage/checked',
      icon: BookmarkIcon,
      current: false,
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
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
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
