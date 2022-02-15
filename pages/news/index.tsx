import Head from 'next/head';
import React, { ReactElement } from 'react';
import Tiptap from '../../components/Tiptap';
import { adminDB } from '../../firebase/server';
import Layout from '../../layouts/Layout';
import { GetStaticProps } from 'next';
import Link from 'next/link';

const Index = ({ articles }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark-dimmed.min.css"
        ></link>
      </Head>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/news/${article.id}`}>
              <a>{article.id}</a>
            </Link>
          </li>
        ))}
      </ul>
      {/* <Tiptap editable={false} content={content}></Tiptap> */}
    </>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const newsRef = adminDB.collection('news');
  const snap = await newsRef.get();
  // console.log(snap.docs, 'snap.docs');
  // const article = snap.docs;
  const articles = snap.docs.map((doc) => {
    // console.log(doc.data().body.content, 'doc.data().body.content');
    // return { id: doc.id, body: doc.data() };
    return { id: doc.id };
    // const news = doc.data();
    // console.log(news, 'news');
  });
  // console.log(articles, 'article');
  return {
    props: { articles },
  };
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
