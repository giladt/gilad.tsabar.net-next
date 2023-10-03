import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import AboutPage from "@/components/templates/about";
import { getFile } from "@/utils/files";
import { TypExperience, TypIconPill } from "@/lib/types/index";

interface PageProps {
  skills: TypIconPill[];
  experience: TypExperience[];
}

export default function About({
  skills,
  experience,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Gilad Tsabar | About me</title>
      </Head>
      <AboutPage skills={skills} experience={experience} />
    </>
  );
}

export const getStaticProps = (async (context) => {
  const skillsData = await getFile("skills");
  const skills: TypIconPill[] = JSON.parse(await skillsData);
  const experienceData = await getFile("experience");
  const experience: TypExperience[] = JSON.parse(await experienceData);

  return {
    props: {
      skills,
      experience,
    },
    revalidate: 1 * 60 * 60,
  };
}) satisfies GetStaticProps<PageProps>;
