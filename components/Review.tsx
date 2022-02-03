import { BookmarkIcon, EyeIcon } from '@heroicons/react/solid';
import { ChatAltIcon, HeartIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/Link';
import React from 'react';
import Button02 from './Button02';

const Review = () => {
  const arry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="grid lg:grid-cols-2 gap-4 justify-items-center mb-8">
      {arry.map((item) => (
        <div key={item} className="min-w-full bg-white p-5">
          <div className="grid gap-4 ">
            <div>
              <div className="flex mb-4">
                <div className="w-12 h-12 rounded-full bg-red-400 mr-4"></div>
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
              <div className="grid grid-cols-2 gap-2 justify-items-center items-center">
                <div className="w-full">
                  <Link href="/">
                    <a className="bg-watch bg-no-repeat h-full w-full inline-block text-center bg-yellow py-1">
                      <EyeIcon className="h-5 w-5 mx-auto" />
                      <span className="inline-block w-full h-full">100</span>
                    </a>
                  </Link>
                </div>
                <div className="w-full">
                  <Link href="/">
                    <a className="bg-bookMark bg-no-repeat h-full w-full inline-block text-center bg-yellow py-1">
                      <BookmarkIcon className="h-5 w-5 mx-auto" />
                      <span className="inline-block w-full h-full">100</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <Button02 size="lg" href="">
              もっと見る
            </Button02>
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
        </div>
      ))}
    </div>
  );
};

export default Review;
