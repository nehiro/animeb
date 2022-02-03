import type { NextApiRequest, NextApiResponse } from 'next';
import algoliasearch from 'algoliasearch';
import { auth } from '../../firebase/server';

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_ADMIN_KEY as string
);
const index = client.initIndex('posts');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // ログインユーザーの認証トークンを取得
  // console.log(req.headers.authorization, 'token');
  const token = req.headers.authorization?.split(' ')?.[1] as string;
  console.log(token, 'token');
  try {
    // 認証トークンを検証
    await auth.verifyIdToken(token);
  } catch (error) {
    console.log(error);
    return res.status(500).send('error');
  }

  await index.saveObject({
    objectID: req.body.id,
    ...req.body,
  });

  console.log(req.body.id);
  res.status(200).json('success');
};

export default handler;
