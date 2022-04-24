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
} from '@heroicons/react/outline';
import { LoginIcon } from '@heroicons/react/outline';
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

const logout = () => {
  signOut(auth)
    .then(() => {
      alert(`ログアウト完了`);
    })
    .catch((error) => {
      alert(`ログアウト失敗`);
    });
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const Header = ({ toggleSideNav }: { toggleSideNav: VoidFunction }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <header className="fixed top-0 left-0 z-40 flex h-14 w-full items-center justify-between bg-purple">
        <div className="w-full px-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <button className="mr-3" onClick={toggleSideNav}>
                <MenuAlt1Icon className="h-6 w-6" />
              </button>
              <Link href="/">
                <a className="mx-2 flex items-center">
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
              className="relative hidden h-10 max-w-xl flex-1 items-center justify-start rounded-full bg-white px-4 md:flex"
              onClick={() => setIsOpen(true)}
            >
              <SearchIcon className="mr-3 inline-block h-5 w-5 text-gray-500" />
              <p>タイトル検索</p>
            </button>
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
                    <a className="mx-2 hidden max-h-40 min-w-146 items-center justify-center rounded-full bg-yellow px-8 md:flex">
                      <i className="mr-1.5 leading-none">
                        <UserIcon className="inline-block h-5 w-5" />
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
