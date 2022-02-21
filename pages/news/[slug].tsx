import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import { adminDB } from '../../firebase/server';
import Layout from '../../layouts/Layout';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { News } from '../../types/News';
import TiptapRender from '../../components/TiptapRender';

const Slug = ({ news }: { news: News }) => {
  // console.log(news, 'news');
  // console.log(news.title, 'news.title');
  console.log(news.body, 'news.body');

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
          {/* contentは受け取った内容全て渡す */}
          <TiptapRender editable={false} content={news.body} />
        </li>
        <li>
          <Link href={`${news.id}/newsEditor`}>
            <a>編集</a>
          </Link>
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

Slug.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
