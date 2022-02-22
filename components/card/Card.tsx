import React, { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EyeIcon } from '@heroicons/react/solid';
import { BookmarkIcon } from '@heroicons/react/solid';
import { StarIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon, XIcon } from '@heroicons/react/outline';
import { Anime } from '../../types/Anime';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useForm } from 'react-hook-form';
import { Switch } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Card = ({ anime }: { anime: Anime | undefined }) => {
  const [enabled, setEnabled] = useState(false);
  console.log(enabled);
  const { register, handleSubmit, reset } = useForm();
  const [reviewModal, setReviewModal] = useState(false);
  const modalOpen = () => {
    setReviewModal(true);
  };

  const [storyScore, setStoryScore] = useState<number>(0);
  const [drawingScore, setDrawingScore] = useState<number>(0);
  const [voiceActorScore, setVoiceActorScore] = useState<number>(0);
  const [musicScore, setMusicScore] = useState<number>(0);
  const [characterScore, setCharacterScore] = useState<number>(0);
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
      if (0 <= storyScore && storyScore < 1) {
        setStoryScore(0);
      }
      if (0 <= drawingScore && drawingScore < 1) {
        setDrawingScore(0);
      }
      if (0 <= voiceActorScore && voiceActorScore < 1) {
        setVoiceActorScore(0);
      }
      if (0 <= musicScore && musicScore < 1) {
        setMusicScore(0);
      }
      if (0 <= characterScore && characterScore < 1) {
        setCharacterScore(0);
      }
      setScoreAverage('-');
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
    setScoreAverage(parseFloat(average(scoreArray).toFixed(1)).toFixed(1));
  };
  const onSubmit = (data: any) => {
    console.log(data);
    console.log('送信');
  };

  return (
    <>
      <div className="relative mb-2 h-72">
        <Link href={`/animes/${anime?.title}`}>
          <a className="block leading-none">
            <Image
              src={
                'https://raw.githubusercontent.com/nehiro/animeb-public/main/images/' +
                `${anime?.title}` +
                '.jpeg'
              }
              layout="fill"
              className="object-cover"
              alt=""
            />
          </a>
        </Link>
      </div>
      <h3 className="mb-2 text-center font-bold">
        <Link href={`/animes/${anime?.title}`}>
          <a>{anime?.title}</a>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="">
                    <div className="mt-3 text-center sm:mt-0">
                      <Dialog.Title
                        as="h3"
                        className="bg-purple py-2 px-12 text-lg font-medium leading-6 text-white"
                      >
                        {anime?.title}のレビュー
                      </Dialog.Title>
                      <ul className="bg-buttonBlack p-4 text-white">
                        <li
                          onChange={changeScoreAverage}
                          className="border-b border-gray-500 pb-2 text-2xl"
                        >
                          {scoreAverage}
                        </li>
                        <input
                          type="text"
                          {...register('scoreAverage')}
                          className="hidden"
                          value={scoreAverage}
                        />
                        <li className="flex items-center justify-around border-b border-gray-500 py-2 px-4">
                          <p className="mr-4 w-1/5">
                            物語
                            <br />
                            {storyScore === 0 ? '-' : storyScore.toFixed(1)}
                          </p>
                          <Slider
                            min={0}
                            max={5}
                            step={0.5}
                            value={storyScore}
                            onChange={(value) => setStoryScore(Number(value))}
                            handleStyle={{
                              borderColor: '#FFD400',
                              height: 20,
                              width: 20,
                              marginTop: -7,
                              backgroundColor: '#FFD400',
                            }}
                            railStyle={{ backgroundColor: 'white', height: 6 }}
                            trackStyle={{
                              backgroundColor: '#FFD400',
                              height: 6,
                            }}
                          />
                        </li>
                        <li className="flex items-center justify-around border-b border-gray-500 py-2 px-4">
                          <p className="mr-4 w-1/5">
                            作画
                            <br />
                            {drawingScore === 0 ? '-' : drawingScore.toFixed(1)}
                          </p>
                          <Slider
                            min={0}
                            max={5}
                            step={0.5}
                            value={drawingScore}
                            onChange={(value) => setDrawingScore(Number(value))}
                            handleStyle={{
                              borderColor: '#FFD400',
                              height: 20,
                              width: 20,
                              marginTop: -7,
                              backgroundColor: '#FFD400',
                            }}
                            railStyle={{ backgroundColor: 'white', height: 6 }}
                            trackStyle={{
                              backgroundColor: '#FFD400',
                              height: 6,
                            }}
                          />
                        </li>
                        <li className="flex items-center justify-around border-b border-gray-500 py-2 px-4">
                          <p className="mr-4 w-1/5">
                            声優
                            <br />
                            {voiceActorScore === 0
                              ? '-'
                              : voiceActorScore.toFixed(1)}
                          </p>
                          <Slider
                            min={0}
                            max={5}
                            step={0.5}
                            value={voiceActorScore}
                            onChange={(value) =>
                              setVoiceActorScore(Number(value))
                            }
                            handleStyle={{
                              borderColor: '#FFD400',
                              height: 20,
                              width: 20,
                              marginTop: -7,
                              backgroundColor: '#FFD400',
                            }}
                            railStyle={{ backgroundColor: 'white', height: 6 }}
                            trackStyle={{
                              backgroundColor: '#FFD400',
                              height: 6,
                            }}
                          />
                        </li>
                        <li className="flex items-center justify-around border-b border-gray-500 py-2 px-4">
                          <p className="mr-4 w-1/5">
                            音楽
                            <br />
                            {musicScore === 0 ? '-' : musicScore.toFixed(1)}
                          </p>
                          <Slider
                            min={0}
                            max={5}
                            step={0.5}
                            value={musicScore}
                            onChange={(value) => setMusicScore(Number(value))}
                            handleStyle={{
                              borderColor: '#FFD400',
                              height: 20,
                              width: 20,
                              marginTop: -7,
                              backgroundColor: '#FFD400',
                            }}
                            railStyle={{ backgroundColor: 'white', height: 6 }}
                            trackStyle={{
                              backgroundColor: '#FFD400',
                              height: 6,
                            }}
                          />
                        </li>
                        <li className="flex items-center justify-around border-b border-gray-500 py-2 px-4">
                          <p className="mr-4 w-1/5">
                            キャラ
                            <br />
                            {characterScore === 0
                              ? '-'
                              : characterScore.toFixed(1)}
                          </p>
                          <Slider
                            min={0}
                            max={5}
                            step={0.5}
                            value={characterScore}
                            onChange={(value) =>
                              setCharacterScore(Number(value))
                            }
                            handleStyle={{
                              borderColor: '#FFD400',
                              height: 20,
                              width: 20,
                              marginTop: -7,
                              backgroundColor: '#FFD400',
                            }}
                            railStyle={{ backgroundColor: 'white', height: 6 }}
                            trackStyle={{
                              backgroundColor: '#FFD400',
                              height: 6,
                            }}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="px-4">
                    <textarea
                      {...register('review')}
                      placeholder="無記入でも投稿できます"
                      className="w-full border-l border-gray-200"
                    ></textarea>
                    <input
                      {...register('tag')}
                      type="text"
                      className="w-full border-l border-gray-200"
                      placeholder="タグを1つ入力"
                    />
                  </div>
                  <div className="flex items-center justify-start px-4">
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        className={classNames(
                          enabled ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                      >
                        <span
                          className={classNames(
                            enabled
                              ? 'opacity-0 duration-100 ease-out'
                              : 'opacity-100 duration-200 ease-in',
                            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                          )}
                          aria-hidden="true"
                        >
                          <svg
                            className="h-3 w-3 text-gray-400"
                            fill="none"
                            viewBox="0 0 12 12"
                          >
                            <path
                              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span
                          className={classNames(
                            enabled
                              ? 'opacity-100 duration-200 ease-in'
                              : 'opacity-0 duration-100 ease-out',
                            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                          )}
                          aria-hidden="true"
                        >
                          <svg
                            className="h-3 w-3 text-indigo-600"
                            fill="currentColor"
                            viewBox="0 0 12 12"
                          >
                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                          </svg>
                        </span>
                      </span>
                    </Switch>
                    <p className="text-xs text-red-600">
                      レビュー内容にネタバレが含まれている場合はこちらをチェックしてください。
                    </p>
                    <input
                      type="checkbox"
                      {...register('spoiler')}
                      className="hidden"
                      value={enabled === true ? 'true' : 'false'}
                    />
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-buttonBlack px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      // onClick={() => setReviewModal(false)}
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
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Card;
