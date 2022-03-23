import { Head } from 'next/document';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { News } from '../../types/News';
import TiptapEditor from '../../components/TiptapEditor';
import TiptapNewsEditor from '../../components/TiptapNewsEditor';

const newsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    control,
    reset,
  } = useForm<News>();

  const onSubmit = async (data: News) => {
    console.log(data, 'data');
    console.log(data.title, 'data.title');
    console.log(data.body.content, 'data.body.content');

    const ref = doc(collection(db, 'news'));
    const id = ref.id;
    return await setDoc(doc(db, `news/${id}`), {
      id: ref.id,
      category: data.category,
      title: data.title,
      body: data.body,
      createdAt: Date.now(),
    }).then(() => {
      reset();
      alert('投稿完了');
    });
  };

  const onInvalid = (erros: FieldErrors) => {
    alert('入力項目にエラーがあります');
    console.log(erros);
  };
  const notifications = [
    { id: 'notice', title: 'お知らせ' },
    { id: 'function', title: '機能追加' },
  ];

  return (
    <>
      {/* <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark-dimmed.min.css"
        ></link>
      </Head> */}
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                          value={notification.id}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
    </>
  );
};

export default newsForm;

newsForm.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
