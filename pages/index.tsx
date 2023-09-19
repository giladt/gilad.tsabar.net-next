import HomePage from "@/components/templates/home";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import type { FC } from "react";

interface SkillProps {
  text: string;
  src: string;
}

interface PageProps {
  skills: SkillProps[];
}

const Home: FC<PageProps> = ({
  skills,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Gilad Tsabar | Full Stack Web Developer</title>
      </Head>
      <HomePage skills={skills} />
    </>
  );
};
export default Home;

export const getStaticProps = (async (context) => {
  const skillData = await fetch("http://localhost:3000/api/v1/data/skills");
  const skills: SkillProps[] = JSON.parse(await skillData.json());

  return {
    props: {
      skills,
    },
    revalidate: 1 * 60 * 60,
  };
}) satisfies GetStaticProps<PageProps>;
