import ProjectsPage from "@/components/templates/projects";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { getFile } from "@/utils/files";

interface ProjectProps {
  title: string;
  description: string;
  release: string;
  liveUrl: string;
  repoUrl: string;
  image: string;
  stack: { text: string; src: string }[];
}

interface PageProps {
  projects: ProjectProps[];
}

export default function Projects({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Gilad Tsabar | Projects</title>
      </Head>
      <ProjectsPage projects={projects} />
    </>
  );
}

export const getStaticProps = (async (context) => {
  const fileData = await getFile("projects");
  const projects: ProjectProps[] = JSON.parse(await fileData);

  return {
    props: {
      projects,
    },
    revalidate: 1 * 60 * 60,
  };
}) satisfies GetStaticProps<PageProps>;
