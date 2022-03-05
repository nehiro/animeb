import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { EyeIcon, StarIcon, BookmarkIcon } from '@heroicons/react/solid';
import { useAuth } from '../../utils/userContext';
import { listButton, unlistButton } from '../../lib/card';

type List = {
  id: string;
  title: string;
};

const ListedCard = ({ list }: { list: List }) => {
  const { user, reviews, lists } = useAuth();
  console.log(list, 'list');
  const listed = () => {
    return lists?.find((list) => list.title === list?.title);
  };
  const reviewedRef = reviews?.find((review) => review.title === list?.title);
  //レビューのモーダル
  const [reviewModal, setReviewModal] = useState(false);
  const modalOpen = () => {
    if (!user) {
      alert('ログインしてください');
      return;
    }
    setReviewModal(true);
  };

  return (
    <>
      <div className="mb-2">
        <Link href={`/animes/${list?.title}`}>
          <a className="relative block h-40 leading-none sm:h-48 md:h-56 lg:h-64 xl:h-72">
            <Image
              src={
                'https://raw.githubusercontent.com/nehiro/animeb-public/main/images/' +
                `${list?.title}` +
                '.jpg'
              }
              layout="fill"
              className="object-cover"
              alt=""
            />
          </a>
        </Link>
      </div>
      <h3 className="mb-2 text-center font-bold">
        <Link href={`/animes/${list?.title}`}>
          <a>{list?.title}</a>
        </Link>
      </h3>
      <div className="grid grid-cols-3 items-center justify-items-center gap-2">
        <div className="w-full">
          <button className="w-full" onClick={modalOpen}>
            {reviewedRef ? (
              <a className="inline-block h-full w-full bg-yellow bg-no-repeat py-2 text-center">
                <EyeIcon className="mx-auto h-5 w-5" />
                <span className="inline-block h-full w-full">100</span>
              </a>
            ) : (
              <a className="inline-block h-full w-full bg-amber-100 bg-no-repeat py-2 text-center">
                <EyeIcon className="mx-auto h-5 w-5 text-amber-400" />
                <span className="inline-block h-full w-full text-amber-400">
                  100
                </span>
              </a>
            )}
          </button>
        </div>
        <div className="w-full">
          {listed() ? (
            <button
              className="w-full"
              onClick={() => unlistButton({ anime, user, lists })}
            >
              <span className="inline-block h-full w-full bg-yellow bg-no-repeat py-2 text-center">
                <BookmarkIcon className="mx-auto h-5 w-5" />
                <span className="inline-block h-full w-full">100</span>
              </span>
            </button>
          ) : (
            <button
              className="w-full"
              onClick={() => listButton({ anime, user })}
            >
              <span className="inline-block h-full w-full bg-amber-100 bg-no-repeat py-2 text-center">
                <BookmarkIcon className="mx-auto h-5 w-5 text-amber-400" />
                <span className="inline-block h-full w-full text-amber-400">
                  100
                </span>
              </span>
            </button>
          )}
        </div>
        <div className="w-full">
          <span className="inline-block h-full w-full bg-buttonBlack bg-no-repeat py-2 text-center text-yellow">
            <StarIcon className="mx-auto h-5 w-5 text-yellow" />
            <span className="inline-block h-full w-full">5.0</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ListedCard;
