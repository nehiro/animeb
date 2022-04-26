import {
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults, autocomplete } from '@algolia/autocomplete-js';
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import { searchClient } from '../pages/api/client';

export type AlgoliaData = {
  objectId: string;
  objectID: string;
  title: string;
};

type Debounce = {
  fn: any;
  time: number;
};

const AlgoliaAutoComplete = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocompleteState, setAutocompleteState] =
    useState<AutocompleteState<AlgoliaData>>();

  const debounced = debouncePromise(
    (items: Debounce) => Promise.resolve(items),
    500
  );
  function debouncePromise(fn: any, time: number) {
    // console.log(fn, 'fn');
    let timerId: NodeJS.Timeout | undefined = undefined;

    return function debounced(...args: any[]) {
      // console.log(args, 'args');
      if (timerId) {
        // console.log(typeof timerId, 'timerId');
        clearTimeout(timerId);
      }

      return new Promise((resolve) => {
        timerId = setTimeout(() => resolve(fn(...args)), time);
        // console.log(timerId, 'timerId');
      });
    };
  }

  // useMemo：値が変わった時だけ実行
  const autocomplete = useMemo(
    () =>
      createAutocomplete<AlgoliaData>({
        id: 'autocomplete-search',
        //未入力でもタイトル出すか
        openOnFocus: false,
        //inputの状態が変わるたびに呼び出される
        onStateChange({ state }) {
          // {
          //   console.log(state, 'state');
          // }
          setAutocompleteState(state);
        },
        placeholder: 'タイトルを入力',
        // onSubmit(params) {
        //   alert(`実際には「${params.state.query}」の検索結果画面に遷移します`);
        // },

        //データ取得場所
        getSources() {
          return debounced([
            {
              sourceId: 'animes',
              getItemInputValue({ item }: { item: AlgoliaData }) {
                // {
                //   console.log(item, 'item');
                // }
                return item.title;
              },
              //取得するアイテムを絞る
              getItems({ query }: { query: string }) {
                //query：入力された文字
                // {
                //   console.log(typeof query, 'query');
                // }
                return getAlgoliaResults({
                  searchClient,
                  //animesからqueryの文字で20件取得
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
              //アイテムにリンクを返す
              getItemUrl({ item }: { item: AlgoliaData }) {
                // {
                //   console.log(item, 'item');
                // }
                //itemはアルゴリアから引っ張ってきたそれぞれのデータ
                return `/animes/${item.title}`;
              },
              //アイテムをクリックした時に走る
              onSelect(params: { itemUrl: string }) {
                // {
                //   console.log(params, 'params');
                // }
                router.replace(params.itemUrl as string, undefined, {
                  //ページをロードせずにurlを更新：ここでは無意味
                  ///hoge?aaa=1 => /hoge?bbb=2はOK
                  ///hoge => /fugaはNG
                  shallow: true,
                });
              },
            },
          ]) as any;
        },
        navigator: {
          navigate({ itemUrl }) {
            router.push(itemUrl);
          },
        },
      }),
    []
  );

  return (
    <>
      <div {...autocomplete.getRootProps({})}>
        <form
          {...(autocomplete.getFormProps({
            inputElement: inputRef.current,
          }) as any)}
          className="relative before:absolute before:top-1/2 before:left-3 before:-mt-2 before:h-4 before:w-4 before:bg-searchIcon before:bg-no-repeat"
        >
          <input
            {...(autocomplete.getInputProps({
              inputElement: inputRef.current,
            }) as any)}
            id="search-field"
            className="mb-2 block w-full rounded border bg-transparent pl-10 focus:border-violet-500"
            // placeholder="投稿を検索"
            autoComplete="off"
            ref={inputRef}
            type="text"
          />
        </form>
        <div {...(autocomplete.getPanelProps({}) as any)}>
          {autocompleteState?.isOpen &&
            autocompleteState?.collections.map((collection, index) => {
              const { source, items } = collection;

              return (
                <div
                  className="w-full overflow-hidden rounded bg-white shadow"
                  key={`source-${index}`}
                >
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item, index) => (
                        <li key={item.title} className="even:bg-gray-50">
                          <a
                            {...(autocomplete.getItemProps({
                              item,
                              source,
                            }) as any)}
                            className={classNames(
                              'block py-4 pl-3 text-sm',
                              autocompleteState?.activeItemId === index &&
                                'bg-purple text-white'
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
      </div>
    </>
  );
};

export default AlgoliaAutoComplete;
