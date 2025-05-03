import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import About from "@/components/templates/about";
import { getFile } from "@/utils/files";
import { TypExperience, TypIconPill } from "@/lib/types/index";

interface PageProps {
  readonly skills: TypIconPill[];
  readonly experience: TypExperience[];
}

export default function AboutPage({
  skills,
  experience,
}: Readonly<InferGetStaticPropsType<typeof getStaticProps>>) {
  return (
    <>
      <Head>
        <title>Gilad Tsabar | About me</title>
      </Head>
      <About skills={skills} experience={experience} />
    </>
  );
}

export const getStaticProps = (async () => {
  const skillsData = await getFile("skills");
  const skills: TypIconPill[] = JSON.parse(skillsData);
  const experienceData = await getFile("experience");
  const experience: TypExperience[] = JSON.parse(experienceData);

  return {
    props: {
      skills,
      experience,
    },
    revalidate: 1 * 60 * 60,
  };
}) satisfies GetStaticProps<PageProps>;
