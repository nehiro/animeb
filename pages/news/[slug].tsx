import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import { adminDB } from '../../firebase/server';
import Layout from '../../layouts/Layout';
import Link from 'next/link';
import Tiptap from '../../components/Tiptap';
import { useForm } from 'react-hook-form';
import { News } from '../../types/News';

const Slug = (news: News) => {
  // console.log(slugArticleContents, 'slugArticleContents');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    control,
    reset,
  } = useForm<News>();

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
      <ul>
        <li>【ID】{news.title}の記事ページ</li>
        <li>
          <Tiptap
            control={control}
            name="body"
            rules={{
              required: true,
            }}
            editable={false}
            content={news.body}
          ></Tiptap>
        </li>
      </ul>
    </>
  );
};

export default Slug;

export const getStaticPaths: GetStaticPaths = async () => {
  const newsRef = adminDB.collection('news');
  const snap = await newsRef.get();
  const paths = snap.docs.map((doc) => `/news/${doc.id}`);
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
  const news = {
    id: snap.id,
    title: snap.data()?.title,
    body: snap.data()?.body,
  };
  // console.log(news, 'news');
  // console.log(news.title, 'news.title');
  // console.log(news.body, 'news.body');
  return {
    props: news,
  };
};

Slug.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
