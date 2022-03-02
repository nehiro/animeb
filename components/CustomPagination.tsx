import React from 'react';
import { connectPagination } from 'react-instantsearch-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const Pagination = ({
  currentRefinement,
  nbPages,
  refine,
}: {
  currentRefinement: number;
  nbPages: number;
  refine: (value: number) => void;
}) => {
  return (
    <>
      <div className="relative z-0 mt-2 inline-flex rounded-md shadow-sm">
        {currentRefinement > 1 && (
          <button
            onClick={() => refine(currentRefinement - 1)}
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-amber-100"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        {nbPages > currentRefinement && (
          <button
            onClick={() => refine(currentRefinement + 1)}
            className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-amber-100"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </>
  );
};

const CustomPagination = connectPagination(Pagination);

export default CustomPagination;
