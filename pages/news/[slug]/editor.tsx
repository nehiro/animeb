import { Head } from 'next/document';
import React, {
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import Layout from '../../../layouts/Layout';
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../../utils/firebase';
import { News } from '../../../types/News';
import TiptapEditor from '../../../components/TiptapEditor';
import { GetStaticPaths, GetStaticProps } from 'next';
import { adminDB } from '../../../firebase/server';
import TiptapNewsEditor from '../../../components/TiptapNewsEditor';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useAuth } from '../../../utils/userContext';
import Breadcrumbs from '../../../components/Breadcrumbs';

const Editor = ({ news }: { news: News }) => {
  const { user } = useAuth();
  // console.log(news);
  const admin = user?.admin;
  const router = useRouter();
  useEffect(() => {
    if (admin !== true) {
      router.replace('/');
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<News>({
    // mode: 'onChange',
    defaultValues: {
      body: news.body,
    },
  });

  //ニュース削除

  const DeleteNews = async () => {
    await deleteDoc(doc(db, `news/${news.id}`))
      .then(() => {
        alert('ニュースを削除しました。');
      })
      .then(() => {
        router.replace('/news');
      });
  };

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const modalOpen = () => {
    setOpen(true);
  };

  const onSubmit: SubmitHandler<News> = async (data: News) => {
    // console.log(data, 'data');
    // console.log(data.title, 'data.title');
    // console.log(data.body, 'data.body');

    return await updateDoc(doc(db, `news/${news.id}`), {
      title: data.title,
      body: data.body,
      category: data.category,
      updatedAt: Date.now(),
    }).then(() => {
      // reset();
      alert('編集完了');
    });
  };

  const onInvalid = (erros: FieldErrors) => {
    alert('入力項目にエラーがあります');
    // console.log(erros);
  };

  const notifications = [
    { id: 'notice', title: 'お知らせ' },
    { id: 'function', title: '機能追加' },
  ];

  const checked = () => {
    if (news.category === 'notice') {
      // console.log('notice');
      return news.category === 'notice';
    } else {
      // console.log('function');
      return news.category === 'function';
    }
  };

  return (
    <>
      <Breadcrumbs
        pages={[
          {
            name: 'news',
            href: 'news',
          },
          {
            name: news.title,
            href: 'news/' + news.id,
          },
          {
            name: 'editor',
          },
        ]}
      />
      <div className="relative overflow-hidden bg-white py-16">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-indigo mx-auto mt-6">
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  タイトル
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    autoComplete="title"
                    {...register('title', {
                      required: true,
                    })}
                    defaultValue={news.title}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  カテゴリ
                </label>
                <fieldset className="mt-1">
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-center">
                        <input
                          id={notification.id}
                          {...register('category', {
                            required: true,
                          })}
                          defaultChecked={news.category === notification.id}
                          value={notification.id}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-400 focus:ring-indigo-400"
                        />
                        <label
                          htmlFor={notification.id}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {notification.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              {errors.title?.type === 'required' && '必須入力です'}
              <Controller
                name="body"
                control={control}
                render={({ field }) => (
                  <TiptapNewsEditor
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                )}
              ></Controller>
              {isSubmitting && <p>送信中...</p>}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => modalOpen()}
                  className="mr-4 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  削除
                </button>
                <button
                  disabled={isSubmitting}
                  className="inline-flex items-center rounded-md border border-transparent bg-purple px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
                >
                  送信
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
              <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <ExclamationIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      削除しますか？
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 sm:col-start-2 sm:text-sm"
                    onClick={() => DeleteNews()}
                  >
                    削除
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Breadcrumbs
        pages={[
          {
            name: 'news',
            href: 'news',
          },
          {
            name: news.title,
            href: news.id,
          },
          {
            name: 'editor',
          },
        ]}
      />
    </>
  );
};

export default Editor;

export const getStaticPaths: GetStaticPaths = async () => {
  const newsRef = adminDB.collection('news');
  const snap = await newsRef.get();
  const paths = snap.docs.map((doc) => `/news/${doc.id}/editor`);
  // console.log(paths, 'paths');
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log(params, 'params');
  const newsRef = adminDB.collection('news').doc(`${params?.slug}`);
  // console.log(newsRef, 'newsRef');
  const snap = await newsRef.get();
  // console.log(snap, 'snap');
  // console.log(snap.data(), 'snap.data()');
  const news = snap.data();
  return {
    props: { news },
  };
};

Editor.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
