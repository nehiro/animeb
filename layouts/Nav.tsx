import React, { Fragment, useState } from 'react';
import {
  SparklesIcon,
  XIcon,
  NewspaperIcon,
  FireIcon,
  ClockIcon,
  VideoCameraIcon,
  InformationCircleIcon,
  PencilAltIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  MailIcon,
} from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { SideMenu } from '../types/SideMenu';
import Link from 'next/link';

const Nav = ({ open, toggle }: SideMenu) => {
  const sideNavList01 = [
    {
      href: '/currentQuarter',
      label: '今期のアニメ',
      icon: <SparklesIcon className="h-5 w-5 text-purple" />,
    },
    {
      href: '/trend',
      label: '注目のアニメ',
      icon: <FireIcon className="h-5 w-5 text-purple" />,
    },
    {
      href: '/animes',
      label: '放送・配信時期',
      icon: <ClockIcon className="h-5 w-5 text-purple" />,
    },
    {
      href: '/film',
      label: 'アニメ映画',
      icon: <VideoCameraIcon className="h-5 w-5 text-purple" />,
    },
  ];
  const sideNavList02 = [
    {
      href: '/news',
      label: 'ニュース',
      icon: <NewspaperIcon className="h-5 w-5 text-purple" />,
    },
    {
      href: '/about',
      label: 'アニメ部！について',
      icon: <InformationCircleIcon className="h-5 w-5 text-purple" />,
    },
    {
      href: '/help',
      label: 'ヘルプ',
      icon: <QuestionMarkCircleIcon className="h-5 w-5 text-purple" />,
    },
    {
      href: '/terms',
      label: '利用規約',
      icon: <PencilAltIcon className="h-5 w-5 text-purple" />,
    },
    {
      href: '/privacy',
      label: 'プライバシー',
      icon: <LockClosedIcon className="h-5 w-5 text-purple" />,
    },
    {
      href: '/contact',
      label: 'お問い合せ',
      icon: <MailIcon className="h-5 w-5 text-purple" />,
    },
  ];
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" open={!toggle} onClose={toggle}>
          <div>
            <div className="fixed inset-y-0 left-0 mt-14 flex w-52">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white py-5 shadow-xl sm:py-6">
                    <div className="relative mt-0 flex-1 px-4 sm:mt-6 sm:px-6">
                      <nav>
                        <ul className="mb-5 border-b sm:mb-7">
                          {sideNavList01.map((item) => (
                            <li className="mb-5 sm:mb-7" key={item.label}>
                              <Link href={item.href}>
                                <a className="flex items-center">
                                  <i className="mr-3 leading-none">
                                    {item.icon}
                                  </i>
                                  <span className="text-sm">{item.label}</span>
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <ul className="mb-5 border-b sm:mb-7">
                          {sideNavList02.map((item) => (
                            <li className="mb-5 sm:mb-7" key={item.label}>
                              <Link href={item.href}>
                                <a className="flex items-center">
                                  <i className="mr-3 leading-none">
                                    {item.icon}
                                  </i>
                                  <span className="text-sm">{item.label}</span>
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <small>&copy; 2022 アニメ部！</small>
                      </nav>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Nav;
