import { NextApiRequest, NextApiResponse } from 'next';
import { Anime } from '../../types/Anime';
import db from './db.json';

type Response = Anime | string;

export type Anime2 = {
  items: [
    {
      id?: string;
      doing: boolean;
      media: string;
      firstTime: boolean;
      season: number;
      title: string;
      ruby: string;
      url: string;
      pv: string;
      year: number;
      quarter: number;
      staff: string[][];
      op: string[];
      ed: string[];
      summary: string;
      cast: string[][];
      subTitle: string[];
      onair: string[][];
      streaming: string[];
    }
  ];
};
type Response2 = Anime2 | string;

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
        // console.log('res', res);

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
