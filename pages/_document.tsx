import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="
          a FULLSTACK WEB DEVELOPER based in Berlin, Germany. 
          Specialized in frontend development with over 3 years 
          of experience in building the web and working with 
          technologies like React, NextJS, NodeJS, GCP and more.
        "
        />
        <meta name="author" content="Gilad Tsabar" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
