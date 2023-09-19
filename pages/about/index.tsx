import AboutPage from "@/components/templates/about";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Experience } from "@/components/organisms/verticalTimeline";

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
  const skillData = await fetch("http://localhost:3000/api/v1/data/skills");
  const skills: SkillProps[] = JSON.parse(await skillData.json());
  console.log({ skills });

  const experienceData = await fetch(
    "http://localhost:3000/api/v1/data/experience"
  );
  const experience: Experience[] = JSON.parse(await experienceData.json());

  console.log({ experience });

  return {
    props: {
      skills,
      experience,
    },
    revalidate: 1 * 60 * 60,
  };
}) satisfies GetStaticProps<PageProps>;
