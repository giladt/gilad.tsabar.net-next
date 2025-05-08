import type { FC } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import HomeElements from "@/components/templates/home";
import { getFile } from "@/utils/files";
import { TypIconPill } from "@/lib/types";

interface PageProps {
  skills: TypIconPill[];
}

const Home: FC<PageProps> = ({
  skills,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Gilad Tsabar | Full Stack Web Developer</title>
      </Head>
      <HomeElements skills={skills} />
    </>
  );
};
export default Home;

export const getStaticProps = (async () => {
  const skillData = await getFile("skills");
  const skills: TypIconPill[] = JSON.parse(skillData);

  return {
    props: {
      skills,
    },
    revalidate: 1 * 60 * 60,
  };
}) satisfies GetStaticProps<PageProps>;
