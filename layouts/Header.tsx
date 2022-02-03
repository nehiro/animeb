import Image from 'next/image';
import Link from 'next/Link';
import { MenuAlt1Icon } from '@heroicons/react/solid';
import {
  CheckIcon,
  CogIcon,
  IdentificationIcon,
  LogoutIcon,
  MusicNoteIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { LoginIcon } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/outline';
import React, { ReactNode, useEffect, useState } from 'react';
import SearchModal from '../components/SearchModal';
import { useAuth } from '../utils/userContext';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  BookmarkAltIcon,
  CalendarIcon,
  ShieldCheckIcon,
  SupportIcon,
} from '@heroicons/react/outline';
import { signOut } from '@firebase/auth';
import { auth } from '../utils/firebase';

const googleLogout = () => {
  signOut(auth)
    .then(() => {
      alert(`ログアウト完了`);
    })
    .catch((error) => {
      alert(`ログアウト失敗`);
    });
};

const resources = [
  {
    name: 'Help Center',
    description:
      'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: SupportIcon,
  },
  {
    name: 'Guides',
    description:
      'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkAltIcon,
  },
  {
    name: 'Events',
    description:
      'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
  {
    name: 'Security',
    description: 'Understand how we take your privacy seriously.',
    href: '#',
    icon: ShieldCheckIcon,
  },
];
const recentPosts = [
  { id: 1, name: 'Boost your conversion rate', href: '#' },
  {
    id: 2,
    name: 'How to use search engine optimization to drive traffic to your site',
    href: '#',
  },
  { id: 3, name: 'Improve your customer experience', href: '#' },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const Header = ({ toggleSideNav }: { toggleSideNav: VoidFunction }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <header className="bg-purple h-14 w-full flex justify-between items-center fixed top-0 left-0 z-40">
        <div className="w-full px-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <button className="mr-3" onClick={toggleSideNav}>
                <MenuAlt1Icon className="h-6 w-6" />
              </button>
              <Link href="/">
                <a className="flex items-center mx-2">
                  <Image
                    src="/images/logo.svg"
                    width="175"
                    height="35"
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <button
              className="h-10 max-w-xl bg-white rounded-full flex-1 relative hidden md:flex items-center justify-between px-4"
              onClick={() => setIsOpen(true)}
            >
              <p>キーワードで検索</p>
              <SearchIcon className="h-5 w-5 inline-block text-gray-500" />
            </button>
            <div className="flex justify-between">
              <Link href="/help">
                <a className="mx-4 hidden md:flex items-center justify-center">
                  <i className="mr-1.5 leading-none">
                    <QuestionMarkCircleIcon className="h-5 w-5 inline-block" />
                  </i>
                  <span className="text-sm font-bold">ヘルプ</span>
                </a>
              </Link>
              {user ? (
                <>
                  <Popover className="w-10 h-10 relative">
                    {({ open }) => (
                      <>
                        <Popover.Button>
                          <div className="w-10 h-10 rounded-full relative overflow-hidden">
                            <Image src={user.photoURL} alt="" layout="fill" />
                          </div>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 right-0 mt-3 px-2 w-48 max-w-md sm:px-0">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-5 sm:py-4 sm:px-6">
                                <Link href="/myPage/watched">
                                  <a>
                                    <i className="mr-1.5 leading-none">
                                      <UserCircleIcon className="h-5 w-5 inline-block text-purple" />
                                    </i>
                                    <span className="text-sm">マイページ</span>
                                  </a>
                                </Link>
                                <Link href="/profile">
                                  <a>
                                    <i className="mr-1.5 leading-none">
                                      <IdentificationIcon className="h-5 w-5 inline-block text-purple" />
                                    </i>
                                    <span className="text-sm">
                                      プロフィール編集
                                    </span>
                                  </a>
                                </Link>
                                <Link href="/account">
                                  <a>
                                    <i className="mr-1.5 leading-none">
                                      <CogIcon className="h-5 w-5 inline-block text-purple" />
                                    </i>
                                    <span className="text-sm">
                                      アカウント情報
                                    </span>
                                  </a>
                                </Link>
                                <Link href="/bestAnime">
                                  <a>
                                    <i className="mr-1.5 leading-none">
                                      <MusicNoteIcon className="h-5 w-5 inline-block text-purple" />
                                    </i>
                                    <span className="text-sm">
                                      ベストアニメ設定
                                    </span>
                                  </a>
                                </Link>
                              </div>
                              <div className="px-5 py-6 sm:py-4 sm:px-6 bg-gray-100">
                                <button
                                  onClick={googleLogout}
                                  className="flex items-center justify-center"
                                >
                                  <i className="mr-1.5 leading-none">
                                    <LogoutIcon className="h-5 w-5 inline-block text-purple" />
                                  </i>
                                  <span className="text-sm font-semibold">
                                    ログアウト
                                  </span>
                                </button>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </>
              ) : (
                <>
                  {/* <Link href="/signin">
                    <a className="px-8 mx-2 rounded-full hidden md:flex items-center justify-center min-w-146 max-h-40 bg-buttonBlack">
                      <i className="mr-1.5 leading-none">
                        <LoginIcon className="h-5 w-5 inline-block text-yellow" />
                      </i>
                      <span className="text-sm text-yellow font-bold">
                        ログイン
                      </span>
                    </a>
                  </Link> */}
                  <Link href="/signup">
                    <a className="px-8 mx-2 bg-yellow rounded-full hidden md:flex items-center justify-center min-w-146 max-h-40">
                      <i className="mr-1.5 leading-none">
                        <UserIcon className="h-5 w-5 inline-block" />
                      </i>
                      <span className="text-sm font-bold">登録・ログイン</span>
                    </a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
