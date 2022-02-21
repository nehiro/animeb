import { ChatAltIcon, HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import Button from './Button';

const AnimeReview = () => {
  return (
    <div>
      <ul className="flex items-center justify-between">
        <li className="relative w-1/3 cursor-pointer bg-yellow py-4 text-center">
          すべての感想・評価
          <div className="absolute right-0 left-0 -bottom-4 m-auto inline-block w-8 overflow-hidden">
            <div className=" h-5 w-5 origin-top-left -rotate-45 transform bg-yellow"></div>{' '}
          </div>
        </li>
        <li className="w-1/3 cursor-pointer bg-lightYellow py-4 text-center">
          ネタバレなし
        </li>
        <li className="w-1/3 cursor-pointer bg-lightYellow py-4 text-center">
          ネタバレあり
        </li>
      </ul>
      <div className="mb-8 grid grid-cols-1 gap-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div className="container bg-white py-8">
            <div className="mb-4 flex">
              <div className="mr-4 h-12 w-12 rounded-full bg-red-400"></div>
              <div>
                <h3>ユーザーネーム</h3>
                <p>2021 / 01 / 01 01:01</p>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <ul className="mr-4 flex items-center">
                <li>
                  <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                </li>
                <li>
                  <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                </li>
                <li>
                  <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                </li>
                <li>
                  <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                </li>
                <li>
                  <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                </li>
              </ul>
              <div className="mr-8 text-2xl text-yellow">5.0</div>
              <div className="border-ts col-span-2 flex items-center">
                <Link href="/">
                  <a className="mr-4 flex items-center">
                    <HeartIcon className="mr-2 h-5 w-5" />
                    <span className="mr-2">いいね！</span>
                    <span>100</span>
                  </a>
                </Link>
                <Link href="/">
                  <a className="flex items-center">
                    <ChatAltIcon className="mr-2 h-5 w-5" />
                    <span className="mr-2">コメント</span>
                    <span>100</span>
                  </a>
                </Link>
              </div>
            </div>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
              nulla perferendis quisquam similique? Dolor reprehenderit
              distinctio at similique quis quo non fuga minima officiis
              laudantium.
            </p>
            <p>#タグ</p>
          </div>
        ))}
      </div>
      <Button>もっと見る</Button>
    </div>
  );
};

export default AnimeReview;
