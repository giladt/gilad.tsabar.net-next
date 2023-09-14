import ProjectsPage from "@/components/pages/projects";
import Head from "next/head";

type PageProps = {};

export default function Projects(props: PageProps) {
  return (
    <>
      <Head>
        <title>Gilad Tsabar | Projects</title>
      </Head>
      <ProjectsPage />
    </>
  );
}
