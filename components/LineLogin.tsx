import { signInWithCustomToken } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
const [lineLoginURL, setLineLoginURL] = useState<string>();

const fns = getFunctions();
const getLineLoginURL = async () => {
  // stateを生成＆取得
  const callable = httpsCallable(fns, 'createState');
  const state = await callable({});

  const url = new URL('https://access.line.me/oauth2/v2.1/authorize');
  //URLSearchParams
  // urlのパラメーターを取得する。または、引数のオブジェクトをインスタンス化する(今回こっち)
  url.search = new URLSearchParams({
    response_type: 'code', // 固定でcodeとする
    client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID as string, // チャネルのクライアントID
    state, // stateを設定
    scope: 'profile openid email', // LINEから取得する情報
    bot_prompt: 'aggressive', // ログイン時にBOTと連携させたい場合
    redirect_uri: process.env.NEXT_PUBLIC_LINE_REDIRECT_URL as string,
  }).toString();

  setLineLoginURL(url.href);
};

useEffect(() => {
  const code = router.query.code;

  if (!code) {
    return;
  }

  // Firebaseログイン用のカスタムトークン取得
  const callable = httpsCallable(fns, 'getCustomToken');
  const customToken = await callable({ code });

  // 認証（Firebaseログイン）
  signInWithCustomToken(auth, customToken);
}, [router.query.code]);

const LineLogin = () => {
  return (
    <div>
      <a href={lineLoginURL} target="_blank" rel="noopenner">
        LINEでログイン
      </a>
    </div>
  );
};

export default LineLogin;
