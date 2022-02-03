import { NextApiRequest, NextApiResponse } from 'next';
import { Anime } from '../../types/Anime';
import db from './db.json';

type Response = Anime | string;

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  try {
    switch (req.method) {
      // 追加
      case 'POST':
        break;
      // 更新
      case 'UPDATE':
        break;
      // 取得
      case 'GET':
        // console.log('db', db);
        res.status(200).json(db);
        return;
      // 削除
      case 'DELETE':
        break;
    }
    res.status(200).send('OK');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

export default handler;
