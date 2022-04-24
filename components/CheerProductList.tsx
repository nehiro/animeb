import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';

type Price = {
  id: string;
  description: string;
  unit_amount: number;
};

type Product = {
  id: string;
  active: boolean;
  name: string;
  prices: Price[];
};

const CheerProductList = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const ref = collection(db, 'products');
    const q = query(ref, where('active', '==', true));
    // console.log(q, 'q');
    getDocs(q).then(async (snap) => {
      const promises = snap.docs.map(async (doc) => {
        const product = {
          ...(doc.data() as Product),
          id: doc.id,
        };
        // console.log(product, '1');
        const priceRef = collection(db, doc.ref.path, 'prices');
        const priceSnap = await getDocs(priceRef);
        product.prices = priceSnap.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Price;
        });

        return product as Product;
      });

      setProducts(await Promise.all(promises));
    });
  }, []);
  // console.log(products, 'products');

  if (!user) {
    return null;
  }

  const redirectToCheckout = async (priceId: string) => {
    const collectionRef = collection(
      db,
      `customers/${user.uid}/checkout_sessions`
    );
    const docRef = await addDoc(collectionRef, {
      mode: 'payment',
      billing_address_collection: 'auto',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
      line_items: [
        {
          price: priceId,
          tax_rates: ['txr_1Krv0gDGQuUJ28l7JJUgDOWg'],
          quantity: 1,
        },
      ],
    });

    onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() as {
        url: string;
        error: Error;
      };

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (url) {
        window.location.assign(url);
      }
    });
  };
  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          {product.prices.map((price) => (
            <div key={price.id}>
              {price.description || 'デフォルト'} -{' '}
              {price.unit_amount.toLocaleString()}円
              <button
                onClick={() => redirectToCheckout(price.id)}
                className="rounded bg-purple p-2 text-white"
              >
                応援する
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default CheerProductList;
