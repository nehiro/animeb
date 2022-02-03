import React, { Fragment, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/Link';
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

  const [storyLineLength, setStoryLineLength] = useState(1);
  const [drawinglineLength, setDrawingLineLength] = useState(1);
  const [voiceActorlineLength, setVoiceActorLineLength] = useState(1);
  const [musiclineLength, setMusicLineLength] = useState(1);
  const [characterlineLength, setCharacterLineLength] = useState(1);
  const [scoreAverage, setScoreAverage] = useState(1);

  const changeStoryLineLength = (e: any) => {
    let changeValue = e.target.value;
    setStoryLineLength(changeValue);
    changeScoreAverage();
  };
  const changeDrawingLineLength = (e: any) => {
    let changeValue = e.target.value;
    setDrawingLineLength(changeValue);
    changeScoreAverage();
  };
  const changeVoiceActorLineLength = (e: any) => {
    let changeValue = e.target.value;
    setVoiceActorLineLength(changeValue);
    changeScoreAverage();
  };
  const changeMusiclineLength = (e: any) => {
    let changeValue = e.target.value;
    setMusicLineLength(changeValue);
    changeScoreAverage();
  };
  const changeCharacterlineLength = (e: any) => {
    let changeValue = e.target.value;
    setCharacterLineLength(changeValue);
    changeScoreAverage();
  };
  const changeScoreAverage = () => {
    const result =
      Math.floor(
        ((Number(storyLineLength) +
          Number(drawinglineLength) +
          Number(voiceActorlineLength) +
          Number(musiclineLength) +
          Number(characterlineLength)) /
          5) *
          10
      ) / 10;
    setScoreAverage(result);
  };

  return (
    <>
      {/* <ul className="grid grid-cols-5 gap-4 justify-items-center mb-8"> */}
      <ul className="grid grid-cols-5 gap-4 justify-items-center mb-8">
        {anime?.map((item: Anime) => (
          <li key={item.title}>
            <div className="mb-2">
              <Link href="/anime">
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
            <h3 className="text-center mb-2 font-bold">
              <Link href="/">
                <a>{item.title}</a>
              </Link>
            </h3>
            <div className="grid grid-cols-3 gap-2 justify-items-center items-center">
              <div className="w-full">
                <button className="w-full" onClick={modalOpen}>
                  <a className="bg-watch bg-no-repeat h-full w-full inline-block text-center bg-yellow py-2">
                    <EyeIcon className="h-5 w-5 mx-auto" />
                    <span className="inline-block w-full h-full">100</span>
                  </a>
                </button>
              </div>
              <div className="w-full">
                <button className="w-full">
                  <a className="bg-bookMark bg-no-repeat h-full w-full inline-block text-center bg-yellow py-2">
                    <BookmarkIcon className="h-5 w-5 mx-auto" />
                    <span className="inline-block w-full h-full">100</span>
                  </a>
                </button>
              </div>
              <div className="w-full">
                <Link href="/anime">
                  <a className="bg-star bg-no-repeat h-full w-full inline-block text-center text-yellow py-2 bg-buttonBlack">
                    <StarIcon className="h-5 w-5 text-yellow mx-auto" />
                    <span className="inline-block w-full h-full">5.0</span>
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
          className="fixed z-50 inset-0 overflow-y-auto"
          onClose={modalOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
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
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="hidden sm:block absolute top-0 right-0 pt-2 pr-2">
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
                      className="text-lg leading-6 font-medium text-white bg-purple py-2"
                    >
                      レビュー
                    </Dialog.Title>
                    <ul className="bg-buttonBlack text-white p-4">
                      <li
                        onChange={changeScoreAverage}
                        className="text-2xl border-b border-gray-500 pb-2"
                      >
                        {scoreAverage}
                      </li>
                      <li className="flex justify-around border-b border-gray-500 py-2 px-4">
                        <p className="w-2/12">
                          物語
                          <br />
                          {storyLineLength}
                        </p>
                        <input
                          type="range"
                          id="story"
                          min="1"
                          max="5"
                          step="0.5"
                          defaultValue={storyLineLength}
                          onChange={changeStoryLineLength}
                          className="w-10/12"
                        />
                      </li>
                      <li className="flex justify-around border-b border-gray-500 py-2 px-4">
                        <p className="w-2/12">
                          作画
                          <br />
                          {drawinglineLength}
                        </p>
                        <input
                          type="range"
                          id="story"
                          min="1"
                          max="5"
                          step="0.5"
                          defaultValue={drawinglineLength}
                          onChange={changeDrawingLineLength}
                          className="w-10/12"
                        />
                      </li>
                      <li className="flex justify-around border-b border-gray-500 py-2 px-4">
                        <p className="w-2/12">
                          声優
                          <br />
                          {voiceActorlineLength}
                        </p>
                        <input
                          type="range"
                          id="story"
                          min="1"
                          max="5"
                          step="0.5"
                          defaultValue={voiceActorlineLength}
                          onChange={changeVoiceActorLineLength}
                          className="w-10/12"
                        />
                      </li>
                      <li className="flex justify-around border-b border-gray-500 py-2 px-4">
                        <p className="w-2/12">
                          音楽
                          <br />
                          {musiclineLength}
                        </p>
                        <input
                          type="range"
                          id="story"
                          min="1"
                          max="5"
                          step="0.5"
                          defaultValue={musiclineLength}
                          onChange={changeMusiclineLength}
                          className="w-10/12"
                        />
                      </li>
                      <li className="flex justify-around border-b border-gray-500 py-2 px-4">
                        <p className="w-2/12">
                          キャラ
                          <br />
                          {characterlineLength}
                        </p>
                        <input
                          type="range"
                          id="story"
                          min="1"
                          max="5"
                          step="0.5"
                          defaultValue={characterlineLength}
                          onChange={changeCharacterlineLength}
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
                <div className="px-4 flex justify-start items-center">
                  <button className="text-xs bg-gray-200 rounded p-2">
                    ネタバレ
                  </button>
                  <p className="text-red-600 text-xs">
                    レビュー内容にネタバレが含まれている場合はこちらをチェックしてください。
                  </p>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-buttonBlack text-base font-medium text-white hover:bg-yellow hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setReviewModal(false)}
                  >
                    投稿
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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
