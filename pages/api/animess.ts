import type { NextApiRequest, NextApiResponse } from 'next';
import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_ADMIN_KEY as string
);
const index = client.initIndex('animes');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await index.saveObject({
    objectID: req.body.id,
    ...req.body,
  });

  res.status(200).json('success');
};

export default handler;
