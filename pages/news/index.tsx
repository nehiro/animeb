import Head from 'next/head';
import React, { ReactElement, useRef, useState } from 'react';
import { adminDB } from '../../firebase/server';
import Layout from '../../layouts/Layout';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { News } from '../../types/News';
import BackGroundGray from '../../components/BackGroundGray';
import SubpageTitle from '../../components/SubpageTitle';
import Breadcrumbs from '../../components/Breadcrumbs';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

const Index = ({ news }: { news: News[] }) => {
  // console.log(news, 'news');

  return (
    <>
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark-dimmed.min.css"
        ></link>
      </Head> */}
      <Breadcrumbs></Breadcrumbs>
      <BackGroundGray>
        <SubpageTitle>ニュース</SubpageTitle>
        <div className="mb-6 overflow-hidden rounded-md bg-white shadow">
          <ul role="list" className="divide-y divide-gray-200">
            {news.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <Link href={`/news/${item.id}`}>
                    <a className="flex flex-col items-start sm:flex-col sm:items-start md:flex-row md:items-center">
                      <span
                        className={`mr-4 mb-1 inline-block w-24 py-1 px-3 text-center font-medium md:mb-0 ${
                          item.category === 'notice'
                            ? 'bg-yellow'
                            : 'bg-neutral-300'
                        }`}
                      >
                        {item.category === 'notice' ? 'お知らせ' : '機能追加'}
                      </span>
                      <span className="mr-4 mb-1 md:mb-0">
                        {format(item.createdAt, 'yyyy/MM/dd')}
                      </span>
                      <span>{item.title}</span>
                    </a>
                  </Link>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Link href={`/news/${item.id}/editor`}>
                      <a>編集</a>
                    </Link>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-right">
          <Link href="/news/newsForm">
            <a>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-purple px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
              >
                新規作成
              </button>
            </a>
          </Link>
        </div>
      </BackGroundGray>

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
