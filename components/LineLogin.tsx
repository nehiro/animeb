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
    //先にID作成
    // console.log('走った');
    const stateRef = doc(collection(db, 'lineStates'));
    const state = stateRef.id;

    //作成日だけデータ突っ込む
    await setDoc(stateRef, {
      createdAt: Date.now(),
    });

    const getLineClientId = () => {
      if (process.env.NEXT_PUBLIC_PROD === 'true') {
        return process.env.NEXT_PUBLIC_LINE_CLIENT_ID_PROD as string;
      } else {
        return process.env.NEXT_PUBLIC_LINE_CLIENT_ID_DEV as string;
      }
    };

    //認証先URLのオブジェクトを作成
    const url = new URL('https://access.line.me/oauth2/v2.1/authorize');
    //url.search：パラメーターを置換する
    //new URLSearchParams：パラメーターと取り出す
    //取り出したPを置換する
    console.log(Site().origin, 'Site().origin');
    url.search = new URLSearchParams({
      response_type: 'code',
      client_id: getLineClientId(),
      redirect_uri: `${Site().origin}/signup`,
      state,
      scope: 'profile openid email',
    }).toString();

    //上で作成したURIを読み込む
    location.assign(url);
  };

  useEffect(() => {
    //router.query：クエリパラメーター
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
        //成功したときのレスポンスに入っているテキストを取得
        .then((res) => res.text())
        //更に成功したときにトークンを使って、signInWithCustomTokenでログイン
        .then((token) => {
          signInWithCustomToken(auth, token).then(() => {
            // console.log(token, 'token');
            // router.replace(
            //   {
            //     //UrlObject
            //     //id=router.query.id
            //     //どこのquery
            //     query: {
            //       id: router.query.id,
            //     },
            //   },
            //   undefined,
            //   {
            //     shallow: true,
            //   }
            // );
          });
        });
    }
    // console.log(router.query.code, 'code');
    // console.log(router.query.state, 'state');
  }, [router.query.code]);
  return (
    <>
      <button
        onClick={openLineLoginPage}
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-line py-1 px-4 text-sm font-medium text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-line focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 377.764 377.764"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#3ACE01"
            d="M77.315 0h223.133c42.523 0 77.315 34.792 77.315 77.315v223.133c0 42.523-34.792 77.315-77.315 77.315H77.315C34.792 377.764 0 342.972 0 300.448V77.315C0 34.792 34.792 0 77.315 0z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#FFF"
            d="M188.515 62.576c76.543 0 138.593 49.687 138.593 110.979 0 21.409-7.576 41.398-20.691 58.351-.649.965-1.497 2.031-2.566 3.209l-.081.088c-4.48 5.36-9.525 10.392-15.072 15.037-38.326 35.425-101.41 77.601-109.736 71.094-7.238-5.656 11.921-33.321-10.183-37.925-1.542-.177-3.08-.367-4.605-.583l-.029-.002v-.002c-64.921-9.223-114.222-54.634-114.222-109.267-.002-61.292 62.049-110.979 138.592-110.979z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#3ACE01"
            d="M108.103 208.954h27.952c3.976 0 7.228-3.253 7.228-7.229v-.603c0-3.976-3.252-7.228-7.228-7.228h-20.121v-45.779c0-3.976-3.252-7.228-7.228-7.228h-.603c-3.976 0-7.228 3.252-7.228 7.228v53.609c0 3.977 3.252 7.23 7.228 7.23zm173.205-33.603v-.603c0-3.976-3.253-7.228-7.229-7.228h-20.12v-11.445h20.12c3.976 0 7.229-3.252 7.229-7.228v-.603c0-3.976-3.253-7.228-7.229-7.228h-27.952c-3.976 0-7.228 3.252-7.228 7.228v53.609c0 3.976 3.252 7.229 7.228 7.229h27.952c3.976 0 7.229-3.253 7.229-7.229v-.603c0-3.976-3.253-7.228-7.229-7.228h-20.12v-11.445h20.12c3.976.002 7.229-3.251 7.229-7.226zm-53.755 31.448l.002-.003a7.207 7.207 0 0 0 2.09-5.07v-53.609c0-3.976-3.252-7.228-7.229-7.228h-.603c-3.976 0-7.228 3.252-7.228 7.228v31.469l-26.126-35.042c-1.248-2.179-3.598-3.655-6.276-3.655h-.603c-3.976 0-7.229 3.252-7.229 7.228v53.609c0 3.976 3.252 7.229 7.229 7.229h.603c3.976 0 7.228-3.253 7.228-7.229v-32.058l26.314 35.941c.162.252.339.494.53.724l.001.002c.723.986 1.712 1.662 2.814 2.075.847.35 1.773.544 2.742.544h.603a7.162 7.162 0 0 0 3.377-.844c.723-.344 1.332-.788 1.761-1.311zm-71.208 2.155h.603c3.976 0 7.228-3.253 7.228-7.229v-53.609c0-3.976-3.252-7.228-7.228-7.228h-.603c-3.976 0-7.229 3.252-7.229 7.228v53.609c0 3.976 3.253 7.229 7.229 7.229z"
          />
        </svg>
        <span className="ml-2">LINEで登録・ログイン</span>
      </button>
    </>
  );
};

export default LineLogin;
