import algoliasearch from 'algoliasearch/lite';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY as string;
const adminKey = process.env.ALGOLIA_ADMIN_KEY as string;

export const client = algoliasearch(appId, adminKey);
export const searchClient = algoliasearch(appId, searchKey);
