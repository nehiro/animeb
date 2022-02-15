import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { FieldErrors, useForm } from 'react-hook-form';
import Tiptap from '../../components/Tiptap';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { News } from '../../types/News';

const newsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    control,
    reset,
  } = useForm<News>();

  //投稿に成功したらフォームリセット
  //Q：body消えない
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const onSubmit = async (data: News) => {
    // console.log(data, 'data');
    // console.log(data.title, 'data.title');
    // console.log(data.body.content, 'data.body.content');

    // 5秒の送信処理
    const saveData = new Promise((resolve) => {
      setTimeout(async () => {
        resolve(true);
        const ref = doc(collection(db, 'news'));
        const id = ref.id;
        await setDoc(doc(db, `news/${id}`), {
          title: data.title,
          body: data.body.content,
        }).then(() => {
          alert('投稿完了');
        });
      }, 5000);
    });

    return saveData;
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
        <Tiptap
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
