import React from 'react';
import { useAuth } from '../utils/userContext';
import UserItem from './UserItem';

const Following = () => {
  const { user, followUsers, followerUsers } = useAuth();
  if (!user) {
    return null;
  }
  return (
    <>
      {followUsers?.map((user) => (
        <UserItem key={user.uid} user={user} />
      ))}
    </>
  );
};

export default Following;
