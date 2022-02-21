import { BookmarkIcon, EyeIcon } from '@heroicons/react/solid';
import { ChatAltIcon, HeartIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button02 from './Button02';

const Review = () => {
  const arry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="mb-8 grid justify-items-center gap-4 lg:grid-cols-2">
      {arry.map((item) => (
        <div key={item} className="min-w-full bg-white p-5">
          <div className="grid gap-4 ">
            <div>
              <div className="mb-4 flex">
                <div className="mr-4 h-12 w-12 rounded-full bg-red-400"></div>
                <div>
                  <h3>ユーザーネーム</h3>
                  <p>50秒前</p>
                </div>
              </div>
              <h3 className="mb-4">
                僕のヒーローアカデミア（2021年製作のアニメ）
              </h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
                nulla perferendis quisquam similique? Dolor reprehenderit
                distinctio at similique quis quo non fuga minima officiis
                laudantium.
              </p>
              <p>#タグ</p>
            </div>
            <div className="min-w-100">
              <div className="mb-2">
                <Link href="/">
                  <a className="block leading-none">
                    <Image
                      src="/images/hiroaka.png"
                      height={338}
                      width={242}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="grid grid-cols-2 items-center justify-items-center gap-2">
                <div className="w-full">
                  <Link href="/">
                    <a className="bg-watch inline-block h-full w-full bg-yellow bg-no-repeat py-1 text-center">
                      <EyeIcon className="mx-auto h-5 w-5" />
                      <span className="inline-block h-full w-full">100</span>
                    </a>
                  </Link>
                </div>
                <div className="w-full">
                  <Link href="/">
                    <a className="bg-bookMark inline-block h-full w-full bg-yellow bg-no-repeat py-1 text-center">
                      <BookmarkIcon className="mx-auto h-5 w-5" />
                      <span className="inline-block h-full w-full">100</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <Button02 size="lg" href="">
              もっと見る
            </Button02>
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
        </div>
      ))}
    </div>
  );
};

export default Review;
