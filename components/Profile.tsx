import React from 'react';
import { useAuth } from '../utils/userContext';
import UserItem from './UserItem';
import Image from 'next/image';

const Profile = () => {
  const { user, followUsers, followerUsers } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center space-x-2">
        <div className="relative mr-2 h-10 w-10 overflow-hidden rounded-full">
          <Image src={user.photoURL} alt="" layout="fill" />
        </div>
        <p>{user.name}</p>
      </div>

      <h3 className="my-2 space-x-2">
        <span className="font-bold">フォロー</span>
        <span className="text-gray-600">{user.followCount}</span>
      </h3>

      {followUsers?.map((user) => (
        <UserItem key={user.uid} user={user} />
      ))}

      <h3 className="my-2 space-x-2">
        <span className="font-bold">フォロワー</span>
        <span className="text-gray-600">{user.followerCount}</span>
      </h3>

      {followerUsers?.map((user) => (
        <UserItem key={user.uid} user={user} />
      ))}
    </div>
  );
};

export default Profile;
