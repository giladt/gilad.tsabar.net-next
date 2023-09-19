import AboutPage from "@/components/templates/about";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Experience } from "@/components/organisms/verticalTimeline";
import { getFile } from "@/utils/files";

interface SkillProps {
  text: string;
  src: string;
}

interface PageProps {
  skills: SkillProps[];
  experience: Experience[];
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
  const skills: SkillProps[] = JSON.parse(await skillsData);
  const experienceData = await getFile("experience");
  const experience: Experience[] = JSON.parse(await experienceData);

  return {
    props: {
      skills,
      experience,
    },
    revalidate: 1 * 60 * 60,
  };
}) satisfies GetStaticProps<PageProps>;
