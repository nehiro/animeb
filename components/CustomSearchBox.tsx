import { useForm } from 'react-hook-form';
import { SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { SearchIcon } from '@heroicons/react/outline';

const SearchBoxBase = ({ currentRefinement, refine }: SearchBoxProvided) => {
  const { register, handleSubmit } = useForm<{ q: string }>();

  const search = ({ q }: { q: string }) => {
    refine(q);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(search)}
      role="search"
      className="w-full max-w-lg lg:max-w-xs"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search"
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          placeholder="検索"
          type="search"
          defaultValue={currentRefinement}
          {...register('q')}
          autoComplete="off"
        />
      </div>
    </form>
  );
};

// カスタムウィジェットの作成
const CustomSearchBox = connectSearchBox(SearchBoxBase);

export default CustomSearchBox;
