import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { FieldErrors, useForm } from 'react-hook-form';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { News } from '../../types/News';
import TiptapEditor from '../../components/TiptapEditor';

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

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark-dimmed.min.css"
        ></link>
      </Head>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <label>
          タイトル
          <input
            type="text"
            required
            autoComplete="title"
            {...register('title', {
              required: true,
            })}
          />
        </label>
        {errors.title?.type === 'required' && '必須入力です'}
        <TiptapEditor
          control={control}
          name="body"
          rules={{
            required: true,
          }}
        />
        {isSubmitting && <p>送信中...</p>}
        <button disabled={isSubmitting}>送信</button>
      </form>
    </>
  );
};

export default newsForm;

newsForm.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
