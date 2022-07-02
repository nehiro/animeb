import React from 'react';
import { User } from 'firebase/auth';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';
import { format } from 'date-fns';

type Purchase = {
  id: string;
  status?: 'succeeded';
  created: number;
  items: {
    description: string;
    price: {
      id: string;
      nickname: string;
      unit_amount: number;
    };
  }[];
};

const CheerCheeredList = () => {
  const { user } = useAuth();

  const [purchases, setPurchases] = useState<Purchase[]>();

  useEffect(() => {
    const ref = collection(db, `customers/${user?.uid}/payments`);
    const q = query(
      ref,
      where('status', '==', 'succeeded'),
      orderBy('created', 'desc')
    );
    // console.log(q, 'q');
    return onSnapshot(q, (result) => {
      // console.log(result, 'result');
      setPurchases(result.docs.map((doc) => doc.data() as Purchase));
    });
  }, []);
  // console.log(purchases, 'purchases');
  return (
    <div className="mt-5 text-center">
      <h2 className="mb-2 font-semibold">履歴</h2>
      <ul>
        {purchases?.map((purchase) => {
          const price = purchase.items[0].price;
          return (
            <li key={purchase.id}>
              {/* <span>{purchase.items[0].description}</span> */}
              <span>{price.unit_amount.toLocaleString()}円</span>
              <span className="ml-4">
                {format(purchase.created, 'yyyy/MM/dd')}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CheerCheeredList;
