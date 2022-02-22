import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../layouts/Layout';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { News } from '../../../types/News';
import TiptapEditor from '../../../components/TiptapEditor';
import { GetStaticPaths, GetStaticProps } from 'next';
import { adminDB } from '../../../firebase/server';

const NewsEditor = ({ news }: { news: News }) => {
  // console.log(news, 'news');
  //title
  // const [title, setTitle] = useState(news.title);
  // const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(title);
  //   setTitle(event.target.value);
  // };
  // console.log(title, 'title');
  // //body
  // const [body, setBody] = useState(news.body);
  // console.log(body, 'body');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<News>({
    mode: 'onChange',
  });

  //ニュース削除
  const DeleteNews = async () => {
    await deleteDoc(doc(db, `news/${news.id}`)).then(() => {
      alert('ニュースを削除しました。');
    });
  };

  const onSubmit: SubmitHandler<News> = async (data: News) => {
    // console.log(data, 'data');
    // console.log(data.title, 'data.title');
    console.log(data.body, 'data.body');

    return await updateDoc(doc(db, `news/${news.id}`), {
      title: data.title,
      body: data.body,
      updatedAt: Date.now(),
    }).then(() => {
      // reset();
      alert('編集完了');
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
            // onChange={(event) => handleTitle(event)}
            defaultValue={news.title}
          />
        </label>
        {errors.title?.type === 'required' && '必須入力です'}
        <TiptapEditor
          control={control}
          name="body"
          rules={{
            required: true,
          }}
          defaultValue={news.body}
        />
        {isSubmitting && <p>送信中...</p>}
        <button type="button" onClick={() => DeleteNews()}>
          削除
        </button>
        <button disabled={isSubmitting}>送信</button>
      </form>
    </>
  );
};

export default NewsEditor;

export const getStaticPaths: GetStaticPaths = async () => {
  const newsRef = adminDB.collection('news');
  const snap = await newsRef.get();
  const paths = snap.docs.map((doc) => `/news/${doc.id}/newsEditor`);
  // console.log(paths, 'paths');
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params, 'params');
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

NewsEditor.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
