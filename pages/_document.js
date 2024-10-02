import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html style={{ backgroundColor: "rgb(1, 47, 108)" }}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}