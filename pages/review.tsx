import Link from 'next/link';
import Image from 'next/image';
import React, { ReactElement } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import BackGroundWhite from '../components/BackGroundWhite';
import { BookmarkIcon, EyeIcon, StarIcon } from '@heroicons/react/solid';
import BackGroundGray from '../components/BackGroundGray';
import TopTitle from '../components/TopTitle';
import { ChatAltIcon, HeartIcon } from '@heroicons/react/outline';
import Layout from '../layouts/Layout';

const Review = () => {
  return (
    <>
      <BackGroundWhite>
        <div className="grid justify-items-center gap-4 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex">
              <div className="mr-4 h-12 w-12 rounded-full bg-red-400"></div>
              <div>
                <h1 className="font-bold">ユーザーネーム</h1>
                <p>2021 / 01 / 01 01:01</p>
              </div>
            </div>
            <div className="mb-3 flex flex-wrap items-center justify-items-start">
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
              <ul className="flex flex-wrap items-center justify-between">
                <li className="mr-3">
                  物語<span className="ml-1">5.0</span>
                </li>
                <li className="mr-3">
                  作画<span className="ml-1">5.0</span>
                </li>
                <li className="mr-3">
                  声優<span className="ml-1">5.0</span>
                </li>
                <li className="mr-3">
                  音楽<span className="ml-1">5.0</span>
                </li>
                <li>
                  キャラ<span>5.0</span>
                </li>
              </ul>
            </div>
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
        </div>
      </BackGroundWhite>
      <BackGroundGray>
        <TopTitle>いいね！したユーザー</TopTitle>
        <div className="mb-8 flex items-center justify-center">
          <HeartIcon className="mr-2 h-5 w-5" />
          <span className="mr-2">いいね！</span>
          <span>100</span>
        </div>
        <div className="grid-cols-gridLikes grid gap-4">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((item) => (
            <div className="h-12 w-12 rounded-full bg-red-400"></div>
          ))}
        </div>
      </BackGroundGray>
      <BackGroundWhite>
        <TopTitle>コメントの数</TopTitle>
        <div className="mb-8 flex items-center justify-center">
          <ChatAltIcon className="mr-2 h-5 w-5" />
          <span className="mr-2">コメント</span>
          <span>100</span>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div className="mb-8 border-b pb-8 last:mb-0">
            <div className="mb-4 flex">
              <div className="mr-4 h-12 w-12 rounded-full bg-red-400"></div>
              <div>
                <h3>ユーザーネーム</h3>
                <p>2021 / 01 / 01 01:01</p>
              </div>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
              tempore, alias veritatis eius sint sapiente molestias et
              asperiores explicabo iste quidem delectus aspernatur ipsum
              nesciunt consectetur. Unde ex iste repudiandae.
            </p>
          </div>
        ))}
      </BackGroundWhite>
    </>
  );
};

export default Review;
Review.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
