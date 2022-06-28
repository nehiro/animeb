import type { NextApiRequest, NextApiResponse } from 'next';
import { auth, adminDB } from '../../firebase/server';
import fetch from 'node-fetch';
import { Site } from '../../lib/site';

type LineUser = {
  sub: string;
  name: string;
  picture: string;
  email: string;
};
const getLineClientId = () => {
  if (process.env.NEXT_PUBLIC_PROD === 'true') {
    return process.env.NEXT_PUBLIC_LINE_CLIENT_ID_PROD as string;
  } else {
    return process.env.NEXT_PUBLIC_LINE_CLIENT_ID_DEV as string;
  }
};
const getLineChannelSecret = () => {
  if (process.env.NEXT_PUBLIC_PROD === 'true') {
    return process.env.LINE_CHANNEL_SECRET_PROD as string;
  } else {
    return process.env.LINE_CHANNEL_SECRET_DEV as string;
  }
};
const getIdToken = async (code: string) => {
  // console.log(code, 'code走った');
  // console.log(
  //   {
  //     grant_type: 'authorization_code',
  //     redirect_uri: `${Site.origin}/signup`,
  //     client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID as string,
  //     client_secret: process.env.LINE_CHANNEL_SECRET as string,
  //     code,
  //   },
  //   'URLSearchParams'
  // );
  console.log(Site().origin, 'Site().origin linecustomtken');
  const res = await fetch('https://api.line.me/oauth2/v2.1/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      redirect_uri: `https://anime-club.online/signup`,
      client_id: getLineClientId(),
      client_secret: getLineChannelSecret(),
      code,
    }),
  });
  // redirect_uri: `${Site().origin}/signup`,
  const { id_token } = (await res.json()) as {
    id_token: string;
  };
  // console.log(id_token, 'id_token走った');

  return id_token;
};

const getUserData = async (idToken: string) => {
  // console.log(idToken, 'idToken走った');
  const res = await fetch('https://api.line.me/oauth2/v2.1/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      id_token: idToken,
      client_id: getLineClientId(),
    }),
  });

  return (await res.json()) as LineUser;
};

const createUser = async (lineUser: LineUser) => {
  // console.log(lineUser, 'lineUser');
  console.log(lineUser.sub, 'lineUser.sub');
  // console.log('create-user');
  if (!(await adminDB.doc(`users/${lineUser.sub}`).get()).exists) {
    console.log('1');
    return adminDB.doc(`users/${lineUser.sub}`).set({
      bd: '',
      email: lineUser.email,
      gender: null,
      name: lineUser.name,
      uid: lineUser.sub,
      photoURL: lineUser.picture,
      intro: '',
      followCount: 0,
      followerCount: 0,
      createdAt: Date.now(),
      ranking: [],
    });
  } else {
    const data = await (
      await adminDB.doc(`users/${lineUser.sub}`).get()
    ).data();
    if (data?.deleted === true) {
      console.log('2');
      return adminDB.doc(`users/${lineUser.sub}`).set({
        bd: '',
        email: lineUser.email,
        gender: null,
        name: lineUser.name,
        uid: lineUser.sub,
        photoURL: lineUser.picture,
        intro: '',
        followCount: 0,
        followerCount: 0,
        createdAt: Date.now(),
        ranking: [],
        deleted: false,
      });
    }
    console.log('3');
    return data;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //渡されてきたprops、state、code
  //state LINEの画面に行くと作成されて、リダイレクトで戻ると削除される
  const { state, code } = req.body;

  //adminSDKでアクセス
  if (
    state &&
    code &&
    //なんの為の処理？
    (await adminDB.doc(`lineStates/${state}`).get()).exists
  ) {
    //登録しているものを削除
    await adminDB.doc(`lineStates/${state}`).delete();

    const idToken = await getIdToken(code as string);
    const userData = await getUserData(idToken);

    await createUser(userData);

    const customToken = await auth.createCustomToken(userData.sub);
    return res.status(200).send(customToken);
  }

  res.status(500).send({ error: 'LINEログインに失敗しました' });
};

export default handler;
