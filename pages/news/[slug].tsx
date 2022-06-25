import { Head } from 'next/document';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import { adminDB } from '../../firebase/server';
import Layout from '../../layouts/Layout';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { News } from '../../types/News';
import TiptapRender from '../../components/TiptapRender';
import Breadcrumbs from '../../components/Breadcrumbs';
import TiptapNewsEditor from '../../components/TiptapNewsEditor';
import { useAuth } from '../../utils/userContext';

const Slug = ({ news }: { news: News }) => {
  const { user } = useAuth();
  const admin = user?.admin;
  // console.log(news, 'news');
  // console.log(news.title, 'news.title');
  // console.log(news.body, 'news.body');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    control,
    reset,
  } = useForm<News>({
    defaultValues: {
      body: news.body,
    },
  });

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
        ]}
      ></Breadcrumbs>
      <div className="relative overflow-hidden bg-white py-16">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full">
          <div
            className="relative mx-auto h-full max-w-prose text-lg"
            aria-hidden="true"
          >
            <svg
              className="absolute top-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="block text-center text-base font-semibold uppercase tracking-wide text-indigo-600">
                {news.category === 'notice' ? 'お知らせ' : '機能追加'}
              </span>
              <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                {news.title}
              </span>
            </h1>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            {/* <TiptapRender editable={false} content={news.body} /> */}
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <TiptapRender
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
              )}
            ></Controller>
            {admin === true ? (
              <Link href={`${news.id}/editor`}>
                <a className="no-underline">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-purple px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
                  >
                    編集
                  </button>
                </a>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
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
        ]}
      ></Breadcrumbs>
    </>
  );
};

export default Slug;

export const getStaticPaths: GetStaticPaths = async () => {
  const newsRef = adminDB.collection('news');
  const snap = await newsRef.get();
  const paths = snap.docs.map((doc) => `/news/${doc.id}`);
  console.log(paths, 'paths');
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

Slug.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
