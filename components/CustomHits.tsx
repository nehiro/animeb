import Link from 'next/link';
import React from 'react';
import { BasicDoc, HitsProvided } from 'react-instantsearch-core';
import { connectHits, Highlight } from 'react-instantsearch-dom';
import { ExternalLinkIcon } from '@heroicons/react/solid';

const Hits = ({ hits }: HitsProvided<BasicDoc>) => {
  if (!hits?.length) {
    // console.log(hits);
    return (
      <p className="text-sm text-gray-500">
        キーワードを入力して検索してください
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {hits.map((hit) => (
        <li
          key={hit.objectID}
          className="relative flex gap-4 rounded-md bg-white shadow hover:bg-gray-50"
        >
          <Link href={`/animes/${hit.title}`}>
            <a className="block w-full p-3 sm:p-4">
              {/* <div className="absolute top-2 right-2 text-sm text-gray-400">
                {hit.__position}
              </div> */}
              {/* <div className="text-4xl">{hit.gender === 'male' ? '👨🏻' : '👩🏻'}</div> */}
              <div className="flex items-center justify-start">
                <ExternalLinkIcon className="mr-2 h-5 w-5 flex-none text-gray-400" />
                {/* <Highlight attribute="title" hit={hit} /> */}
                <h3>{hit.title}</h3>
                {/* <h3>{hit.name}</h3> */}
                {/* <p className="text-sm text-gray-500">{hit.brand}</p>
            <p className="text-sm text-gray-500">{hit.objectID}</p> */}
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const CustomHits = connectHits(Hits);

export default CustomHits;
