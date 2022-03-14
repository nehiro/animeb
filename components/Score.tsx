import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useForm, Controller } from 'react-hook-form';
import {
  collection,
  doc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import useSWR from 'swr';
import { Anime } from '../types/Anime';
import { useAuth } from '../utils/userContext';
import { db } from '../utils/firebase';
import { ReviewData } from '../types/ReviewData';
import SwitchButton from './SwitchButton';
import { deleteReviweButton } from '../lib/card';

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
const Score = ({
  anime,
  setReviewModal,
  reviewModal,
}: {
  anime: Anime;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  reviewModal: boolean;
}) => {
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

  useEffect(() => {
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
      isScore: false,
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
    //userがreviewしているかどうか-サブコレクション
    if (!reviewedRef) {
      const idRef = doc(collection(db, `users/${user?.uid}/reviews`));
      const id = idRef.id;
      const ref = doc(db, `users/${user?.uid}/reviews/${id}`);
      if (data.isScore === true) {
        await setDoc(ref, {
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
      } else {
        await setDoc(ref, {
          id: id,
          title: anime?.title,
          isScore: data.isScore,
          storyScore: 1,
          drawingScore: 1,
          voiceActorScore: 1,
          musicScore: 1,
          characterScore: 1,
          review: data.review,
          spoiler: data.spoiler,
          tag: data.tag,
          createAt: Date.now(),
        });
      }
      // console.log(data, 'data');
      alert(`${anime?.title}のレビューを登録しました`);
    } else {
      const id = reviews?.find((review) => review.title === anime?.title)?.id;
      const ref = doc(db, `users/${user?.uid}/reviews/${id}`);
      if (data.isScore === true) {
        await updateDoc(ref, {
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
      } else {
        await updateDoc(ref, {
          isScore: data.isScore,
          storyScore: 1,
          drawingScore: 1,
          voiceActorScore: 1,
          musicScore: 1,
          characterScore: 1,
          review: data.review,
          spoiler: data.spoiler,
          tag: data.tag,
          updatedAt: Date.now(),
        });
      }
      alert(`${anime?.title}のレビューを更新しました`);
    }

    //animesコレクションの処理
    if (
      dbAnimes.data !== undefined &&
      dbAnimes.data.find((dbList) => dbList.title === anime?.title)
    ) {
      //既に誰かがこのタイトルをレビューまたはリストしていたら

      //自分がレビューしていたら
      const userReviewsRef = reviews?.find(
        (review) => review.title === anime?.title
      );
      const userStoryScore = userReviewsRef?.storyScore;
      const userDrawingScore = userReviewsRef?.drawingScore;
      const userVoiceActorScore = userReviewsRef?.voiceActorScore;
      const userMusicScore = userReviewsRef?.musicScore;
      const userCharacterScore = userReviewsRef?.characterScore;
      const userIsScore = userReviewsRef?.isScore;
      const id = dbAnimes.data.find(
        (dbList) => dbList.title === anime?.title
      )?.id;
      const animesIDRef = doc(db, `animes/${id}`);
      if (userReviewsRef) {
        //過去true
        if (userIsScore === true) {
          //今回もture
          if (data.isScore === true) {
            await updateDoc(animesIDRef, {
              storyScore: increment(-(userStoryScore as number)),
              drawingScore: increment(-(userDrawingScore as number)),
              voiceActorScore: increment(-(userVoiceActorScore as number)),
              musicScore: increment(-(userMusicScore as number)),
              characterScore: increment(-(userCharacterScore as number)),
            });
            await updateDoc(animesIDRef, {
              storyScore: increment(data.storyScore),
              drawingScore: increment(data.drawingScore),
              voiceActorScore: increment(data.voiceActorScore),
              musicScore: increment(data.musicScore),
              characterScore: increment(data.characterScore),
            });
          } else {
            //今回false
            await updateDoc(animesIDRef, {
              storyScore: increment(-(userStoryScore as number)),
              drawingScore: increment(-(userDrawingScore as number)),
              voiceActorScore: increment(-(userVoiceActorScore as number)),
              musicScore: increment(-(userMusicScore as number)),
              characterScore: increment(-(userCharacterScore as number)),
              reviewCount: increment(-1),
              unScoreReviewCount: increment(1),
            });
          }
        } else {
          //過去false
          //今回true
          if (data.isScore === true) {
            await updateDoc(animesIDRef, {
              storyScore: increment(data.storyScore),
              drawingScore: increment(data.drawingScore),
              voiceActorScore: increment(data.voiceActorScore),
              musicScore: increment(data.musicScore),
              characterScore: increment(data.characterScore),
              reviewCount: increment(1),
              unScoreReviewCount: increment(-1),
            });
          }
          //今回もfalse:何もしない
        }
      } else {
        //自分がレビューしていなかったら
        if (data.isScore === true) {
          await updateDoc(animesIDRef, {
            storyScore: increment(data.storyScore),
            drawingScore: increment(data.drawingScore),
            voiceActorScore: increment(data.voiceActorScore),
            musicScore: increment(data.musicScore),
            characterScore: increment(data.characterScore),
            reviewCount: increment(1),
          });
        } else {
          await updateDoc(animesIDRef, {
            unScoreReviewCount: increment(1),
          });
        }
      }
      // console.log(anime);
    } else {
      //誰もこのタイトルをレビューまたはリスト入れていなかったら
      const animesIDRef = doc(collection(db, 'animes'));
      const animesID = animesIDRef.id;
      const animesRef = doc(db, `animes/${animesID}`);
      const isScore = data.isScore;
      if (isScore === true) {
        await setDoc(animesRef, {
          id: animesRef.id,
          title: anime?.title,
          createAt: Date.now(),
          reviewCount: 1,
          unScoreReviewCount: 0,
          listCount: 0,
          storyScore: data.storyScore,
          drawingScore: data.drawingScore,
          voiceActorScore: data.voiceActorScore,
          musicScore: data.musicScore,
          characterScore: data.characterScore,
        });
      } else {
        await setDoc(animesRef, {
          id: animesRef.id,
          title: anime?.title,
          createAt: Date.now(),
          reviewCount: 0,
          unScoreReviewCount: 1,
          listCount: 0,
          storyScore: 0,
          drawingScore: 0,
          voiceActorScore: 0,
          musicScore: 0,
          characterScore: 0,
        });
      }
    }
    setReviewModal(false);
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
    <Transition.Root show={reviewModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => setReviewModal(false)}
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
                  <div className="mb-2 flex items-center justify-start">
                    <Controller
                      name="isScore"
                      control={control}
                      defaultValue={reviewedRef?.isScore}
                      render={({ field }) => <SwitchButton {...field} />}
                    />
                    <p className="ml-2 text-xs">
                      {watch('isScore') ? 'スコアをつける' : 'スコアをつけない'}
                    </p>
                  </div>
                  <Transition
                    show={watch('isScore')}
                    as={Fragment}
                    enter="transition duration-100 ease-in"
                    enterFrom="transform scale-90 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-200 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-90 opacity-0"
                  >
                    <div className="mb-2">
                      <ul className="bg-buttonBlack p-4 text-center text-white">
                        <li className="border-b border-gray-500 pb-2 text-2xl">
                          {getAverage(scores)}
                        </li>
                        <li className="flex items-center justify-around border-b border-gray-500 py-2 px-4">
                          <p className="mr-4 w-12">
                            物語
                            <br />
                            {watch('storyScore').toFixed(1)}
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
                            {watch('drawingScore').toFixed(1)}
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
                            {watch('voiceActorScore').toFixed(1)}
                          </p>
                          <Controller
                            name={'voiceActorScore'}
                            control={control}
                            defaultValue={reviewedRef?.voiceActorScore}
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
                            {watch('musicScore').toFixed(1)}
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
                            {watch('characterScore').toFixed(1)}
                          </p>
                          <Controller
                            name={'characterScore'}
                            control={control}
                            defaultValue={reviewedRef?.characterScore}
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
                    </div>
                  </Transition>
                  <div className="mb-2">
                    <textarea
                      {...register('review', {
                        validate(value) {
                          if (watch('spoiler')) {
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
  );
};

export default Score;