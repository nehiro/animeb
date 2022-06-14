import { NextApiRequest, NextApiResponse } from 'next';
import { Anime, JsonAnime, JsonAnime2 } from '../../types/Anime';
import db from './db.json';
import dbName from './dbName.json';
//test
// type Response = JsonAnime2[] | string;
type Response = JsonAnime | string;

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  // console.log(req.query, 'req.query');
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
        // return res.status(200).json(dbName);
        if (req.query.per_page) {
          return res.status(200).json(db);
        } else {
          return res.status(200).json(db);
        }
      // 削除
      case 'DELETE':
        break;
    }
    return res.status(200).send('OK');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

export default handler;
