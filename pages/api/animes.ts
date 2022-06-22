import { NextApiRequest, NextApiResponse } from 'next';
import useSWR from 'swr';
import { Anime, JsonAnime, JsonAnime2 } from '../../types/Anime';
import Slug from '../news/[slug]';
import db from './db.json';
import dbName from './dbName.json';
//test
// type Response = JsonAnime | string;
type Response = JsonAnime[] | string;

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  let limit = Number(req.query.limit);
  let page = Number(req.query.page);
  console.log(limit, 'limit');
  console.log(page, 'page');
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
        // return res.status(200).json(db);
        const data = db.items;
        const dataLength = db.items.length;
        console.log(dataLength, 'dataLength');
        if (req.query) {
          if (page > 1) {
            const result = data.slice(limit * page - 2, limit * page);
            return res.status(200).json(result);
          } else {
            const result = data.slice(0, limit);
            return res.status(200).json(result);
          }
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
