import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head />
        <body className="bg-bgGray">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;