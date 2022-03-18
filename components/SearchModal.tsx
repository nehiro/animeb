import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Video } from '../types/Video';
import { debounce } from 'debounce';
import { SearchIndex } from 'algoliasearch/lite';
import { useRouter } from 'next/router';
import { SearchState } from 'react-instantsearch-core';
import { InstantSearch } from 'react-instantsearch-dom';
import CustomHits from './CustomHits';
import CustomHitsPerPage from './CustomHitsPerPage';
import CustomPagination from './CustomPagination';
import CustomSearchBox from './CustomSearchBox';
import Layout from '../layouts/Layout';
import { searchClient } from '../pages/api/client';
import { XIcon } from '@heroicons/react/outline';

type SearchRespons = {
  nbHits: number;
  hits: Video[];
};

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
};

const SearchModal = ({ isOpen, onClose }: Props) => {
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
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen flex items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="my-8 inline-block w-full max-w-lg transform overflow-hidden rounded-lg bg-gray-100 p-6 px-4 pt-5 pb-4 text-left align-middle shadow-xl transition-all">
                {/* <div className="absolute top-2 right-0 block pt-4 pr-4 sm:hidden">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => onClose()}
                  >
                    <span>閉じる</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div> */}
                <InstantSearch
                  onSearchStateChange={updateQueryParams}
                  searchClient={searchClient}
                  indexName="animes"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <CustomSearchBox
                      defaultRefinement={router.query.q as string}
                    />
                    <button
                      type="button"
                      className="block rounded-md text-xl text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:hidden"
                      onClick={() => onClose()}
                    >
                      <i className="ri-eye-close-line"></i>
                    </button>
                  </div>

                  <CustomHits />
                  <CustomPagination
                    defaultRefinement={Number(router.query.page) || 1}
                  />
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
                    defaultRefinement={
                      Number(router.query.hitsPerPage as string) || 5
                    }
                  />
                </InstantSearch>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SearchModal;
function changeIndex(value: string): void {
  throw new Error('Function not implemented.');
}

function setSearchResult(arg0: { nbHits: any; hits: any }) {
  throw new Error('Function not implemented.');
}

function setIndex(videoIndex: any) {
  throw new Error('Function not implemented.');
}
