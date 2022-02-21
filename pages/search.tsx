import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { SearchState } from 'react-instantsearch-core';
import { InstantSearch } from 'react-instantsearch-dom';
import CustomHits from '../components/CustomHits';
import CustomHitsPerPage from '../components/CustomHitsPerPage';
import CustomPagination from '../components/CustomPagination';
import CustomSearchBox from '../components/CustomSearchBox';
import Layout from '../layouts/Layout';
import { searchClient } from './api/client';

const Search = () => {
  const router = useRouter();
  const updateQueryParams = (state: SearchState) => {
    router.push(
      {
        query: {
          q: state.query || [],
          hitsPerPage: state.hitsPerPage || [],
          page: state.page || [],
          sortBy: state.sortBy || [],
          ...state.refinementList,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };
  return (
    <InstantSearch
      onSearchStateChange={updateQueryParams}
      searchClient={searchClient}
      indexName="animes"
    >
      <CustomSearchBox defaultRefinement={router.query.q as string} />
      <CustomHits />
      <CustomPagination defaultRefinement={Number(router.query.page) || 1} />
      <CustomHitsPerPage
        items={[
          {
            value: 5,
            label: '5',
          },
          {
            value: 20,
            label: '20',
          },
          {
            value: 50,
            label: '50',
          },
        ]}
        defaultRefinement={Number(router.query.hitsPerPage as string) || 5}
      />
    </InstantSearch>
  );
};

export default Search;

Search.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
