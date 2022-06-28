import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark-dimmed.min.css"
          ></link>
          {process.env.NEXT_PUBLIC_PROD === 'true' ? (
            <>
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favicons/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicons/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicons/favicon-16x16.png"
              />
              <link rel="manifest" href="/favicons/site.webmanifest" />
              <link
                rel="mask-icon"
                href="/favicons/safari-pinned-tab.svg"
                color="#7f80f3"
              />
              <meta name="apple-mobile-web-app-title" content="アニメ部！" />
              <meta name="application-name" content="アニメ部！" />
              <meta name="msapplication-TileColor" content="#7f80f3" />
              <meta name="theme-color" content="#ffffff"></meta>
            </>
          ) : (
            <>
              <link
                rel="icon"
                href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>⚠️</text></svg>"
              ></link>
              {/* <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/faviconsDev/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/faviconsDev/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/faviconsDev/favicon-16x16.png"
              />
              <link rel="manifest" href="/faviconsDev/site.webmanifest" />
              <link
                rel="mask-icon"
                href="/faviconsDev/safari-pinned-tab.svg"
                color="#7f80f3"
              />
              <meta
                name="apple-mobile-web-app-title"
                content="アニメ部！開発"
              />
              <meta name="application-name" content="アニメ部！開発" />
              <meta name="msapplication-TileColor" content="#7f80f3" />
              <meta name="theme-color" content="#ffffff" /> */}
            </>
          )}
        </Head>
        <body className="bg-gray-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
