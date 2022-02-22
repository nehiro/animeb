import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import { videoIndex, videoIndexAsc } from '../algolia/client';
import { Video } from '../types/Video';
import { debounce } from 'debounce';
import { SearchIndex } from 'algoliasearch/lite';

type SearchRespons = {
  nbHits: number;
  hits: Video[];
};

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
};

const SearchModal = ({ isOpen, onClose }: Props) => {
  //   const [index, setIndex] = useState<SearchIndex>(videoIndex);
  //   const [searchResult, setSearchResult] = useState<SearchRespons>();
  //   const search = debounce((value: string) => {
  //     index.search<Video>(value).then(({ nbHits, hits }) => {
  //       setSearchResult({
  //         nbHits,
  //         hits,
  //       });
  //     });
  //   }, 500);

  //   const changeIndex = (value: string) => {
  //     switch (value) {
  //       case 'desc':
  //         setIndex(videoIndex);
  //         break;
  //       case 'asc':
  //         setIndex(videoIndexAsc);
  //         break;
  //     }
  //   };

  //   useEffect(() => {
  //     search('');
  //   }, [index]);
  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onClose}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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

            {/* This element is to trick the browser into centering the modal contents. */}
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
              <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={onClose}
                  >
                    Go back to dashboard
                  </button>
                </div>
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
