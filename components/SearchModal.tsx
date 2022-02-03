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
          className="fixed z-50 inset-0 overflow-y-auto"
          onClose={onClose}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <select onChange={(e) => changeIndex(e.target.value)}>
                    <option value="desc">長い順</option>
                    <option value="asc">短い順</option>
                  </select>
                  {/* <p>{searchResult?.nbHits}件ヒット</p>
                  <ul>
                    {searchResult?.hits.map((video) => {
                      // return (
                      //   <li key={video.title}>
                      //     {video.title} (再生時間{video.minutes}分)
                      //   </li>
                      // );
                    })}
                  </ul> */}
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
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
