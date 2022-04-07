import {
  BookmarkIcon,
  EyeIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import Card from '../../../components/card/Card';
import { adminDB } from '../../../firebase/server';
import Layout from '../../../layouts/Layout';
import LayoutNoNav from '../../../layouts/LayoutNoNav';
import MyPageSubHeader from '../../../layouts/MyPageSubHeader';
import { User } from '../../../types/User';
import { useAnime } from '../../../utils/animeContext';
import { auth, db } from '../../../utils/firebase';
import { useAuth } from '../../../utils/userContext';
import useSWR from 'swr';
import {
  collectionGroup,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  where,
  doc,
} from 'firebase/firestore';
import { ReviewData } from '../../../types/ReviewData';
import { DbAnime } from '../../../types/DbAnime';
import { userReviews } from '../../../lib/getReviews';

const MyPage = (props: { userInfo: User }) => {
  //user管理
  const { user, reviews } = useAuth();
  const userId = props.userInfo.uid;
  console.log(userId);
  const userData = props.userInfo;
  const { animes } = useAnime();
  // console.log(user?.uid, 'uid');
  // console.log(props.userInfo.uid, 'props');
  //ログインしているかどうか
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user === null && router.replace('/');
    });
  }, []);
  const tabs = [
    { name: 'watched', href: `/users/${userId}`, icon: EyeIcon, current: true },
    {
      name: 'checked',
      href: `/users/${userId}/checked`,
      icon: BookmarkIcon,
      current: false,
    },
    {
      name: 'following',
      href: `/users/${userId}/following`,
      icon: UsersIcon,
      current: false,
    },
    {
      name: 'followers',
      href: `/users/${userId}/followers`,
      icon: UserGroupIcon,
      current: false,
    },
  ];

  // console.log(reviews, 'reviews');
  const [otherUserReviews, setOtherUserReviews] = useState<ReviewData[]>();
  // console.log(otherUserReviews, 'otherUserReviews');

  useEffect(() => {
    if (userId) {
      userReviews(userId, (reviews) => setOtherUserReviews(reviews));
    }
  }, [userId]);

  const userReviewsFilter = animes?.filter((anime) => {
    return otherUserReviews?.find(
      (reviewTitle) => reviewTitle.title === anime.title
    );
  });
  // console.log(userReviewsFilter, 'userReviewsFilter');

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <MyPageSubHeader userData={userData} />
      <section>
        <div className="container">
          <div className="sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
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
        </div>
      </section>
      <section>
        <div className="container py-4">
          <ul className="mb-8 grid grid-cols-3 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {userReviewsFilter?.map((userReview) => (
              <li
                key={userReview.title}
                className="flex w-full flex-col justify-between"
              >
                <Card anime={userReview}></Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default MyPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const usersRef = adminDB.collection('users');
  const snap = await usersRef.get();
  const paths = snap.docs.map((doc) => `/users/${doc.id}`);
  // console.log(paths, 'paths');
  return {
    paths,
    fallback: false,
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
  };
};

MyPage.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
