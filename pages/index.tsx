import HomePage from "@/components/templates/home";
import Head from "next/head";

import type { FC } from "react";

interface indexProps {}

const Home: FC<indexProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Gilad Tsabar | Full Stack Web Developer</title>
      </Head>
      <HomePage />
    </>
  );
};
export default Home;
