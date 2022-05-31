import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Video } from '../types/Video';
import { debounce } from 'debounce';
import { SearchIndex } from 'algoliasearch/lite';
import { useRouter } from 'next/router';
import { SearchState } from 'react-instantsearch-core';
import { InstantSearch, PoweredBy } from 'react-instantsearch-dom';
import CustomHits from './CustomHits';
import CustomHitsPerPage from './CustomHitsPerPage';
import CustomPagination from './CustomPagination';
import CustomSearchBox from './CustomSearchBox';
import Layout from '../layouts/Layout';
import { searchClient } from '../pages/api/client';
import { XIcon } from '@heroicons/react/outline';
import AlgoliaAutoComplete from './AlgoliaAutoComplete';

type SearchRespons = {
  nbHits: number;
  hits: Video[];
};

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// const SearchModal = ({ isOpen, onClose, setIsOpen }: Props) => {
const SearchModal = ({ isOpen, onClose, setIsOpen }: Props) => {
  const router = useRouter();
  // const updateQueryParams = (state: SearchState) => {
  //   router.push(
  //     {
  //       query: {
  //         q: state.query || [],
  //         hitsPerPage: state.hitsPerPage || [],
  //         page: state.page || [],
  //         sortBy: state.sortBy || [],
  //         ...state.refinementList,
  //       },
  //     },
  //     undefined,
  //     {
  //       shallow: true,
  //     }
  //   );
  // };

  // // Create the render function
  // const renderPoweredBy = (renderOptions, isFirstRender) => {
  //   const { url, widgetParams } = renderOptions;

  //   widgetParams.container.innerHTML = `
  //   <a href="${url}">Powered by Algolia</a>
  // `;
  // };

  // // Create the custom widget
  // const customPoweredBy =
  //   instantsearch.connectors.connectPoweredBy(renderPoweredBy);

  // // Instantiate the custom widget
  // search.addWidgets([
  //   customPoweredBy({
  //     container: document.querySelector('#powered-by'),
  //   }),
  // ]);

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
            {/* <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="my-8 inline-block w-full max-w-xl transform overflow-hidden rounded-lg bg-gray-100 p-6 px-4 pt-5 pb-4 text-left align-middle shadow-xl transition-all">
                <AlgoliaAutoComplete setIsOpen={setIsOpen} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SearchModal;
