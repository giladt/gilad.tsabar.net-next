import HomePage from "@/components/pages/home";
import Head from "next/head";

import type { FC } from "react";

interface indexProps {}

const Home: FC<indexProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Gilad Tsabar | Fullstack Web Developer</title>
      </Head>
      <HomePage />
    </>
  );
};
export default Home;
