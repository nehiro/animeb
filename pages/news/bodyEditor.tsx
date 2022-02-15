import Head from 'next/head';
import React, { ReactElement } from 'react';
import Tiptap from '../../components/Tiptap';
import Layout from '../../layouts/Layout';

const bodyEditor = () => {
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
      <Tiptap />
    </>
  );
};

export default bodyEditor;
