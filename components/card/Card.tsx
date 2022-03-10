import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EyeIcon } from '@heroicons/react/solid';
import { BookmarkIcon } from '@heroicons/react/solid';
import { StarIcon } from '@heroicons/react/solid';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { Anime } from '../../types/Anime';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useForm, Controller } from 'react-hook-form';
import SwitchButton from '../SwitchButton';
import {
  collection,
  doc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useAuth } from '../../utils/userContext';
import { ReviewData } from '../../types/ReviewData';
import { deleteReviweButton, listButton, unlistButton } from '../../lib/card';
import Tag from '../Tag';
import useSWR from 'swr';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Card = {
  title: string;
  isScore: boolean;
  storyScore: number;
  drawingScore: number;
  voiceActorScore: number;
  musicScore: number;
  characterScore: number;
  review: string;
  spoiler: boolean;
  tag: string;
};

const Card = ({ anime }: { anime: Anime }) => {
  const { user, reviews, lists } = useAuth();
  //ログインユーザーがreviewしているかどうか
  const reviewedRef = reviews?.find((review) => review.title === anime?.title);
  // console.log(reviewedRef, 'reviewedRef');
  //ログインユーザーがlistしているかどうか
  const listed = () => {
    return lists?.find((list) => list.title === anime?.title);
  };

  //animesコレクションにあるタイトル
  const dbAnimes = useSWR('animes', async () => {
    const ref = collection(db, 'animes');
    const snap = await getDocs(ref);
    return snap.docs.map((doc) => doc.data());
  });

  // console.log(dbAnimes.data, 'dbAnimes');

  //listCount取得
  const listCount = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.listCount;
  // console.log(listCount);
  //reviweCount取得
  const reviewCount = dbAnimes?.data?.find(
    (dbAnime) => dbAnime.title === anime.title
  )?.reviewCount;
  // console.log(reviewCount);

  const [storyScore, setStoryScore] = useState<number>();
  const [drawingScore, setDrawingScore] = useState<number>();
  const [voiceActorScore, setVoiceActorScore] = useState<number>();
  const [musicScore, setMusicScore] = useState<number>();
  const [characterScore, setCharacterScore] = useState<number>();
  const [scoreAverage, setScoreAverage] = useState<number | string>();
  // console.log(scoreAverage);

  useEffect(() => {
    if (reviewedRef) {
      setStoryScore(reviewedRef?.storyScore);
      setDrawingScore(reviewedRef?.drawingScore);
      setVoiceActorScore(reviewedRef?.voiceActorScore);
      setMusicScore(reviewedRef?.musicScore);
      setCharacterScore(reviewedRef?.characterScore);
    }
    reset(reviewedRef);
  }, [reviewedRef]);
  //rhf使用
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<Card>({
    defaultValues: {
      title: reviewedRef?.title,
      isScore: true,
      storyScore: 1,
      drawingScore: 1,
      voiceActorScore: 1,
      musicScore: 1,
      characterScore: 1,
      review: '',
      tag: '',
      spoiler: false,
    },
  });

  //レビューのモーダル
  const [reviewModal, setReviewModal] = useState(false);
  const modalOpen = () => {
    if (!user) {
      alert('ログインしてください');
      return;
    }
    setReviewModal(true);
  };

  //average取得
  const scores = watch([
    'storyScore',
    'drawingScore',
    'voiceActorScore',
    'musicScore',
    'characterScore',
  ]);
  const getAverage = (scores: number[]) => {
    const sum = (numbers: number[], initialValue: number = 0) =>
      numbers.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        initialValue
      );
    const average = (numbers: number[]) => sum(numbers) / numbers.length;
    return parseFloat(average(scores).toFixed(1)).toFixed(1);
  };

  //review登録
  const onSubmit = async (data: ReviewData) => {
    //userがreviewしているかどうか
    if (!reviewedRef) {
      const idRef = doc(collection(db, `users/${user?.uid}/reviews`));
      const id = idRef.id;
      const ref = doc(db, `users/${user?.uid}/reviews/${id}`);
      setDoc(ref, {
        id: id,
        title: anime?.title,
        isScore: data.isScore,
        storyScore: data.storyScore,
        drawingScore: data.drawingScore,
        voiceActorScore: data.voiceActorScore,
        musicScore: data.musicScore,
        characterScore: data.characterScore,
        review: data.review,
        spoiler: data.spoiler,
        tag: data.tag,
        createAt: Date.now(),
      });
      // console.log(data, 'data');
      alert(`${anime?.title}のレビューを登録しました`);
    } else {
      const id = reviews?.find((review) => review.title === anime?.title)?.id;
      const ref = doc(db, `users/${user?.uid}/reviews/${id}`);
      updateDoc(ref, {
        isScore: data.isScore,
        storyScore: data.storyScore,
        drawingScore: data.drawingScore,
        voiceActorScore: data.voiceActorScore,
        musicScore: data.musicScore,
        characterScore: data.characterScore,
        review: data.review,
        spoiler: data.spoiler,
        tag: data.tag,
        updatedAt: Date.now(),
      });
      alert(`${anime?.title}のレビューを更新しました`);
    }

    //animesの処理
    if (
      dbAnimes.data !== undefined &&
      dbAnimes.data.find((dbList) => dbList.title === anime?.title)
    ) {
      const id = dbAnimes.data.find(
        (dbList) => dbList.title === anime?.title
      )?.id;
      // console.log(id, 'id');
      // console.log('カウントアップ');
      const animesIDRef = doc(db, `animes/${id}`);
      await updateDoc(animesIDRef, {
        reviewCount: increment(1),
      });
      // console.log(anime);
    } else {
      const animesIDRef = doc(collection(db, 'animes'));
      const animesID = animesIDRef.id;
      const animesRef = doc(db, `animes/${animesID}`);
      await setDoc(animesRef, {
        id: animesRef.id,
        title: anime?.title,
        createAt: Date.now(),
        reviewCount: 1,
        listCount: 0,
      });
    }
  };

  // const scoreItems = [
  //   {
  //     heading: '物語',
  //     headingE: 'storyScore',
  //     state: storyScore,
  //   },
  //   {
  //     heading: '作画',
  //     headingE: 'drawingScore',
  //     state: drawingScore,
  //   },
  //   {
  //     heading: '声優',
  //     headingE: 'voiceActorScore',
  //     state: voiceActorScore,
  //   },
  //   {
  //     heading: '音楽',
  //     headingE: 'musicScore',
  //     state: musicScore,
  //   },
  //   {
  //     heading: 'キャラ',
  //     headingE: 'characterScore',
  //     state: characterScore,
  //   },
  // ];

  return (
    <>
      <div className="mb-2">
        <Link href={`/animes/${anime?.title}`}>
          <a className="relative block h-40 leading-none sm:h-48 md:h-56 lg:h-64 xl:h-72">
            <Image
              src={
                'https://raw.githubusercontent.com/nehiro/animeb-public/main/images/' +
                `${anime?.title}` +
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
        <Link href={`/animes/${anime?.title}`}>
          <a>{anime?.title}</a>
        </Link>
      </h3>
      <div className="grid grid-cols-3 items-center justify-items-center gap-2">
        <div className="w-full">
          <button className="w-full" onClick={modalOpen}>
            {reviewedRef ? (
              <a className="inline-block h-full w-full bg-yellow bg-no-repeat py-2 text-center">
                <EyeIcon className="mx-auto h-5 w-5" />
                <span className="inline-block h-full w-full">
                  {!reviewCount ? 0 : reviewCount}
                </span>
              </a>
            ) : (
              <a className="inline-block h-full w-full bg-amber-100 bg-no-repeat py-2 text-center">
                <EyeIcon className="mx-auto h-5 w-5 text-amber-400" />
                <span className="inline-block h-full w-full text-amber-400">
                  {!reviewCount ? 0 : reviewCount}
                </span>
              </a>
            )}
          </button>
        </div>
        <div className="w-full">
          {listed() ? (
            <button
              className="w-full"
              onClick={() => unlistButton({ anime, user, lists, dbAnimes })}
            >
              <span className="inline-block h-full w-full bg-yellow bg-no-repeat py-2 text-center">
                <BookmarkIcon className="mx-auto h-5 w-5" />
                <span className="inline-block h-full w-full">
                  {!listCount ? 0 : listCount}
                </span>
              </span>
            </button>
          ) : (
            <button
              className="w-full"
              onClick={() => listButton({ anime, user, dbAnimes })}
            >
              <span className="inline-block h-full w-full bg-amber-100 bg-no-repeat py-2 text-center">
                <BookmarkIcon className="mx-auto h-5 w-5 text-amber-400" />
                <span className="inline-block h-full w-full text-amber-400">
                  {!listCount ? 0 : listCount}
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

      <Transition.Root show={reviewModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={modalOpen}
        >
          <div className="min-h-screen flex items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
                <div className="absolute top-0 right-0 block pt-4 pr-2">
                  <button
                    type="button"
                    className="text-white hover:text-yellow"
                    onClick={() => setReviewModal(false)}
                  >
                    {/* <span className="sr-only">Close</span> */}
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-3 text-center sm:mt-0">
                    <Dialog.Title
                      as="h3"
                      className="bg-purple py-4 px-12 text-lg font-medium leading-6 text-white"
                    >
                      {anime?.title}のレビュー
                    </Dialog.Title>
                  </div>
                  <div className="p-4">
                    <div className="mb-2  space-y-6 divide-y divide-gray-200">
                      <Controller
                        name={'isScore'}
                        control={control}
                        defaultValue={reviewedRef?.isScore}
                        render={({ field }) => (
                          <Disclosure as="div">
                            {({ open } = field.value) => (
                              <>
                                <div className={open ? 'bg-gray-200' : ''}>
                                  <Disclosure.Button className="flex w-full items-center justify-between border px-3 py-2 text-left text-gray-400 ">
                                    <span className="text-sm text-gray-500">
                                      {open
                                        ? 'スコアをつける'
                                        : 'スコアをつけない'}
                                    </span>
                                    <span className="ml-6 flex h-5 items-center">
                                      <ChevronDownIcon
                                        className={classNames(
                                          open ? '-rotate-180' : 'rotate-0',
                                          'h-5 w-5 transform transition-all delay-100'
                                        )}
                                        aria-hidden="true"
                                      />
                                      {console.log(open, 'open')}
                                    </span>
                                  </Disclosure.Button>
                                </div>
                                <Disclosure.Panel as="div" className="">
                                  <ul className="bg-buttonBlack p-4 text-center text-white">
                                    <li className="border-b border-gray-500 pb-2 text-2xl">
                                      {getAverage(scores)}
                                    </li>
                                    <li className="flex items-center justify-around border-b border-gray-500 py-2 px-4">
                                      <p className="mr-4 w-12">
                                        物語
                                        <br />
                                        {watch(
                                          'storyScore',
                                          storyScore
                                        ).toFixed(1)}
                                      </p>
                                      <Controller
                                        name={'storyScore'}
                                        control={control}
                                        defaultValue={reviewedRef?.storyScore}
                                        render={({ field }) => (
                                          <Slider
                                            min={1}
                                            max={5}
                                            step={0.5}
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            onChange={field.onChange}
                                            handleStyle={{
                                              borderColor: '#FFD400',
                                              height: 20,
                                              width: 20,
                                              marginTop: -7,
                                              backgroundColor: '#FFD400',
                                            }}
                                            railStyle={{
                                              backgroundColor: 'white',
                                              height: 6,
                                            }}
                                            trackStyle={{
                                              backgroundColor: '#FFD400',
                                              height: 6,
                                            }}
                                          ></Slider>
                                        )}
                                      ></Controller>
                                    </li>
                                    <li className="flex items-center justify-around border-b border-gray-500 py-2 px-4">
                                      <p className="mr-4 w-12">
                                        作画
                                        <br />
                                        {watch(
                                          'drawingScore',
                                          drawingScore
                                        ).toFixed(1)}
                                      </p>
                                      <Controller
                                        name={'drawingScore'}
                                        control={control}
                                        defaultValue={reviewedRef?.drawingScore}
                                        render={({ field }) => (
                                          <Slider
                                            min={1}
                                            max={5}
                                            step={0.5}
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            onChange={field.onChange}
                                            handleStyle={{
                                              borderColor: '#FFD400',
                                              height: 20,
                                              width: 20,
                                              marginTop: -7,
                                              backgroundColor: '#FFD400',
                                            }}
                                            railStyle={{
                                              backgroundColor: 'white',
                                              height: 6,
                                            }}
                                            trackStyle={{
                                              backgroundColor: '#FFD400',
                                              height: 6,
                                            }}
                                          ></Slider>
                                        )}
                                      ></Controller>
                                    </li>
                                    <li className="flex items-center justify-around border-b border-gray-500 py-2 px-4">
                                      <p className="mr-4 w-12">
                                        声優
                                        <br />
                                        {watch(
                                          'voiceActorScore',
                                          voiceActorScore
                                        ).toFixed(1)}
                                      </p>
                                      <Controller
                                        name={'voiceActorScore'}
                                        control={control}
                                        defaultValue={
                                          reviewedRef?.voiceActorScore
                                        }
                                        render={({ field }) => (
                                          <Slider
                                            min={1}
                                            max={5}
                                            step={0.5}
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            onChange={field.onChange}
                                            handleStyle={{
                                              borderColor: '#FFD400',
                                              height: 20,
                                              width: 20,
                                              marginTop: -7,
                                              backgroundColor: '#FFD400',
                                            }}
                                            railStyle={{
                                              backgroundColor: 'white',
                                              height: 6,
                                            }}
                                            trackStyle={{
                                              backgroundColor: '#FFD400',
                                              height: 6,
                                            }}
                                          ></Slider>
                                        )}
                                      ></Controller>
                                    </li>
                                    <li className="flex items-center justify-around border-b border-gray-500 py-2 px-4">
                                      <p className="mr-4 w-12">
                                        音楽
                                        <br />
                                        {watch(
                                          'musicScore',
                                          musicScore
                                        ).toFixed(1)}
                                      </p>
                                      <Controller
                                        name={'musicScore'}
                                        control={control}
                                        defaultValue={reviewedRef?.musicScore}
                                        render={({ field }) => (
                                          <Slider
                                            min={1}
                                            max={5}
                                            step={0.5}
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            onChange={field.onChange}
                                            handleStyle={{
                                              borderColor: '#FFD400',
                                              height: 20,
                                              width: 20,
                                              marginTop: -7,
                                              backgroundColor: '#FFD400',
                                            }}
                                            railStyle={{
                                              backgroundColor: 'white',
                                              height: 6,
                                            }}
                                            trackStyle={{
                                              backgroundColor: '#FFD400',
                                              height: 6,
                                            }}
                                          ></Slider>
                                        )}
                                      ></Controller>
                                    </li>
                                    <li className="flex items-center justify-around py-2 px-4 pb-0">
                                      <p className="mr-4 w-12">
                                        キャラ
                                        <br />
                                        {watch(
                                          'characterScore',
                                          characterScore
                                        ).toFixed(1)}
                                      </p>
                                      <Controller
                                        name={'characterScore'}
                                        control={control}
                                        defaultValue={
                                          reviewedRef?.characterScore
                                        }
                                        render={({ field }) => (
                                          <Slider
                                            min={1}
                                            max={5}
                                            step={0.5}
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            onChange={field.onChange}
                                            handleStyle={{
                                              borderColor: '#FFD400',
                                              height: 20,
                                              width: 20,
                                              marginTop: -7,
                                              backgroundColor: '#FFD400',
                                            }}
                                            railStyle={{
                                              backgroundColor: 'white',
                                              height: 6,
                                            }}
                                            trackStyle={{
                                              backgroundColor: '#FFD400',
                                              height: 6,
                                            }}
                                          ></Slider>
                                        )}
                                      ></Controller>
                                    </li>
                                  </ul>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )}
                      ></Controller>
                    </div>
                    <div className="mb-2">
                      <textarea
                        {...register('review', {
                          validate(value) {
                            if (watch('spoiler') === true) {
                              if (value) {
                                return true;
                              } else {
                                return 'ネタバレがある場合、レビューは必須です';
                              }
                            } else {
                              return true;
                            }
                          },
                        })}
                        rows={5}
                        placeholder={
                          watch('spoiler')
                            ? 'レビューを入力してください'
                            : '無記入でも投稿できます'
                        }
                        className="mb-2 block w-full border-l border-gray-200 text-sm"
                        defaultValue={reviewedRef?.review}
                      ></textarea>
                    </div>
                    <div className="mb-2">
                      <p className="mb-2 text-xs text-red-600">
                        {errors.review?.message}
                      </p>
                      {/* {console.log(watch('spoiler'))} */}
                      <input
                        {...register('tag')}
                        type="text"
                        className="w-full border-l border-gray-200 text-sm"
                        placeholder="タグを1つ追加できます"
                        defaultValue={reviewedRef?.tag}
                      />
                    </div>
                    <div className="flex items-center justify-start">
                      <Controller
                        name="spoiler"
                        control={control}
                        defaultValue={reviewedRef?.spoiler}
                        render={({ field }) => <SwitchButton {...field} />}
                      />
                      <p className="ml-2 text-xs text-red-600">
                        レビュー内容にネタバレが含まれている場合はこちらをチェックしてください。
                      </p>
                    </div>
                    {!reviewedRef ? (
                      <div className="mt-2 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-buttonBlack px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
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
                    ) : (
                      <div className="mt-2 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-buttonBlack px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          更新
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={() =>
                            deleteReviweButton({
                              anime,
                              setReviewModal,
                              user,
                              reviews,
                              dbAnimes,
                            })
                          }
                        >
                          削除
                        </button>
                      </div>
                    )}
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
