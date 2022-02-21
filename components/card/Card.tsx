import React, { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EyeIcon } from '@heroicons/react/solid';
import { BookmarkIcon } from '@heroicons/react/solid';
import { StarIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon, XIcon } from '@heroicons/react/outline';
import { Anime } from '../../types/Anime';

const Card = ({ anime }: { anime: Anime[] | undefined }) => {
  const [reviewModal, setReviewModal] = useState(false);
  const modalOpen = () => {
    setReviewModal(true);
  };

  const [storyScore, setStoryScore] = useState(0);
  const [drawingScore, setDrawingScore] = useState(0);
  const [voiceActorScore, setVoiceActorScore] = useState(0);
  const [musicScore, setMusicScore] = useState(0);
  const [characterScore, setCharacterScore] = useState(0);
  const [scoreAverage, setScoreAverage] = useState<number | string>(0);

  const scoreArray = [
    storyScore,
    drawingScore,
    voiceActorScore,
    musicScore,
    characterScore,
  ];

  useEffect(() => {
    if (
      (0 <= storyScore && storyScore < 1) ||
      (0 <= drawingScore && drawingScore < 1) ||
      (0 <= voiceActorScore && voiceActorScore < 1) ||
      (0 <= musicScore && musicScore < 1) ||
      (0 <= characterScore && characterScore < 1)
    ) {
      setScoreAverage('-');
      console.log(scoreAverage, 'scoreAverage');
      console.log(storyScore, 'storyScore');
      console.log(drawingScore, 'drawingScore');
      console.log(voiceActorScore, 'voiceActorScore');
      console.log(musicScore, 'musicScore');
      console.log(characterScore, 'characterScore');
    } else {
      changeScoreAverage();
    }
  }, scoreArray);

  const changeScoreAverage = () => {
    const sum = (numbers: number[], initialValue: number = 0) =>
      numbers.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        initialValue
      );
    const average = (numbers: number[]) => sum(numbers) / numbers.length;
    // console.log(parseFloat(average(scoreArray).toFixed(1)), 'average');
    // console.log(typeof scoreArray.length, 'scoreArray.length');
    setScoreAverage(parseFloat(average(scoreArray).toFixed(1)));
  };

  return (
    <>
      {/* <ul className="grid grid-cols-5 gap-4 justify-items-center mb-8"> */}
      <ul className="mb-8 grid grid-cols-5 justify-items-center gap-4">
        {anime?.map((item: Anime) => (
          <li key={item.title} className="flex flex-col justify-between">
            <div className="mb-2">
              <Link href="/anime">
                <a className="block leading-none">
                  <Image
                    src={
                      'https://raw.githubusercontent.com/nehiro/animeb-public/main/images/' +
                      `${item.title}` +
                      '.jpeg'
                    }
                    height={338}
                    width={242}
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <h3 className="mb-2 text-center font-bold">
              <Link href="/">
                <a>{item.title}</a>
              </Link>
            </h3>
            <div className="grid grid-cols-3 items-center justify-items-center gap-2">
              <div className="w-full">
                <button className="w-full" onClick={modalOpen}>
                  <a className="bg-watch inline-block h-full w-full bg-yellow bg-no-repeat py-2 text-center">
                    <EyeIcon className="mx-auto h-5 w-5" />
                    <span className="inline-block h-full w-full">100</span>
                  </a>
                </button>
              </div>
              <div className="w-full">
                <button className="w-full">
                  <a className="bg-bookMark inline-block h-full w-full bg-yellow bg-no-repeat py-2 text-center">
                    <BookmarkIcon className="mx-auto h-5 w-5" />
                    <span className="inline-block h-full w-full">100</span>
                  </a>
                </button>
              </div>
              <div className="w-full">
                <Link href="/anime">
                  <a className="bg-star inline-block h-full w-full bg-buttonBlack bg-no-repeat py-2 text-center text-yellow">
                    <StarIcon className="mx-auto h-5 w-5 text-yellow" />
                    <span className="inline-block h-full w-full">5.0</span>
                  </a>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Transition.Root show={reviewModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={modalOpen}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                <div className="absolute top-0 right-0 hidden pt-2 pr-2 sm:block">
                  <button
                    type="button"
                    className="text-white hover:text-yellow"
                    onClick={() => setReviewModal(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="">
                  <div className="mt-3 text-center sm:mt-0">
                    <Dialog.Title
                      as="h3"
                      className="bg-purple py-2 text-lg font-medium leading-6 text-white"
                    >
                      レビュー
                    </Dialog.Title>
                    <ul className="bg-buttonBlack p-4 text-white">
                      <li
                        onChange={changeScoreAverage}
                        className="border-b border-gray-500 pb-2 text-2xl"
                      >
                        {scoreAverage}
                      </li>
                      <li className="flex justify-around border-b border-gray-500 py-2 px-4">
                        <p className="w-2/12">
                          物語
                          <br />
                          {storyScore}
                        </p>
                        <input
                          type="range"
                          id="story"
                          min="0"
                          max="5"
                          step="0.5"
                          defaultValue={storyScore}
                          onChange={(e) =>
                            setStoryScore(Number(e.target.value))
                          }
                          className="w-10/12"
                        />
                      </li>
                      <li className="flex justify-around border-b border-gray-500 py-2 px-4">
                        <p className="w-2/12">
                          作画
                          <br />
                          {drawingScore}
                        </p>
                        <input
                          type="range"
                          id="story"
                          min="0"
                          max="5"
                          step="0.5"
                          defaultValue={drawingScore}
                          onChange={(e) =>
                            setDrawingScore(Number(e.target.value))
                          }
                          className="w-10/12"
                        />
                      </li>
                      <li className="flex justify-around border-b border-gray-500 py-2 px-4">
                        <p className="w-2/12">
                          声優
                          <br />
                          {voiceActorScore}
                        </p>
                        <input
                          type="range"
                          id="story"
                          min="0"
                          max="5"
                          step="0.5"
                          defaultValue={voiceActorScore}
                          onChange={(e) =>
                            setVoiceActorScore(Number(e.target.value))
                          }
                          className="w-10/12"
                        />
                      </li>
                      <li className="flex justify-around border-b border-gray-500 py-2 px-4">
                        <p className="w-2/12">
                          音楽
                          <br />
                          {musicScore}
                        </p>
                        <input
                          type="range"
                          id="story"
                          min="0"
                          max="5"
                          step="0.5"
                          defaultValue={musicScore}
                          onChange={(e) =>
                            setMusicScore(Number(e.target.value))
                          }
                          className="w-10/12"
                        />
                      </li>
                      <li className="flex justify-around border-b border-gray-500 py-2 px-4">
                        <p className="w-2/12">
                          キャラ
                          <br />
                          {characterScore}
                        </p>
                        <input
                          type="range"
                          id="story"
                          min="0"
                          max="5"
                          step="0.5"
                          defaultValue={characterScore}
                          onChange={(e) =>
                            setCharacterScore(Number(e.target.value))
                          }
                          className="w-10/12"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="px-4">
                  <textarea
                    placeholder="無記入でも投稿できます"
                    className="w-full border-l border-gray-200"
                  ></textarea>
                  <input
                    type="text"
                    className="w-full border-l border-gray-200"
                    placeholder="#好きなタグを1つ入力"
                  />
                </div>
                <div className="flex items-center justify-start px-4">
                  <button className="rounded bg-gray-200 p-2 text-xs">
                    ネタバレ
                  </button>
                  <p className="text-xs text-red-600">
                    レビュー内容にネタバレが含まれている場合はこちらをチェックしてください。
                  </p>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-buttonBlack px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setReviewModal(false)}
                  >
                    投稿
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setReviewModal(false)}
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Card;
