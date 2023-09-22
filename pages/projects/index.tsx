import { TypProject } from "@/lib/types";
import ProjectsPage from "@/components/templates/projects";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getFile } from "@/utils/files";

interface PageProps {
  projects: TypProject[];
}

/**
 * Projects Page.
 * @param props args: projects as ProjectProps[]. Contains the projects data
 * @returns JSX.Element
 */
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
  const projects: TypProject[] = JSON.parse(await fileData);

  return {
    props: {
      projects,
    },
    revalidate: 1 * 60 * 60,
  };
}) satisfies GetStaticProps<PageProps>;
