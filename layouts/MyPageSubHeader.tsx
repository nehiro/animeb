import {
  UserGroupIcon,
  UsersIcon,
  EyeIcon,
  BookmarkIcon,
} from '@heroicons/react/solid';
import React, { useState } from 'react';
import BackGroundWhite from '../components/BackGroundWhite';
import Button02 from '../components/Button02';
import { useAuth } from '../utils/userContext';

const MyPageSubHeader = () => {
  const { user } = useAuth();

  const tabs = [
    { name: 'watched', href: '#', icon: EyeIcon, current: true },
    { name: 'checked', href: '#', icon: BookmarkIcon, current: false },
    { name: 'following', href: '#', icon: UsersIcon, current: false },
    { name: 'followers', href: '#', icon: UserGroupIcon, current: false },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <BackGroundWhite>
        <div className="flex mb-4 items-center">
          <div className="w-16 h-16 rounded-full mr-4 overflow-hidden">
            <img src={user?.photoURL} alt="" className="h-full" />
          </div>
          <h1 className="font-bold">{user?.name}</h1>
        </div>
        <p>{user?.intro ? user?.intro : '自己紹介が未設定です。'}</p>
      </BackGroundWhite>
    </>
  );
};

export default MyPageSubHeader;
