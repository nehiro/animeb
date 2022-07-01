import {
  BookmarkIcon,
  EyeIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { doc, getDoc } from 'firebase/firestore';
import { list } from 'firebase/storage';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Card from '../../../components/card/Card';
import { adminDB } from '../../../firebase/server';
import Layout from '../../../layouts/Layout';
import LayoutNoNav from '../../../layouts/LayoutNoNav';
import MyPageSubHeader from '../../../layouts/MyPageSubHeader';
import { userLists } from '../../../lib/getList';
import { Anime } from '../../../types/Anime';
import { List } from '../../../types/List';
import { User } from '../../../types/User';
import { useAnime } from '../../../utils/animeContext';
import { auth, db } from '../../../utils/firebase';
import { useAuth } from '../../../utils/userContext';

const MyPage = (props: { userInfo: User }) => {
  //user管理
  const { user, lists } = useAuth();
  const userId = props.userInfo.uid;
  const userData = props.userInfo;
  const { animes } = useAnime();
  //ログインしているかどうか
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user === null && router.replace('/');
    });
  }, []);

  //Fallback発生中
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  //ログインユーザーがlistしているかどうか
  const [otherLists, setOtherLists] = useState<List[]>();
  const [followCount, setFollowCount] = useState<number>();
  const [followerCount, setFollowerCount] = useState<number>();
  const [userUri, setUserUri] = useState<string>();
  useEffect(() => {
    const otherUserLists = userLists(userId, (lists) => setOtherLists(lists));
    const otherUserInfo = async () => {
      const ref = doc(db, `users/${userId}`);
      const snap = await getDoc(ref);
      return snap.data() as User;
    };

    if (userId === user?.uid) {
      setFollowCount(user.followCount);
      setFollowerCount(user.followerCount);
      setUserUri('マイページ');
    } else {
      otherUserInfo().then((item) => {
        setFollowCount(item.followCount);
        setFollowerCount(item.followerCount);
      });
      setUserUri(userData.name);
    }
  }, [userId]);
  const smTabs = [
    {
      name: 'watched',
      href: `/users/${userId}`,
      icon: EyeIcon,
      current: false,
    },
    {
      name: 'checked',
      href: `/users/${userId}/checked`,
      icon: BookmarkIcon,
      current: true,
    },
    {
      name: `${followCount ? followCount : 0} following`,
      href: `/users/${userId}/following`,
      icon: UsersIcon,
      current: false,
    },
    {
      name: `${followerCount ? followerCount : 0} followers`,
      href: `/users/${userId}/followers`,
      icon: UserGroupIcon,
      current: false,
    },
  ];
  const workTabs = [
    {
      name: 'watched',
      href: `/users/${userId}`,
      icon: EyeIcon,
      current: false,
    },
    {
      name: 'checked',
      href: `/users/${userId}/checked`,
      icon: BookmarkIcon,
      current: true,
    },
  ];

  const newLists = otherLists?.map((listTitle) => {
    const sameTitleItem = animes?.find(
      (anime) => anime.title === listTitle.title
    );
    // console.log(sameTitleItem);
    if (sameTitleItem) {
      return {
        ...listTitle,
        ...sameTitleItem,
      };
    }
  });

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <Breadcrumbs
        pages={[
          {
            name: userUri as string,
          },
        ]}
      />
      <MyPageSubHeader userData={userData} userId={userId} />
      <section className="block sm:hidden">
        <nav className="-mb-px flex justify-between" aria-label="Tabs">
          {workTabs.map((tab) => (
            <Link href={tab.href} key={tab.name}>
              <a
                key={tab.name}
                className={classNames(
                  tab.current
                    ? 'bg-yellow'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex flex-1 items-center justify-center border-b-2 py-4 px-1 text-sm font-medium'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.current
                      ? 'text-black'
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
      </section>
      <section className="hidden sm:block">
        <div className="container">
          <div className="border-b border-gray-200">
            <nav
              className="-mb-px flex justify-between sm:justify-start sm:space-x-8"
              aria-label="Tabs"
            >
              {smTabs.map((tab) => (
                <Link href={tab.href} key={tab.name}>
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
      </section>
      <section>
        <div className="container py-4">
          <ul className="mb-8 grid grid-cols-3 justify-items-center gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {newLists?.map((newList) => (
              <li
                key={newList?.title}
                className="flex w-full flex-col justify-between"
              >
                <Card anime={newList as Anime}></Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Breadcrumbs
        pages={[
          {
            name: userUri as string,
          },
        ]}
      />
    </>
  );
};

export default MyPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const usersRef = adminDB.collection('users');
  const snap = await usersRef.get();
  const paths = snap.docs.map((doc) => `/users/${doc.id}/checked`);
  // console.log(paths, 'paths');
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log(params, 'params');
  const usersRef = adminDB.collection('users').doc(`${params?.slug}`);
  // console.log(usersRef, 'usersRef');
  const snap = await usersRef.get();
  // console.log(snap, 'snap');
  // console.log(snap.data(), 'snap.data()');
  const userInfo = snap.data();
  // console.log(userInfo, 'userInfo');
  return {
    props: { userInfo },
    revalidate: 1,
  };
};

MyPage.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
