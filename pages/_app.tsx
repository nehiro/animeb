import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../utils/userContext';
import { AnimeProvider } from '../utils/animeContext';
import { Toaster } from 'react-hot-toast';
import '../styles/global.css';
import { DefaultSeo } from 'next-seo';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <DefaultSeo
        defaultTitle="トップページ"
        description="アニメレビューサイト"
        openGraph={{
          type: 'website',
          title: 'トップページ',
          description: 'アニメレビューサイト',
          site_name: 'アニメ部！',
          url: 'https://anime-club.online/',
          images: [
            {
              url: 'https://anime-club.online/images/anime-club.jpg',
              width: 320,
              height: 320,
              // alt: 'アニメ部！ロゴ',
              // type: 'image/jpeg',
            },
          ],
        }}
        twitter={{
          handle: '@Nerio__TW',
          site: '@anime_club_PR',
          cardType: 'summary_large_image',
        }}
      />
      <AuthProvider>
        <AnimeProvider>{getLayout(<Component {...pageProps} />)}</AnimeProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
};

export default MyApp;
