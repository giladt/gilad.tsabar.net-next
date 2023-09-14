import AboutPage from "@/components/pages/about";
import Head from "next/head";

type PageProps = {};

export default function About(props: PageProps) {
  return (
    <>
      <Head>
        <title>Gilad Tsabar | About me</title>
      </Head>
      <AboutPage />
    </>
  );
}
