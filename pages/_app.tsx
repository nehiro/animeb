import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../utils/userContext';
import { AnimeProvider } from '../utils/animeContext';
import { Toaster } from 'react-hot-toast';
import '../styles/global.css';

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
      <AuthProvider>
        <AnimeProvider>{getLayout(<Component {...pageProps} />)}</AnimeProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
};

export default MyApp;
