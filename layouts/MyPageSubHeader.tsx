import React, { useState } from 'react';
import BackGroundWhite from '../components/BackGroundWhite';
import Button02 from '../components/Button02';
import FollowButton from '../components/FollowButton';
import { User } from '../types/User';
import { useAuth } from '../utils/userContext';

const MyPageSubHeader = (props: { userData: User }) => {
  const user = props.userData;

  const { user: authUser } = useAuth();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <BackGroundWhite>
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
      </BackGroundWhite>
    </>
  );
};

export default MyPageSubHeader;
