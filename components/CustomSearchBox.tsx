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
      className="w-64 sm:w-full sm:max-w-full"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-purple" aria-hidden="true" />
        </div>
        <input
          id="search"
          className="block w-full rounded-md border-2 border-purple bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-0 focus:ring-indigo-500 sm:text-sm"
          placeholder="タイトル検索"
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
