import Link from 'next/link';
import React from 'react';
import { BasicDoc, HitsProvided } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';

const Hits = ({ hits }: HitsProvided<BasicDoc>) => {
  if (!hits?.length) {
    return (
      <p className="text-sm text-gray-500">検索結果が見つかりませんでした</p>
    );
  }

  return (
    <ul className="space-y-2">
      {hits.map((hit) => (
        <li
          key={hit.objectID}
          className="relative flex gap-4 rounded-md bg-white p-4 shadow"
        >
          <Link href={`/animes/${hit.title}`}>
            <a className="block w-full">
              <div className="absolute top-2 right-2 text-sm text-gray-400">
                {hit.__position}
              </div>
              {/* <div className="text-4xl">{hit.gender === 'male' ? '👨🏻' : '👩🏻'}</div> */}
              <div className="flex-1">
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
