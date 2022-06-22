import {
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults, autocomplete } from '@algolia/autocomplete-js';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ReactElement, useMemo, useRef, useState } from 'react';
import LayoutNoNav from '../layouts/LayoutNoNav';
import { searchClient } from '../pages/api/client';
import toast, { Toaster } from 'react-hot-toast';
import useSWRInfinite from 'swr/infinite';
import { Anime, JsonAnime } from '../types/Anime';
import { useAnime } from '../utils/animeContext';

export type AlgoliaData = {
  objectId: string;
  objectID: string;
  title: string;
};

type Debounce = {
  fn: any;
  time: number;
};

export type Animes = {
  items: {
    id?: string;
    doing: boolean;
    media: string;
    firstTime: boolean;
    season: number;
    title: string;
    ruby: string;
    url: string;
    pv: string | null;
    year: number;
    quarter: number;
    staff: string[][];
    op: string[] | null;
    ed: string[] | null;
    summary: string | null;
    cast: string[][] | null;
    subTitle: string[] | null;
    onair: string[][] | null;
    streaming: string[] | null;
  }[];
};
export type newData = {
  id?: string;
  doing: boolean;
  media: string;
  firstTime: boolean;
  season: number;
  title: string;
  ruby: string;
  url: string;
  pv: string | null;
  year: number;
  quarter: number;
  staff: string[][];
  op: string[] | null;
  ed: string[] | null;
  summary: string | null;
  cast: string[][] | null;
  subTitle: string[] | null;
  onair: string[][] | null;
  streaming: string[] | null;
}[];
const test = () => {
  // const router = useRouter();
  // const inputRef = useRef<HTMLInputElement>(null);
  // const [autocompleteState, setAutocompleteState] =
  //   useState<AutocompleteState<AlgoliaData>>();

  // const debounced = debouncePromise(
  //   (items: Debounce) => Promise.resolve(items),
  //   1000
  // );
  // function debouncePromise(fn: any, time: number) {
  //   // console.log(fn, 'fn');
  //   let timerId: NodeJS.Timeout | undefined = undefined;

  //   return function debounced(...args: any[]) {
  //     // console.log(args, 'args');
  //     if (timerId) {
  //       // console.log(typeof timerId, 'timerId');
  //       clearTimeout(timerId);
  //     }

  //     return new Promise((resolve) => {
  //       timerId = setTimeout(() => resolve(fn(...args)), time);
  //       // console.log(timerId, 'timerId');
  //     });
  //   };
  // }

  // // useMemo：値が変わった時だけ実行
  // const autocomplete = useMemo(
  //   () =>
  //     createAutocomplete<AlgoliaData>({
  //       id: 'autocomplete-search',
  //       //未入力でもタイトル出すか
  //       openOnFocus: false,
  //       //inputの状態が変わるたびに呼び出される
  //       onStateChange({ state }) {
  //         // {
  //         //   console.log(state, 'state');
  //         // }
  //         setAutocompleteState(state);
  //       },
  //       placeholder: 'タイトルで検索',
  //       // onSubmit(params) {
  //       //   alert(`実際には「${params.state.query}」の検索結果画面に遷移します`);
  //       // },

  //       //データ取得場所
  //       getSources() {
  //         return debounced([
  //           {
  //             sourceId: 'animes',
  //             getItemInputValue({ item }: { item: AlgoliaData }) {
  //               {
  //                 console.log(item, 'item');
  //               }
  //               return item.title;
  //             },
  //             //取得するアイテムを絞る
  //             getItems({ query }: { query: string }) {
  //               //query：入力された文字
  //               // {
  //               //   console.log(typeof query, 'query');
  //               // }
  //               return getAlgoliaResults({
  //                 searchClient,
  //                 //animesからqueryの文字で20件取得
  //                 queries: [
  //                   {
  //                     indexName: 'animes',
  //                     query,
  //                     params: {
  //                       hitsPerPage: 20,
  //                     },
  //                   },
  //                 ],
  //               });
  //             },
  //             //アイテムにリンクを返す
  //             getItemUrl({ item }: { item: AlgoliaData }) {
  //               // {
  //               //   console.log(item, 'item');
  //               // }
  //               //itemはアルゴリアから引っ張ってきたそれぞれのデータ
  //               return `/animes/${item.title}`;
  //             },
  //             //アイテムをクリックした時に走る
  //             onSelect(params: { itemUrl: string }) {
  //               // {
  //               //   console.log(params, 'params');
  //               // }
  //               router.replace(params.itemUrl as string, undefined, {
  //                 //ページをロードせずにurlを更新：ここでは無意味
  //                 ///hoge?aaa=1 => /hoge?bbb=2はOK
  //                 ///hoge => /fugaはNG
  //                 shallow: true,
  //               });
  //             },
  //           },
  //         ]) as any;
  //       },
  //       navigator: {
  //         navigate({ itemUrl }) {
  //           router.push(itemUrl);
  //         },
  //       },
  //     }),
  //   []
  // );

  // const notify = () => toast('Here is your toast.');
  const limit = 2;

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `http://localhost:3000/api/animes?limit=${limit}&page=${
      pageIndex + 1
    }`;
    // return `https://api.github.com/repos/reactjs/react-a11y/issues?per_page=${PAGE_SIZE}&page=${
    //   pageIndex + 1
    // }`;
  };

  const { data, size, setSize } = useSWRInfinite(
    getKey,
    (url) =>
      fetch(url, {
        method: 'GET',
      }).then((r) => r.json()),
    // }).then((r) => r.json().then((r) => r.items)),
    {
      initialSize: 10,
    }
  );

  if (!data) return 'loading';

  console.log(data, 'data');
  // console.log(data?.flat(), 'data.flat()');

  const newData: newData = data.flat();

  // const dataLength = data.flat().map((item, index) => item.items);

  // console.log(newData, 'newData');
  // console.log(dataLength, 'dataLength');

  // console.log(Array.isArray(newData), 'newData');

  console.log(data.length, 'data.length');
  // let totalAnimes = 0;
  // for (let i = 0; i < data.length; i++) {
  //   totalAnimes += data[i].length;
  // }
  // console.log(totalAnimes, 'totalAnimes');

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  return (
    <>
      <h2>もっと見る機能</h2>
      {newData.map((i: any, index) => (
        <div
          className={`${
            i.title === 'リーマンズクラブ' ? 'bg-blue-700' : null
          } border-b-2`}
          key={index}
        >
          {i.title}
        </div>
      ))}
      {!isReachingEnd ? (
        <button onClick={() => setSize(size + 1)}>もっと見る</button>
      ) : (
        'すべて読み込みました。'
      )}

      {/* <div>
        <button onClick={notify}>ボタン</button>
        <Toaster />
      </div> */}
      {/* <div {...autocomplete.getRootProps({})}>
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
            // placeholder="投稿を検索"
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
      </div> */}
    </>
  );
};

export default test;
test.getLayout = (page: ReactElement) => <LayoutNoNav>{page}</LayoutNoNav>;
