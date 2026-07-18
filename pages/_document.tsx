import { Html, Head, Main, NextScript } from 'next/document';
import en from '@/lib/locales/en.json';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content={en.meta.description} />
        <meta name="author" content={en.meta.author} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
