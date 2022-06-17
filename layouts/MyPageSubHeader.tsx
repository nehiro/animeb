import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import BackGroundWhite from '../components/BackGroundWhite';
import Button02 from '../components/Button02';
import FollowButton from '../components/FollowButton';
import { userReviews } from '../lib/getReviews';
import { ReviewData } from '../types/ReviewData';
import { User } from '../types/User';
import { db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';
import { UserGroupIcon, UsersIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MyPageSubHeader = (props: { userData: User; userId: string }) => {
  const user = props.userData;
  const userId = props.userId;

  const { user: authUser } = useAuth();

  //ログインユーザーがreviewしているかどうか
  const [otherReviews, setOtherReviews] = useState<ReviewData[]>();

  // console.log(userId, 'userId index');

  const [followCount, setFollowCount] = useState<number>();
  const [followerCount, setFollowerCount] = useState<number>();

  useEffect(() => {
    const otherUserReviews = userReviews(userId, (reviews) =>
      setOtherReviews(reviews)
    );

    const otherUserInfo = async () => {
      const ref = doc(db, `users/${userId}`);
      const snap = await getDoc(ref);
      return snap.data() as User;
    };

    if (userId === user?.uid) {
      setFollowCount(user.followCount);
      setFollowerCount(user.followerCount);
    } else {
      otherUserInfo().then((item) => {
        setFollowCount(item.followCount);
        setFollowerCount(item.followerCount);
      });
    }
  }, [userId]);

  const router = useRouter();
  const getLastPathname = router.pathname.slice(-9);
  // console.log(getLastPathname, 'getLastPathname');

  const followTabs = [
    {
      name: `${followCount ? followCount : 0} following`,
      href: `/users/${userId}/following`,
      icon: UsersIcon,
      current: getLastPathname === 'following' ? true : false,
    },
    {
      name: `${followerCount ? followerCount : 0} followers`,
      href: `/users/${userId}/followers`,
      icon: UserGroupIcon,
      current: getLastPathname === 'followers' ? true : false,
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <BackGroundWhite>
        <div>
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-16 w-16 overflow-hidden rounded-full">
                  <img src={user?.photoURL} alt="" className="h-full" />
                </div>
                <h1 className="font-bold">{user?.name}</h1>
              </div>
              <p>{user?.intro ? user?.intro : '自己紹介が未設定です。'}</p>
            </div>
            {user.uid === authUser?.uid ? '' : <FollowButton user={user} />}
          </div>
          <nav
            className="mt-2 flex justify-start space-x-3 sm:hidden"
            aria-label="Tabs"
          >
            {followTabs.map((tab) => (
              <Link href={tab.href} key={tab.name}>
                <a
                  key={tab.name}
                  className={classNames(
                    tab.current
                      ? 'border-indigo-500 text-gray-700'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'flex border-b-2 py-2 px-1 text-sm font-medium'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  <tab.icon
                    className={classNames(
                      tab.current
                        ? 'text-gray-700'
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
      </BackGroundWhite>
    </>
  );
};

export default MyPageSubHeader;
