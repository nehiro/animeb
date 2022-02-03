import { ChatAltIcon, HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import Link from 'next/Link';
import React from 'react';
import Button from './Button';

const AnimeReview = () => {
  return (
    <div>
      <ul className="flex items-center justify-between">
        <li className="w-1/3 bg-yellow text-center py-4 cursor-pointer relative">
          すべての感想・評価
          <div className="w-8 overflow-hidden inline-block absolute right-0 left-0 -bottom-4 m-auto">
            <div className=" h-5 w-5 bg-yellow -rotate-45 transform origin-top-left"></div>{' '}
          </div>
        </li>
        <li className="w-1/3 bg-lightYellow text-center py-4 cursor-pointer">
          ネタバレなし
        </li>
        <li className="w-1/3 bg-lightYellow text-center py-4 cursor-pointer">
          ネタバレあり
        </li>
      </ul>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((item) => (
          <div className="container py-8 bg-white">
            <div className="flex mb-4">
              <div className="w-12 h-12 rounded-full bg-red-400 mr-4"></div>
              <div>
                <h3>ユーザーネーム</h3>
                <p>2021 / 01 / 01 01:01</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <ul className="flex items-center mr-4">
                <li>
                  <StarIcon className="h-5 w-5 mx-auto text-yellow" />
                </li>
                <li>
                  <StarIcon className="h-5 w-5 mx-auto text-yellow" />
                </li>
                <li>
                  <StarIcon className="h-5 w-5 mx-auto text-yellow" />
                </li>
                <li>
                  <StarIcon className="h-5 w-5 mx-auto text-yellow" />
                </li>
                <li>
                  <StarIcon className="h-5 w-5 mx-auto text-yellow" />
                </li>
              </ul>
              <div className="text-yellow text-2xl mr-8">5.0</div>
              <div className="flex items-center border-ts col-span-2">
                <Link href="/">
                  <a className="flex items-center mr-4">
                    <HeartIcon className="h-5 w-5 mr-2" />
                    <span className="mr-2">いいね！</span>
                    <span>100</span>
                  </a>
                </Link>
                <Link href="/">
                  <a className="flex items-center">
                    <ChatAltIcon className="h-5 w-5 mr-2" />
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
