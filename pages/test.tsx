import { User } from 'firebase/auth';
import {
  collection,
  collectionGroup,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';
import useSWR from 'swr';
import Test from '../components/Test';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { ReviewData } from '../types/ReviewData';
import { db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';

const test = () => {
  const { user } = useAuth();
  const userId = user?.uid;
  const reviews = Test(userId as string);
  console.log(reviews, 'reviews');
  return (
    <>
      <ul>
        {reviews?.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </>
  );
};

export default test;
test.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
