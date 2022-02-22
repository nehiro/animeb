import Head from 'next/head';
import React, { ReactElement } from 'react';
import { adminDB } from '../../firebase/server';
import Layout from '../../layouts/Layout';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { News } from '../../types/News';

const Index = ({ news }: { news: News[] }) => {
  // console.log(news, 'news');
  //日付表示フォーマット
  const dateFormat = (time: number) => {
    const dt = new Date(time);
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth() + 1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return y + '-' + m + '-' + d;
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark-dimmed.min.css"
        ></link>
      </Head>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <Link href={`/news/${item.id}`}>
              <a>
                <span className="mr-4">{dateFormat(item.createdAt)}</span>
                <span>{item.title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="news/newsForm">
        <a>
          <p>新規作成</p>
        </a>
      </Link>

      {/* <Tiptap editable={false} content={content}></Tiptap> */}
    </>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const newsRef = adminDB.collection('news');
  const snap = await newsRef.orderBy('createdAt', 'desc').get();
  // console.log(snap.docs, 'snap.docs');
  // const article = snap.docs;
  const news = snap.docs.map((doc) => {
    // console.log(doc.data().body.content, 'doc.data().body.content');
    // return { id: doc.id, body: doc.data() };
    // console.log(doc.data(), 'doc.data()');
    // console.log(doc, 'doc');
    return doc.data();

    // const news = doc.data();
    // console.log(news, 'news');
  });
  console.log(news, 'news');
  return {
    props: { news },
  };
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
