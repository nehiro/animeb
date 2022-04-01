import { signInWithCustomToken } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase';
import { useAuth } from '../utils/userContext';
import { Site } from '../lib/site';

const LineLogin = () => {
  const router = useRouter();
  const { user } = useAuth();

  const openLineLoginPage = async () => {
    const stateRef = doc(collection(db, 'lineStates'));
    const state = stateRef.id;

    await setDoc(stateRef, {
      createdAt: Date.now(),
    });

    const url = new URL('https://access.line.me/oauth2/v2.1/authorize');
    url.search = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID as string,
      redirect_uri: `${Site.origin}/line-login`,
      state,
      scope: 'profile openid',
    }).toString();

    location.assign(url);
  };

  useEffect(() => {
    if (router.query.code && router.query.state) {
      fetch('/api/line-custom-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: router.query.code as string,
          state: router.query.state as string,
        }),
      })
        .then((res) => res.text())
        .then((token) => {
          signInWithCustomToken(auth, token).then(() => {
            router.replace(
              {
                query: {
                  id: router.query.id,
                },
              },
              undefined,
              {
                shallow: true,
              }
            );
          });
        });
    }
  }, [router.query.code]);
  return (
    <button
      className="rounded bg-[#06c755] px-3 py-2 text-white shadow"
      onClick={openLineLoginPage}
    >
      LINE でログイン
    </button>
  );
};

export default LineLogin;
