import {
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ReactElement, useMemo, useRef, useState } from 'react';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { searchClient } from '../pages/api/client';
import { debounce } from 'debounce';

export type AlgoliaData = {
  objectId: number;
  title: string;
};

const test = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocompleteState, setAutocompleteState] =
    useState<AutocompleteState<AlgoliaData>>();

  // useMemo：値が変わった時だけ実行
  const autocomplete = useMemo(
    () =>
      createAutocomplete<AlgoliaData>({
        id: 'autocomplete-search',
        openOnFocus: true,
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        // onSubmit(params) {
        //   alert(`実際には「${params.state.query}」の検索結果画面に遷移します`);
        // },
        getSources() {
          return [
            {
              sourceId: 'animes',
              getItemInputValue({ item }) {
                return item.title;
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'animes',
                      query,
                      params: {
                        hitsPerPage: 20,
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return `/animes/${item.title}`;
              },
              onSelect(params) {
                router.replace(params.itemUrl as string, undefined, {
                  shallow: true,
                });
              },
            },
          ];
        },
        navigator: {
          navigate({ itemUrl }) {
            router.push(itemUrl);
          },
        },
      }),
    []
  );

  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  const result01 = () => setCount01(count01 + 1);
  const result02 = () => setCount02(count02 + 1);

  // const square = () => {
  //   let i = 0
  //   while (i < 2) i++
  //   return count02 * count02
  // }

  const square = useMemo(() => {
    let i = 0;
    while (i < 200000000000) i++;
    return count02 * count02;
  }, [count02]);

  return (
    <>
      <div {...autocomplete.getRootProps({})}>
        <form
          {...(autocomplete.getFormProps({
            inputElement: inputRef.current,
          }) as any)}
        >
          <input
            {...(autocomplete.getInputProps({
              inputElement: inputRef.current,
            }) as any)}
            id="search-field"
            className="mb-2 block w-full rounded border bg-transparent"
            placeholder="投稿を検索"
            autoComplete="off"
            ref={inputRef}
            type="text"
          />

          <div {...(autocomplete.getPanelProps({}) as any)}>
            {autocompleteState?.isOpen &&
              autocompleteState?.collections.map((collection, index) => {
                const { source, items } = collection;

                return (
                  <div
                    className="w-full overflow-hidden rounded bg-white shadow dark:bg-slate-800"
                    key={`source-${index}`}
                  >
                    {items.length > 0 && (
                      <ul {...autocomplete.getListProps()}>
                        {items.map((item, index) => (
                          <li key={item.title}>
                            <a
                              {...(autocomplete.getItemProps({
                                item,
                                source,
                              }) as any)}
                              className={classNames(
                                'block py-2 pl-3 text-sm',
                                autocompleteState?.activeItemId === index &&
                                  'bg-indigo-600 text-white'
                              )}
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
          </div>
        </form>
      </div>
      {/* <div>result01: {count01}</div>
      <div>result02: {count02}</div> */}
      {/* <div>square: {square()}</div> */}
      {/* <div>square: {square}</div>
      <button onClick={result01}>increment</button>
      <button onClick={result02}>increment</button> */}
    </>
  );
};

export default test;
test.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
