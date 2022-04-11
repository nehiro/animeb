import algoliasearch from 'algoliasearch/lite';
import { MultipleQueriesQuery } from '@algolia/client-search';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY as string;
const adminKey = process.env.ALGOLIA_ADMIN_KEY as string;

export const client = algoliasearch(appId, adminKey);
const algoliaClient = algoliasearch(appId, searchKey);

const mock = {
  hits: [],
  nbHits: 0,
  nbPages: 0,
  page: 0,
  processingTimeMS: 0,
};

export const searchClient = {
  ...algoliaClient,
  search(requests: MultipleQueriesQuery[]) {
    if (requests.every(({ params }) => !params?.query)) {
      return Promise.resolve(mock);
    }
    return algoliaClient.search(requests);
  },
};
