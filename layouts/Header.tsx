import Image from 'next/image';
import { MenuAlt1Icon } from '@heroicons/react/solid';
import {
  CheckIcon,
  CogIcon,
  IdentificationIcon,
  LogoutIcon,
  MusicNoteIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  HeartIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/outline';
import React, { ReactNode, useEffect, useState } from 'react';
import SearchModal from '../components/SearchModal';
import { useAuth } from '../utils/userContext';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { signOut } from '@firebase/auth';
import { auth } from '../utils/firebase';
import Link from 'next/link';
import toast from 'react-hot-toast';

const logout = () => {
  signOut(auth)
    .then(() => {
      toast.success(`ログアウト完了`);
    })
    .catch((error) => {
      toast.error(`ログアウト失敗`);
    });
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const Header = ({ toggleSideNav }: { toggleSideNav: VoidFunction }) => {
  const { user } = useAuth();

  // console.log(user, 'user');
  // console.log(user?.photoURL, 'photoURL');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <SearchModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
      />
      <header className="fixed top-0 left-0 z-40 flex h-14 w-full items-center justify-between bg-purple">
        <div className="w-full px-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <button className="mr-3" onClick={toggleSideNav}>
                <MenuAlt1Icon className="h-6 w-6" />
              </button>
              <Link href="/">
                <a className="mx-0 flex w-36 items-center sm:mx-2 sm:w-auto">
                  <Image
                    src="/images/logo-2.png"
                    width="35"
                    height="35"
                    alt="アニメ部！"
                    decoding="async"
                  />
                  <Image
                    src="/images/logo.svg"
                    width="175"
                    height="35"
                    alt="アニメ部！"
                    decoding="async"
                  />
                </a>
              </Link>
            </div>
            <div className="block flex-1 sm:hidden sm:flex-none"></div>
            {user ? (
              <button
                className="relative mr-4 h-10 max-w-xl items-center justify-start rounded-full focus-visible:outline-none sm:flex sm:flex-1 sm:bg-white sm:px-4 md:mr-0"
                onClick={() => setIsOpen(true)}
              >
                <SearchIcon className="mr-2 inline-block h-6 w-6 text-gray-900 sm:h-5 sm:w-5 sm:text-gray-500" />
                <p className="hidden sm:block">タイトル検索</p>
              </button>
            ) : null}

            <div className="flex justify-between">
              <Link href="/help">
                <a className="mx-4 hidden items-center justify-center md:flex">
                  <i className="mr-1.5 leading-none">
                    <QuestionMarkCircleIcon className="inline-block h-5 w-5" />
                  </i>
                  <span className="text-sm font-bold">ヘルプ</span>
                </a>
              </Link>
              {user ? (
                <>
                  <Popover className="relative h-10 w-10">
                    {({ open }) => (
                      <>
                        <Popover.Button>
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            {user?.photoURL ? (
                              <Image src={user.photoURL} alt="" layout="fill" />
                            ) : (
                              <p className="flex justify-center">
                                <RefreshIcon className="w-10 animate-spin text-gray-700" />
                              </p>
                            )}
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
                          <Popover.Panel className="absolute right-0 z-10 mt-3 w-48 max-w-md px-2 sm:px-0">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-5 sm:py-4 sm:px-6">
                                <Link href={`/users/${user?.uid}`}>
                                  <a>
                                    <i className="mr-1.5 leading-none">
                                      <UserCircleIcon className="inline-block h-5 w-5 text-purple" />
                                    </i>
                                    <span className="text-sm">マイページ</span>
                                  </a>
                                </Link>
                                <Link href="/profile">
                                  <a>
                                    <i className="mr-1.5 leading-none">
                                      <IdentificationIcon className="inline-block h-5 w-5 text-purple" />
                                    </i>
                                    <span className="text-sm">
                                      プロフィール編集
                                    </span>
                                  </a>
                                </Link>
                                <Link href="/account">
                                  <a>
                                    <i className="mr-1.5 leading-none">
                                      <CogIcon className="inline-block h-5 w-5 text-purple" />
                                    </i>
                                    <span className="text-sm">
                                      アカウント情報
                                    </span>
                                  </a>
                                </Link>
                                <Link href="/bestAnime">
                                  <a>
                                    <i className="mr-1.5 leading-none">
                                      <MusicNoteIcon className="inline-block h-5 w-5 text-purple" />
                                    </i>
                                    <span className="text-sm">
                                      ベストアニメ設定
                                    </span>
                                  </a>
                                </Link>
                                <Link href="/cheer">
                                  <a>
                                    <i className="mr-1.5 leading-none">
                                      <HeartIcon className="inline-block h-5 w-5 text-purple" />
                                    </i>
                                    <span className="text-sm">応援する</span>
                                  </a>
                                </Link>
                              </div>
                              <div className="bg-gray-100 px-5 py-6 sm:py-4 sm:px-6">
                                <button
                                  onClick={logout}
                                  className="flex items-center justify-center"
                                >
                                  <i className="mr-1.5 leading-none">
                                    <LogoutIcon className="inline-block h-5 w-5 text-purple" />
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
                  <Link href="/signup">
                    <a className="flex max-h-40 min-w-146 items-center justify-center rounded-full bg-yellow px-2 sm:mx-2 sm:px-8">
                      <i className="mr-1.5 leading-none">
                        <UserIcon className="inline-block h-5 w-5" />
                      </i>
                      <span className="text-xs font-bold sm:text-sm">
                        登録・ログイン
                      </span>
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
