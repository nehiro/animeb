const axios = require('axios');
const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser');
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(req);
  // axiosモジュールを使う
  axios
    // getメソッドを呼び出す
    //https://cal.syoboi.jp/db.php?Command=TitleLookup&TID=3952
    .get(
      `https://cal.syoboi.jp/db.php?Command=${req.body.command}&TID=${req.body.tid}`
    )
    // レスポンスが来たらthenを実行
    .then(function (response: any) {
      const parser = new XMLParser();
      let jObj = parser.parse(response.data);
      // console.log(response.data);
      const builder = new XMLBuilder();
      const xmlContent = builder.build(jObj);
      // console.log(jObj);
      res.status(200).json(jObj);
    })
    // 通信エラーが発生したら
    .catch(function (error: any) {
      // エラーコードを表示
      // console.log(error.status);
    })
    .then(function () {
      // always executed
    });
}
